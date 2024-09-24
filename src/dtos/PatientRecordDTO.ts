
import { BadRequestError } from "../errors/BadRequestError";
import { PatientRecordDB } from "../types";

export interface CreatePatientRecordInputDTO {
  token: string;
  patientId: string;
  notes: string;
}

export interface CreatePatientRecordOutputDTO {
  message: string;
  recordId: string;
}

export interface GetPatientRecordsInputDTO {
  token: string;
  patientId: string;
}

export interface GetPatientRecordsOutputDTO {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  nomedoMedico: string;
}


export interface UpdatePatientRecordInputDTO {
  token: string;
  patientId: string;
  recordId: string;
  notes: string;
}

export interface UpdatePatientRecordOutputDTO {
  message: string;
  recordId: string;
}

export interface GetAllRecordsInputDTO {
  token: string;
}

export interface GetDoctorRecordsInputDTO {
  token: string;
  doctorId: string;
}

export interface GetNurseRecordsInputDTO {
  token: string;
  nurseId: string;
}

export interface DeletePatientRecordInputDTO {
  token: string;
  recordId: string;
}

export interface EditPatientRecordInputDTO {
  token: string;
  recordId: string;
  notes: string;
}

export class PatientDTO {
  createPatientRecordInput(
    token: unknown,
    patientId: unknown,
    notes: unknown
  ): CreatePatientRecordInputDTO {
    if (typeof token !== "string") {
      throw new BadRequestError("Token inválido");
    }

    if (typeof patientId !== "string") {
      throw new BadRequestError("'patientId' precisa ser uma string");
    }

    if (typeof notes !== "string") {
      throw new BadRequestError("'notes' precisa ser uma string");
    }

    return { token, patientId, notes };
  }

  createPatientRecordOutput(recordId: string): CreatePatientRecordOutputDTO {
    return {
      message: "Registro médico criado com sucesso",
      recordId,
    };
  }

  getPatientRecordsInput(
    token: unknown,
    patientId: unknown
  ): GetPatientRecordsInputDTO {
    if (typeof token !== "string") {
      throw new BadRequestError("Token inválido");
    }

    if (typeof patientId !== "string") {
      throw new BadRequestError("'patientId' precisa ser uma string");
    }

    return { token, patientId };
  }

  public getPatientRecordsOutput(record: PatientRecordDB): GetPatientRecordsOutputDTO {
    return {
      id: record.id,
      patientId: record.patient_id,
      patientName: record.patient_name,
      doctorId: record.doctor_id,
      doctorName: record.doctor_name,
      notes: record.notes,
      createdAt: record.created_at,
      updatedAt: record.updated_at,
      nomedoMedico: record.nomedoMedico,
    };
  }

  updatePatientRecordInput(
    token: unknown,
    patientId: unknown,
    recordId: unknown,
    notes: unknown
  ): UpdatePatientRecordInputDTO {
    if (typeof token !== "string") {
      throw new BadRequestError("Token inválido");
    }

    if (typeof patientId !== "string") {
      throw new BadRequestError("'patientId' precisa ser uma string");
    }

    if (typeof recordId !== "string") {
      throw new BadRequestError("'recordId' precisa ser uma string");
    }

    if (typeof notes !== "string") {
      throw new BadRequestError("'notes' precisa ser uma string");
    }

    return { token, patientId, recordId, notes };
  }

  
  updatePatientRecordOutput(recordId: string): UpdatePatientRecordOutputDTO {
    return {
      message: "Registro médico atualizado com sucesso",
      recordId,
    };
  }

  getAllRecordsInput(token: unknown): GetAllRecordsInputDTO {
    if (typeof token !== "string") {
      throw new BadRequestError("Token inválido");
    }

    return { token };
  }

  getDoctorRecordsInput(
    token: unknown,
    doctorId: unknown
  ): GetDoctorRecordsInputDTO {
    if (typeof token !== "string") {
      throw new BadRequestError("Token inválido");
    }

    if (typeof doctorId !== "string") {
      throw new BadRequestError("'doctorId' precisa ser uma string");
    }

    return { token, doctorId };
  }

  getNurseRecordsInput(
    token: unknown,
    nurseId: unknown
  ): GetNurseRecordsInputDTO {
    if (typeof token !== "string") {
      throw new BadRequestError("Token inválido");
    }

    if (typeof nurseId !== "string") {
      throw new BadRequestError("'nurseId' precisa ser uma string");
    }

    return { token, nurseId };
  }

  deletePatientRecordInput(
    token: unknown,
    recordId: unknown
  ): DeletePatientRecordInputDTO {
    if (typeof token !== "string") {
      throw new BadRequestError("Token inválido");
    }

    if (typeof recordId !== "string") {
      throw new BadRequestError("'recordId' precisa ser uma string");
    }

    return { token, recordId };
  }

  editPatientRecordInput(
    token: unknown,
    recordId: unknown,
    notes: unknown
  ): EditPatientRecordInputDTO {
    if (typeof token !== "string") {
      throw new BadRequestError("Token inválido");
    }

    if (typeof recordId !== "string") {
      throw new BadRequestError("'recordId' precisa ser uma string");
    }

    if (typeof notes !== "string") {
      throw new BadRequestError("'notes' precisa ser uma string");
    }

    return { token, recordId, notes };
  }
}
