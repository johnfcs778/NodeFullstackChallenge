/**
 *  This file defines a data model encapsulating Application data
 *  Author: John Fahnestock
 */

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Vehicle {
  vin: string;
  year: number;
  make: string;
  model: string;
}

class ApplicationModel {
  private firstName: string;
  private lastName: string;
  private dob: Date;
  private address: Address;
  private vehicles: string[];

  constructor(firstName: string, lastName: string, dob: Date, address: Address, vehicles: string[]) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = dob;
    this.address = address;
    this.vehicles = vehicles;
  }

  getFirstName(): string {
    return this.firstName;
  }

  setFirstName(firstName: string): void {
    this.firstName = firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  setLastName(lastName: string): void {
    this.lastName = lastName;
  }

  getDateOfBirth(): Date {
    return this.dob;
  }

  setDateOfBirth(dateOfBirth: Date): void {
    this.dob = dateOfBirth;
  }

  getAddress(): Address {
    return this.address;
  }

  setAddress(address: Address): void {
    this.address = address;
  }

  getVehicles(): string[] {
    return this.vehicles;
  }

  setVehicles(vehicles: string[]): void {
    this.vehicles = vehicles;
  }
}

export default ApplicationModel;
