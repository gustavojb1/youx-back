
import express from "express";
import { LocationController } from "../controller/LocationController";
import { LocationBusiness } from "../business/LocationBusiness";
import { LocationDatabase } from "../database/LocationDatabase";
import { LocationDTO } from "../dtos/LocationDTO";
import { TokenManager } from "../services/TokenManager";

const locationController = new LocationController(
  new LocationBusiness(
    new LocationDatabase(),
    new LocationDTO(),
    new TokenManager()
  ),
  new LocationDTO()
);

export const locationRouter = express.Router();

locationRouter.get("/", locationController.getLocations);
