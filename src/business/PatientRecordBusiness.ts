import { BadRequestError } from "../errors/BadRequestError";
import { TokenManager } from "../services/TokenManager";
import { IdGenerator } from "../services/IdGenerator";
import { PatientRecordCreateDB, USER_ROLES } from "../types";
import { PatientDatabase } from "../database/PatientRecordDatabase";
import {
  CreatePatientRecordInputDTO,
  CreatePatientRecordOutputDTO,
  DeletePatientRecordInputDTO,
  EditPatientRecordInputDTO,
  GetAllRecordsInputDTO,
  GetDoctorRecordsInputDTO,
  GetNurseRecordsInputDTO,
  GetPatientRecordsInputDTO,
  GetPatientRecordsOutputDTO,
  PatientDTO,
  UpdatePatientRecordInputDTO,
  UpdatePatientRecordOutputDTO,
} from "../dtos/PatientRecordDTO";

export class PatientBusiness {
  constructor(
    private patientDatabase: PatientDatabase,
    private patientDTO: PatientDTO,
    private tokenManager: TokenManager,
    private idGenerator: IdGenerator
  ) {}

  public async createPatientRecord(
    input: CreatePatientRecordInputDTO
  ): Promise<CreatePatientRecordOutputDTO> {
    const { token, patientId, notes } = input;

    const payload = this.tokenManager.getPayload(token);
    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    
    if (payload.role_id !== USER_ROLES.DOCTOR) {
      throw new BadRequestError(
        "Apenas médicos podem criar registros médicos."
      );
    }

    
    const patientExists = await this.patientDatabase.findPatientById(patientId);
    if (!patientExists) {
      throw new BadRequestError("Paciente não encontrado.");
    }

    const recordId = this.idGenerator.generate();
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newRecord: PatientRecordCreateDB = {
      id: recordId,
      patient_id: patientId,
      doctor_id: payload.id,
      notes,
      created_at: createdAt,
      updated_at: updatedAt,
    };

    await this.patientDatabase.createPatientRecord(newRecord);

    return this.patientDTO.createPatientRecordOutput(recordId);
  }

  public async getPatientRecords(
    input: GetPatientRecordsInputDTO
  ): Promise<GetPatientRecordsOutputDTO[]> {
    const { token, patientId } = input;

    const payload = this.tokenManager.getPayload(token);
    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    
    if (
      payload.role_id !== USER_ROLES.DOCTOR &&
      payload.role_id !== USER_ROLES.NURSE &&
      (payload.role_id !== USER_ROLES.PATIENT || payload.id !== patientId)
    ) {
      throw new BadRequestError(
        "Usuário sem permissão para visualizar os registros."
      );
    }

    
    const records = await this.patientDatabase.findPatientRecordsByPatientId(
      patientId
    );

    return records.map((record) =>
      this.patientDTO.getPatientRecordsOutput(record)
    );
  }

  public async updatePatientRecord(input: UpdatePatientRecordInputDTO): Promise<UpdatePatientRecordOutputDTO> {
    const { token, patientId, recordId, notes } = input;

    const payload = this.tokenManager.getPayload(token);
    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    
    if (payload.role_id !== USER_ROLES.DOCTOR) {
      throw new BadRequestError("Apenas médicos podem atualizar registros médicos.");
    }

    
    const patientExists = await this.patientDatabase.findPatientById(patientId);
    if (!patientExists) {
      throw new BadRequestError("Paciente não encontrado.");
    }

    
    const recordExists = await this.patientDatabase.findPatientRecordById(recordId);
    if (!recordExists) {
      throw new BadRequestError("Registro médico não encontrado.");
    }

    
    await this.patientDatabase.updatePatientRecord(recordId, notes);

    
    return this.patientDTO.updatePatientRecordOutput(recordId);
  }

  
public async getAllRecords(input: GetAllRecordsInputDTO): Promise<GetPatientRecordsOutputDTO[]> {
  const { token } = input;

  const payload = this.tokenManager.getPayload(token);
  if (!payload) {
    throw new BadRequestError("Token inválido");
  }

  const records = await this.patientDatabase.findAllRecords();

  return records.map((record) => this.patientDTO.getPatientRecordsOutput(record));
}


public async getDoctorRecords(input: GetDoctorRecordsInputDTO): Promise<GetPatientRecordsOutputDTO[]> {
  const { token, doctorId } = input;

  const payload = this.tokenManager.getPayload(token);
  if (!payload) {
    throw new BadRequestError("Token inválido");
  }

  const records = await this.patientDatabase.findRecordsByDoctorId(doctorId);

  return records.map((record) => this.patientDTO.getPatientRecordsOutput(record));
}



public async deletePatientRecord(input: DeletePatientRecordInputDTO): Promise<void> {
  const { token, recordId } = input;

  const payload = this.tokenManager.getPayload(token);
  if (!payload) {
    throw new BadRequestError("Token inválido");
  }

  await this.patientDatabase.deleteRecord(recordId);
}


public async editPatientRecord(input: EditPatientRecordInputDTO): Promise<UpdatePatientRecordOutputDTO> {
  const { token, recordId, notes } = input;

  const payload = this.tokenManager.getPayload(token);
  if (!payload) {
    throw new BadRequestError("Token inválido");
  }

  await this.patientDatabase.updatePatientRecord(recordId, notes);

  return this.patientDTO.updatePatientRecordOutput(recordId);
}

}
