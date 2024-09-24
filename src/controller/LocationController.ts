
import { Request, Response } from "express";
import { LocationBusiness } from "../business/LocationBusiness";
import { LocationDTO } from "../dtos/LocationDTO";
import { BaseError } from "../errors/BaseError";

export class LocationController {
  constructor(
    private locationBusiness: LocationBusiness,
    private locationDTO: LocationDTO
  ) {}

  
  public getLocations = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization;

      const input = this.locationDTO.getLocationInput(token);
      const output = await this.locationBusiness.getLocations(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
}
