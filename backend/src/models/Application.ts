  export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  }
  
  interface Vehicle {
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
    //private vehicles: Vehicle[];
  
    constructor(firstName: string, lastName: string, dob: Date, address: Address) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.dob = dob;
      this.address = address;
      //this.vehicles = vehicles;
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
  
    // getVehicles(): Vehicle[] {
    //   return this.vehicles;
    // }
  
    // setVehicles(vehicles: Vehicle[]): void {
    //   this.vehicles = vehicles;
    // }
  }
  
  export default ApplicationModel;
  