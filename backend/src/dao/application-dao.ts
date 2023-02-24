/**
 *  This file defines a data access object for performing database operations
 *  Author: John Fahnestock
 */
import sqlite3 from "sqlite3";
import ApplicationModel from '../models/Application.js'
import { Vehicle } from "../models/Application.js";

export class ApplicationDao {
  private readonly db: sqlite3.Database;

  constructor(dbFilePath: string) {
    this.db = new sqlite3.Database(dbFilePath);

    // Initialize the database
    const sql = `
      CREATE TABLE IF NOT EXISTS applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        dob TEXT NOT NULL,
        street TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        zipCode TEXT NOT NULL,
        vehicles TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS vehicles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        vin TEXT NOT NULL,
        year TEXT NOT NULL,
        make TEXT NOT NULL,
        model TEXT NOT NULL
      );
    `;
    this.db.exec(sql);
  }

  // Given a vehicle list, insert them into the database
  public async addVehicles(vehicles: Vehicle[]): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      const sql =
        "INSERT INTO vehicles (vin, year, make, model) " +
        "VALUES (?, ?, ?, ?)";

      let insertedIds: string[] = [];
      let i = 0;
      for (const vehicle of vehicles) {
        const values = [
          vehicle.vin,
          vehicle.year,
          vehicle.make,
          vehicle.model

        ]
        this.db.run(sql, values, function (err) {
          if (err) {
            reject(err);
          } else {
            i++
            insertedIds.push(this.lastID.toString())
            if (i == vehicles.length) {
              // Return the ids of the vehicles that were inserted
              resolve(insertedIds)
            }
          }
        })
      }

    });
  }

  // Return a vehicle object given its id
  public async getVehicleByID(id: string): Promise<Vehicle | null> {
    return new Promise<Vehicle | null>((resolve, reject) => {
      const sql =
        "SELECT vin, year, make, model " +
        "FROM vehicles " +
        "WHERE id = ?";
      this.db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else if (!row) {
          resolve(null);
        } else {
          resolve({ vin: row.vin, year: row.year, make: row.make, model: row.model });
        }
      });
    });
  }

  // Return a Vehicle's ID given its VIN number
  public async getVehicleIDByVIN(vin: string): Promise<string | null> {
    return new Promise<string | null>((resolve, reject) => {
      const sql =
        "SELECT id " +
        "FROM vehicles " +
        "WHERE vin = ?";
      this.db.get(sql, [vin], (err, row) => {
        if (err) {
          reject(err);
        } else if (!row) {
          resolve(null);
        } else {
          resolve(row.id);
        }
      });
    });
  }

  // Add a new application to the database given an ApplicationModel
  public async addApplication(application: ApplicationModel): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const sql =
        "INSERT INTO applications (firstName, lastName, dob, street, city, state, zipCode, vehicles) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      const values = [
        application.getFirstName(),
        application.getLastName(),
        application.getDateOfBirth(),
        application.getAddress().street,
        application.getAddress().city,
        application.getAddress().state,
        application.getAddress().zipCode,
        application.getVehicles().toString()
      ];
      this.db.run(sql, values, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }

  // Get an application from the database by last name
  public async getApplicationByName(lastName: string): Promise<ApplicationModel | null> {
    return new Promise<ApplicationModel | null>((resolve, reject) => {
      const sql =
        "SELECT id, firstName, lastName, dob, street, city, state, zipCode " +
        "FROM applications " +
        "WHERE lastName = ?";
      this.db.get(sql, [lastName], (err, row) => {
        if (err) {
          reject(err);
        } else if (!row) {
          resolve(null);
        } else {
          resolve(row);
        }
      });
    });
  }

  // Update an application given a first and last name
  public async updateApplicationByFirstLastName(firstName: string, lastName: string, application: ApplicationModel, vehicles: Vehicle[]): Promise<string> {
    const sql =
      "UPDATE applications SET firstName = ?, lastName = ?, dob = ?, street = ?, city = ?, zipCode = ?, state = ? " +
      "WHERE firstName = ? AND lastName = ?";

    const sqlVehicles =
      "UPDATE vehicles SET vin = ?, year = ?, make = ?, model = ? " +
      "WHERE id = ? ";

    const valuesApp = [
      application.getFirstName(),
      application.getLastName(),
      application.getDateOfBirth(),
      application.getAddress().street,
      application.getAddress().city,
      application.getAddress().zipCode,
      application.getAddress().state,
      firstName,
      lastName
    ];


    // For the vehicles to update check if any exist, if so update the existing entry
    // Otherwise add the new vehicle to the vehicles table
    let vehiclesToAdd: Vehicle[] = []
    for (let vehicle of vehicles) {
      const id = await this.getVehicleIDByVIN(vehicle.vin);
      if (id) {
        this.db.run(sqlVehicles, [
          vehicle.vin,
          vehicle.year,
          vehicle.make,
          vehicle.model,
          id
        ], function (err) {
          if (err) {
            console.log(err);
          }
        })
      } else {
        vehiclesToAdd.push(vehicle)
      }
    }

    if (vehiclesToAdd.length > 0) {
      await this.addVehicles(vehiclesToAdd);
    }

    return new Promise<string>((resolve, reject) => {
      this.db.run(sql, valuesApp, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve("Updated");
        }
      });
    });

  }


  // Close the DB connection
  public close(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

}
