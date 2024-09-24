import { BadRequestError } from "../errors/BadRequestError";
import { ConsultationDB } from "../types";




export interface CreateConsultationInputDTO {
  token: string;
  patientId: string;
  doctorId?: string;
  nurseId?: string;
  appointmentDate: string;
  reason: string;
  locationId: string;
}

export interface CreateConsultationOutputDTO {
  message: string;
  consultationId: string;
}

export interface GetConsultationsInputDTO {
  token: string;
}

export interface GetConsultationsOutputDTO {
  id: string;
  patientId: string;
  nomeDoPaciente: string;
  doctorId?: string;
  nomeDoDoutor?: string;
  nurseId?: string;
  nomeDaEnfermeira?: string;
  appointmentDate: string;
  reason: string;
  locationId: string;
  status: string;
}

export interface GetConsultationByIdInputDTO {
  token: string;
  id: string;
}

export interface UpdateConsultationInputDTO {
  token: string;
  id: string;
  status?: string;
  appointmentDate?: string;
  reason?: string;
}

export interface UpdateConsultationOutputDTO {
  message: string;
  consultationId: string;
}

export interface DeleteConsultationInputDTO {
  token: string;
  id: string;
}

export interface UpdateConsultationStatusInputDTO {
    token: string;
    id: string;
    status: string;
  }



export class ConsultationDTO {
  createConsultationInput(
    token: unknown,
    patientId: unknown,
    doctorId: unknown,
    nurseId: unknown,
    appointmentDate: unknown,
    reason: unknown,
    locationId: unknown
  ): CreateConsultationInputDTO {
    if (typeof token !== "string") {
      throw new BadRequestError("Token inválido");
    }

    if (typeof patientId !== "string") {
      throw new BadRequestError("'patientId' precisa ser uma string");
    }

    
    if (doctorId !== undefined && typeof doctorId !== "string") {
      throw new BadRequestError(
        "'doctorId' precisa ser uma string ou undefined"
      );
    }

    if (nurseId !== undefined && typeof nurseId !== "string") {
      throw new BadRequestError(
        "'nurseId' precisa ser uma string ou undefined"
      );
    }

    if (typeof appointmentDate !== "string") {
      throw new BadRequestError("'appointmentDate' precisa ser uma string");
    }

    if (typeof reason !== "string") {
      throw new BadRequestError("'reason' precisa ser uma string");
    }

    if (typeof locationId !== "string") {
      throw new BadRequestError("'locationId' precisa ser uma string");
    }

    const result: CreateConsultationInputDTO = {
      token,
      patientId,
      doctorId,
      nurseId,
      appointmentDate,
      reason,
      locationId,
    };

    return result;
  }

  createConsultationOutput(
    consultationId: string
  ): CreateConsultationOutputDTO {
    const result: CreateConsultationOutputDTO = {
      message: "Consulta criada com sucesso",
      consultationId,
    };

    return result;
  }

  getConsultationsInput(token: unknown): GetConsultationsInputDTO {
    if (typeof token !== "string") {
      throw new BadRequestError("Token inválido");
    }

    return { token };
  }

  getConsultationsOutput(consultation: any): GetConsultationsOutputDTO {
    return {
      id: consultation.id,
      patientId: consultation.patient_id,
      nomeDoPaciente: consultation.nomeDoPaciente,
      doctorId: consultation.doctor_id,
      nomeDoDoutor: consultation.nomeDoDoutor,
      nurseId: consultation.nurse_id,
      nomeDaEnfermeira: consultation.nomeDaEnfermeira,
      appointmentDate: consultation.appointment_date,
      reason: consultation.reason,
      locationId: consultation.location_id,
      status: consultation.status,
    };
  }

  getConsultationByIdInput(
    token: unknown,
    id: unknown
  ): GetConsultationByIdInputDTO {
    if (typeof token !== "string") {
      throw new BadRequestError("Token inválido");
    }

    if (typeof id !== "string") {
      throw new BadRequestError("'id' precisa ser uma string");
    }

    return { token, id };
  }

  updateConsultationInput(
    token: unknown,
    id: unknown,
    status: unknown,
    appointmentDate: unknown,
    reason: unknown
  ): UpdateConsultationInputDTO {
    if (typeof token !== "string") {
      throw new BadRequestError("Token inválido");
    }

    if (typeof id !== "string") {
      throw new BadRequestError("'id' precisa ser uma string");
    }

    if (status !== undefined && typeof status !== "string") {
      throw new BadRequestError("'status' precisa ser uma string");
    }

    if (appointmentDate !== undefined && typeof appointmentDate !== "string") {
      throw new BadRequestError("'appointmentDate' precisa ser uma string");
    }

    if (reason !== undefined && typeof reason !== "string") {
      throw new BadRequestError("'reason' precisa ser uma string");
    }

    return { token, id, status, appointmentDate, reason };
  }

  updateConsultationOutput(
    consultationId: string
  ): UpdateConsultationOutputDTO {
    return {
      message: "Consulta atualizada com sucesso",
      consultationId,
    };
  }

  deleteConsultationInput(
    token: unknown,
    id: unknown
  ): DeleteConsultationInputDTO {
    if (typeof token !== "string") {
      throw new BadRequestError("Token inválido");
    }

    if (typeof id !== "string") {
      throw new BadRequestError("'id' precisa ser uma string");
    }

    return { token, id };
  }

  updateConsultationStatusInput(token: unknown, id: unknown, status: unknown): UpdateConsultationStatusInputDTO {
    if (typeof token !== "string") {
      throw new BadRequestError("Token inválido");
    }

    if (typeof id !== "string") {
      throw new BadRequestError("'id' precisa ser uma string");
    }

    if (typeof status !== "string" || !["Pendente", "Agendado", "Finalizado"].includes(status)) {
      throw new BadRequestError("Status inválido, deve ser 'Pendente', 'Agendado' ou 'Finalizado'");
    }

    return { token, id, status };
  }
}
