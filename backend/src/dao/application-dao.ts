import sqlite3 from "sqlite3";
import  ApplicationModel  from '../models/Application.js'

export class ApplicationDao {
  private readonly db: sqlite3.Database;

  constructor(dbFilePath: string) {
    this.db = new sqlite3.Database(dbFilePath);

    const sql = `
      CREATE TABLE IF NOT EXISTS applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        dob TEXT NOT NULL,
        street TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        zipCode TEXT NOT NULL
      )
    `;
    this.db.exec(sql);
  }

  public async addApplication(application: ApplicationModel): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const sql =
        "INSERT INTO applications (firstName, lastName, dob, street, city, state, zipCode) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?)";
      const values = [
        application.getFirstName(),
        application.getLastName(),
        application.getDateOfBirth(),
        application.getAddress().street,
        application.getAddress().city,
        application.getAddress().state,
        application.getAddress().zipCode,
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

  
  public async updateApplication(id: string, partialApplication: Partial<ApplicationModel>): Promise<void> {
    const updateQuery = Object.entries(partialApplication)
      .map(([key, value]) => `${key} = ?`)
      .join(", ");
    let params = Object.values(partialApplication);
    //params.push(id);
    const result = await new Promise<void>((resolve, reject) => {
      this.db.run(
        `UPDATE applications SET ${updateQuery} WHERE id = ?`,
        [...params, id],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
    if (result === undefined) {
      throw new Error(`Could not update application with id ${id}`);
    }
  }
  
  // public async updateApplication(
  //   id: number,
  //   updates: Partial<ApplicationModel>
  // ): Promise<void> {
  //   return new Promise<void>((resolve, reject) => {
  //     const sql =
  //       "UPDATE applications SET " +
  //       "firstName = ?, " +
  //       "lastName = ?, " +
  //       "dob = ?, " +
  //       "street = ?, " +
  //       "city = ?, " +
  //       "state = ?, " +
  //       "zipCode = ? " +
  //       "WHERE id = ?";
  //     const values = [
  //       updates.getFirstName(),
  //       updates.getLastName,
  //       updates.getDateOfBirth,
  //       updates.getAddress().street,
  //       updates.getAddress?.city,
  //       updates.getAddress?.state,
  //       updates.getAddress?.zipCode,
  //       id,
  //     ];
  //     this.db.run(sql, values, function (err) {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve();
  //       }
  //     });
  //   });
  // }

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
