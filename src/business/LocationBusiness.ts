
import { LocationDatabase } from "../database/LocationDatabase";
import {
  GetLocationInputDTO,
  GetLocationOutputDTO,
  LocationDTO,
} from "../dtos/LocationDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { Location } from "../models/Location"; 
import { TokenManager } from "../services/TokenManager";

export class LocationBusiness {
  constructor(
    private locationDatabase: LocationDatabase,
    private locationDTO: LocationDTO,
    private tokenManager: TokenManager
  ) {}

  
  public async getLocations(
    input: GetLocationInputDTO
  ): Promise<GetLocationOutputDTO[]> {
    const { token } = input;

    const payload = this.tokenManager.getPayload(token);
    if (payload === null) {
      throw new BadRequestError("Token inválido");
    }

    const locationsDB = await this.locationDatabase.findLocations();

    const output = locationsDB.map((locationDB) => {
      
      const location = new Location(
        locationDB.id,
        locationDB.address,
        locationDB.latitude,
        locationDB.longitude
      );

      return this.locationDTO.getLocationOutput(location);
    });

    return output;
  }
}
