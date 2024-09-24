
import { Request, Response } from "express";
import { BaseError } from "../errors/BaseError";
import { ConsultationBusiness } from "../business/ConsultationBusiness";
import { ConsultationDTO } from "../dtos/ConsultationDTO";

export class ConsultationController {
  constructor(
    private consultationBusiness: ConsultationBusiness,
    private consultationDTO: ConsultationDTO
  ) {}

  
  public createConsultation = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization;
      const {
        patientId,
        doctorId,
        nurseId,
        appointmentDate,
        reason,
        locationId,
      } = req.body;

      const input = this.consultationDTO.createConsultationInput(
        token,
        patientId,
        doctorId,
        nurseId,
        appointmentDate,
        reason,
        locationId
      );

      const output = await this.consultationBusiness.createConsultation(input);

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

  
  public getConsultations = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization;
      const input = this.consultationDTO.getConsultationsInput(token);

      const output = await this.consultationBusiness.getConsultations(input);

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

  public updateConsultation = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization;
      const { id } = req.params;
      const { status, appointmentDate, reason } = req.body;

      const input = this.consultationDTO.updateConsultationInput(
        token,
        id,
        status,
        appointmentDate,
        reason
      );

      const output = await this.consultationBusiness.updateConsultation(input);

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

  public deleteConsultation = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization;
      const { id } = req.params;

      const input = this.consultationDTO.deleteConsultationInput(token, id);

      await this.consultationBusiness.deleteConsultation(input);

      res.status(200).send({ message: "Consulta excluída com sucesso" });
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public updateConsultationStatus = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization;
      const { id } = req.params;
      const { status } = req.body;

      const input = this.consultationDTO.updateConsultationStatusInput(
        token,
        id,
        status
      );

      await this.consultationBusiness.updateConsultationStatus(input);

      res
        .status(200)
        .send({ message: "Status da consulta atualizado com sucesso" });
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
