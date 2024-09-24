
import { Request, Response } from "express";
import { BaseError } from "../errors/BaseError";
import { PatientBusiness } from "../business/PatientRecordBusiness";
import { PatientDTO } from "../dtos/PatientRecordDTO";

export class PatientController {
  constructor(
    private patientBusiness: PatientBusiness,
    private patientDTO: PatientDTO
  ) {}

  
  public createPatientRecord = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization;
      const { patientId } = req.params;
      const { notes } = req.body;

      const input = this.patientDTO.createPatientRecordInput(
        token,
        patientId,
        notes
      );

      const output = await this.patientBusiness.createPatientRecord(input);

      res.status(201).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public getPatientRecords = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization;
      const { patientId } = req.params;

      const input = this.patientDTO.getPatientRecordsInput(token, patientId);

      const output = await this.patientBusiness.getPatientRecords(input);

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

  public updatePatientRecord = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization;
      const { patientId, recordId } = req.params;
      const { notes } = req.body;

      const input = this.patientDTO.updatePatientRecordInput(
        token,
        patientId,
        recordId,
        notes
      );

      const output = await this.patientBusiness.updatePatientRecord(input);

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

  
  public getAllRecords = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization;

      const input = this.patientDTO.getAllRecordsInput(token);
      const output = await this.patientBusiness.getAllRecords(input);

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

  
  public getDoctorRecords = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization;
      const { doctorId } = req.params;

      const input = this.patientDTO.getDoctorRecordsInput(token, doctorId);
      const output = await this.patientBusiness.getDoctorRecords(input);

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

  
  public deletePatientRecord = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization;
      const { recordId } = req.params;

      const input = this.patientDTO.deletePatientRecordInput(token, recordId);
      await this.patientBusiness.deletePatientRecord(input);

      res.status(200).send({ message: "Registro deletado com sucesso" });
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  
  public editPatientRecord = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization;
      const { recordId } = req.params;
      const { notes } = req.body;

      const input = this.patientDTO.editPatientRecordInput(
        token,
        recordId,
        notes
      );
      const output = await this.patientBusiness.editPatientRecord(input);

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
