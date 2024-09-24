import express from "express";

import { TokenManager } from "../services/TokenManager";
import { IdGenerator } from "../services/IdGenerator";
import { ConsultationController } from "../controller/ConsultationController";
import { ConsultationBusiness } from "../business/ConsultationBusiness";
import { ConsultationDatabase } from "../database/ConsultationDatabase";
import { ConsultationDTO } from "../dtos/ConsultationDTO";

const consultationController = new ConsultationController(
  new ConsultationBusiness(
    new ConsultationDatabase(),
    new ConsultationDTO(),
    new TokenManager(),
    new IdGenerator()
  ),
  new ConsultationDTO()
);

export const consultationRouter = express.Router();

consultationRouter.post("/", consultationController.createConsultation);
consultationRouter.get("/", consultationController.getConsultations);
consultationRouter.get("/:id", consultationController.getConsultations);
consultationRouter.put("/:id", consultationController.updateConsultation);
consultationRouter.delete("/:id", consultationController.deleteConsultation);
consultationRouter.put("/:id/status", consultationController.updateConsultationStatus);

