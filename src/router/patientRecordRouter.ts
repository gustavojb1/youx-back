import express from "express";

import { TokenManager } from "../services/TokenManager";
import { IdGenerator } from "../services/IdGenerator";
import { PatientController } from "../controller/PatientRecordController";
import { PatientBusiness } from "../business/PatientRecordBusiness";
import { PatientDatabase } from "../database/PatientRecordDatabase";
import { PatientDTO } from "../dtos/PatientRecordDTO";

const patientController = new PatientController(
  new PatientBusiness(
    new PatientDatabase(),
    new PatientDTO(),
    new TokenManager(),
    new IdGenerator()
  ),
  new PatientDTO()
);

export const patientRouter = express.Router();

patientRouter.post("/:patientId/records", patientController.createPatientRecord);
patientRouter.get("/:patientId/records", patientController.getPatientRecords);
patientRouter.put("/:patientId/records/:recordId", patientController.updatePatientRecord);
patientRouter.get("/records", patientController.getAllRecords); 
patientRouter.get("/records/:patientId", patientController.getPatientRecords); 
patientRouter.get("/records/doctor/:doctorId", patientController.getDoctorRecords); 
patientRouter.delete("/records/:recordId", patientController.deletePatientRecord); 
patientRouter.put("/records/:recordId", patientController.editPatientRecord); 
