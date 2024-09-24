

import { TokenManager } from "../services/TokenManager";
import { IdGenerator } from "../services/IdGenerator";
import { ConsultationDatabase } from "../database/ConsultationDatabase";
import {
  ConsultationDTO,
  CreateConsultationInputDTO,
  CreateConsultationOutputDTO,
  DeleteConsultationInputDTO,
  GetConsultationByIdInputDTO,
  GetConsultationsInputDTO,
  GetConsultationsOutputDTO,
  UpdateConsultationInputDTO,
  UpdateConsultationOutputDTO,
  UpdateConsultationStatusInputDTO,
} from "../dtos/ConsultationDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { USER_ROLES } from "../types";

export class ConsultationBusiness {
  constructor(
    private consultationDatabase: ConsultationDatabase,
    private consultationDTO: ConsultationDTO,
    private tokenManager: TokenManager,
    private idGenerator: IdGenerator
  ) {}

  
  public async createConsultation(
    input: CreateConsultationInputDTO
  ): Promise<CreateConsultationOutputDTO> {
    const {
      token,
      patientId,
      doctorId,
      nurseId,
      appointmentDate,
      reason,
      locationId,
    } = input;

    const payload = this.tokenManager.getPayload(token);
    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    
    const id = this.idGenerator.generate();
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    await this.consultationDatabase.createConsultation({
      id,
      patient_id: patientId,
      doctor_id: doctorId,
      nurse_id: nurseId || null,
      appointment_date: appointmentDate,
      reason,
      location_id: locationId,
      status: "Pendente",
      created_at: createdAt,
      updated_at: updatedAt,
    });

    
    return this.consultationDTO.createConsultationOutput(id);
  }

  public async getConsultations(
    input: GetConsultationsInputDTO
  ): Promise<GetConsultationsOutputDTO[]> {
    const { token } = input;
    const payload = this.tokenManager.getPayload(token);
    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    let consultations;
    if (payload.role_id === USER_ROLES.PATIENT) {
      consultations =
        await this.consultationDatabase.findConsultationsByPatient(payload.id);
    } else if (payload.role_id === USER_ROLES.DOCTOR) {
      consultations = await this.consultationDatabase.findConsultationsByDoctor(
        payload.id
      );
    } else if (
      payload.role_id === USER_ROLES.NURSE ||
      payload.role_id === USER_ROLES.ADMIN
    ) {
      consultations = await this.consultationDatabase.findAllConsultations();
    } else {
      throw new BadRequestError(
        "Usuário sem permissão para visualizar consultas."
      );
    }

    return consultations.map(this.consultationDTO.getConsultationsOutput);
  }

  public async getConsultationById(
    input: GetConsultationByIdInputDTO
  ): Promise<GetConsultationsOutputDTO> {
    const { token, id } = input;

    const payload = this.tokenManager.getPayload(token);
    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const consultation = await this.consultationDatabase.findConsultationById(
      id
    );
    if (!consultation) {
      throw new BadRequestError("Consulta não encontrada.");
    }

    return this.consultationDTO.getConsultationsOutput(consultation);
  }

  public async updateConsultation(
    input: UpdateConsultationInputDTO
  ): Promise<UpdateConsultationOutputDTO> {
    const { token, id, status, appointmentDate, reason } = input;

    const payload = this.tokenManager.getPayload(token);
    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const consultation = await this.consultationDatabase.findConsultationById(
      id
    );
    if (!consultation) {
      throw new BadRequestError("Consulta não encontrada.");
    }

    if (
      payload.role_id !== USER_ROLES.DOCTOR &&
      payload.role_id !== USER_ROLES.NURSE &&
      payload.role_id !== USER_ROLES.ADMIN
    ) {
      throw new BadRequestError(
        "Usuário sem permissão para atualizar a consulta."
      );
    }

    await this.consultationDatabase.updateConsultation(id, {
      status: status || consultation.status,
      appointment_date: appointmentDate || consultation.appointment_date,
      reason: reason || consultation.reason,
      updated_at: new Date().toISOString(),
    });

    return this.consultationDTO.updateConsultationOutput(id);
  }

  public async deleteConsultation(
    input: DeleteConsultationInputDTO
  ): Promise<void> {
    const { token, id } = input;

    const payload = this.tokenManager.getPayload(token);
    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const consultation = await this.consultationDatabase.findConsultationById(
      id
    );
    if (!consultation) {
      throw new BadRequestError("Consulta não encontrada.");
    }

    if (
      payload.role_id !== USER_ROLES.ADMIN &&
      payload.role_id !== USER_ROLES.DOCTOR &&
      payload.role_id !== USER_ROLES.NURSE
    ) {
      throw new BadRequestError(
        "Usuário sem permissão para excluir a consulta."
      );
    }

    await this.consultationDatabase.deleteConsultation(id);
  }

  public async updateConsultationStatus(
    input: UpdateConsultationStatusInputDTO
  ): Promise<void> {
    const { token, id, status } = input;

    const payload = this.tokenManager.getPayload(token);
    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const consultation = await this.consultationDatabase.findConsultationById(
      id
    );
    if (!consultation) {
      throw new BadRequestError("Consulta não encontrada.");
    }

    
    if (
      payload.role_id !== USER_ROLES.DOCTOR &&
      payload.role_id !== USER_ROLES.NURSE &&
      payload.role_id !== USER_ROLES.ADMIN
    ) {
      throw new BadRequestError(
        "Usuário sem permissão para alterar o status da consulta."
      );
    }

    
    await this.consultationDatabase.updateConsultationStatus(id, status);
  }
}
