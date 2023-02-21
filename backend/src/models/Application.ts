interface Address {
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
    private dateOfBirth: Date;
    private address: Address;
    private vehicles: Vehicle[];
  
    constructor(firstName: string, lastName: string, dateOfBirth: Date, address: Address, vehicles: Vehicle[]) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.dateOfBirth = dateOfBirth;
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
      return this.dateOfBirth;
    }
  
    setDateOfBirth(dateOfBirth: Date): void {
      this.dateOfBirth = dateOfBirth;
    }
  
    getAddress(): Address {
      return this.address;
    }
  
    setAddress(address: Address): void {
      this.address = address;
    }
  
    getVehicles(): Vehicle[] {
      return this.vehicles;
    }
  
    setVehicles(vehicles: Vehicle[]): void {
      this.vehicles = vehicles;
    }
  }
  
  export default ApplicationModel;
  