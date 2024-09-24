
import { BaseDatabase } from "./BaseDatabase";
import { LocationDB } from "../types";

export class LocationDatabase extends BaseDatabase {
  public static TABLE_LOCATIONS = "locations";

  public async findLocations(): Promise<LocationDB[]> {
    const locationsDB: LocationDB[] = await BaseDatabase.connection(
      LocationDatabase.TABLE_LOCATIONS
    ).select("*");

    return locationsDB;
  }

}
