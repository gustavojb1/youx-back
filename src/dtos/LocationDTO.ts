
import { BadRequestError } from "../errors/BadRequestError";
import { Location } from "../models/Location";



export interface GetLocationInputDTO {
  token: string;
}

export interface GetLocationOutputDTO {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
}


export class LocationDTO {
  getLocationInput(token: unknown): GetLocationInputDTO {
    if (typeof token !== "string") {
      throw new BadRequestError("Token inválido");
    }

    const result: GetLocationInputDTO = {
      token,
    };

    return result;
  }

  getLocationOutput(location: Location): GetLocationOutputDTO {
    const result: GetLocationOutputDTO = {
      id: location.getId(),
      address: location.getAddress(),
      latitude: location.getLatitude(),
      longitude: location.getLongitude(),
    };

    return result;
  }
}
