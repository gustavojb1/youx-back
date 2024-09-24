
import { PatientRecordCreateDB, PatientRecordDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class PatientDatabase extends BaseDatabase {
  public static TABLE_PATIENT_RECORDS = "patient_records";
  public static TABLE_USERS = "users";

  
  public async createPatientRecord(
    record: PatientRecordCreateDB
  ): Promise<void> {
    await BaseDatabase.connection(PatientDatabase.TABLE_PATIENT_RECORDS).insert(
      record
    );
  }

  
  public async findPatientById(patientId: string): Promise<boolean> {
    const result = await BaseDatabase.connection(PatientDatabase.TABLE_USERS)
      .select("id")
      .where({ id: patientId })
      .first();

    return Boolean(result);
  }

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  public async updatePatientRecord(
    recordId: string,
    notes: string
  ): Promise<void> {
    await BaseDatabase.connection(PatientDatabase.TABLE_PATIENT_RECORDS)
      .update({ notes, updated_at: new Date().toISOString() })
      .where({ id: recordId });
  }

  public async findPatientRecordById(
    recordId: string
  ): Promise<PatientRecordDB | undefined> {
    const [record] = await BaseDatabase.connection(
      PatientDatabase.TABLE_PATIENT_RECORDS
    )
      .select()
      .where({ id: recordId });

    return record;
  }

public async findAllRecords(): Promise<PatientRecordDB[]> {
  return BaseDatabase.connection(PatientDatabase.TABLE_PATIENT_RECORDS)
    .select(
      "patient_records.*",
      "doctors.username as nomedoMédico"
    )
    .leftJoin(`${PatientDatabase.TABLE_USERS} as doctors`, "patient_records.doctor_id", "doctors.id");
}


public async findRecordsByDoctorId(doctorId: string): Promise<PatientRecordDB[]> {
  return BaseDatabase.connection(PatientDatabase.TABLE_PATIENT_RECORDS)
    .select(
      "patient_records.*",
      "doctors.username as nomedoMédico"
    )
    .leftJoin(`${PatientDatabase.TABLE_USERS} as doctors`, "patient_records.doctor_id", "doctors.id")
    .where("patient_records.doctor_id", doctorId);
}


public async findPatientRecordsByPatientId(patientId: string): Promise<PatientRecordDB[]> {
  return BaseDatabase.connection(PatientDatabase.TABLE_PATIENT_RECORDS)
    .select(
      "patient_records.*",
      "doctors.username as nomedoMédico"
    )
    .leftJoin(`${PatientDatabase.TABLE_USERS} as doctors`, "patient_records.doctor_id", "doctors.id")
    .where("patient_records.patient_id", patientId);
}


public async deleteRecord(recordId: string): Promise<void> {
  await BaseDatabase.connection(PatientDatabase.TABLE_PATIENT_RECORDS)
    .where({ id: recordId })
    .delete();
}


}
