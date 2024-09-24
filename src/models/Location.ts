
import { LocationDB } from "../types";

export class Location {
  constructor(
    private id: string,
    private address: string,
    private latitude: number,
    private longitude: number
  ) {}

  
  public toDBModel(): LocationDB {
    return {
      id: this.id,
      address: this.address,
      latitude: this.latitude,
      longitude: this.longitude,
    };
  }

  
  public getId(): string {
    return this.id;
  }

  public setId(value: string): void {
    this.id = value;
  }

  public getAddress(): string {
    return this.address;
  }

  public setAddress(value: string): void {
    this.address = value;
  }

  public getLatitude(): number {
    return this.latitude;
  }

  public setLatitude(value: number): void {
    this.latitude = value;
  }

  public getLongitude(): number {
    return this.longitude;
  }

  public setLongitude(value: number): void {
    this.longitude = value;
  }
}
