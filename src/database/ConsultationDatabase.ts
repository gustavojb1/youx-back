
import { BaseDatabase } from "./BaseDatabase";
import { ConsultationDB } from "../types";

export class ConsultationDatabase extends BaseDatabase {
  public static TABLE_CONSULTATIONS = "consultations";
  public static TABLE_USERS = "users";


  public async createConsultation(consultation: ConsultationDB): Promise<void> {
    await BaseDatabase.connection(ConsultationDatabase.TABLE_CONSULTATIONS).insert(consultation);
  }


  
  public async findConsultationsByPatient(patientId: string): Promise<any[]> {
    return BaseDatabase.connection(ConsultationDatabase.TABLE_CONSULTATIONS)
      .select(
        "consultations.*",
        "patients.username as nomeDoPaciente",
        "doctors.username as nomeDoDoutor",
        "nurses.username as nomeDaEnfermeira"
      )
      .leftJoin(`${ConsultationDatabase.TABLE_USERS} as patients`, "consultations.patient_id", "patients.id")
      .leftJoin(`${ConsultationDatabase.TABLE_USERS} as doctors`, "consultations.doctor_id", "doctors.id")
      .leftJoin(`${ConsultationDatabase.TABLE_USERS} as nurses`, "consultations.nurse_id", "nurses.id")
      .where({ "consultations.patient_id": patientId });
  }

  public async findConsultationsByDoctor(doctorId: string): Promise<any[]> {
    return BaseDatabase.connection(ConsultationDatabase.TABLE_CONSULTATIONS)
      .select(
        "consultations.*",
        "patients.username as nomeDoPaciente",
        "doctors.username as nomeDoDoutor",
        "nurses.username as nomeDaEnfermeira"
      )
      .leftJoin(`${ConsultationDatabase.TABLE_USERS} as patients`, "consultations.patient_id", "patients.id")
      .leftJoin(`${ConsultationDatabase.TABLE_USERS} as doctors`, "consultations.doctor_id", "doctors.id")
      .leftJoin(`${ConsultationDatabase.TABLE_USERS} as nurses`, "consultations.nurse_id", "nurses.id")
      .where({ "consultations.doctor_id": doctorId });
  }

  public async findAllConsultations(): Promise<any[]> {
    return BaseDatabase.connection(ConsultationDatabase.TABLE_CONSULTATIONS)
      .select(
        "consultations.*",
        "patients.username as nomeDoPaciente",
        "doctors.username as nomeDoDoutor",
        "nurses.username as nomeDaEnfermeira"
      )
      .leftJoin(`${ConsultationDatabase.TABLE_USERS} as patients`, "consultations.patient_id", "patients.id")
      .leftJoin(`${ConsultationDatabase.TABLE_USERS} as doctors`, "consultations.doctor_id", "doctors.id")
      .leftJoin(`${ConsultationDatabase.TABLE_USERS} as nurses`, "consultations.nurse_id", "nurses.id");
  }

  public async findConsultationById(id: string): Promise<any | undefined> {
    const result = await BaseDatabase.connection(ConsultationDatabase.TABLE_CONSULTATIONS)
      .select(
        "consultations.*",
        "patients.username as nomeDoPaciente",
        "doctors.username as nomeDoDoutor",
        "nurses.username as nomeDaEnfermeira"
      )
      .leftJoin(`${ConsultationDatabase.TABLE_USERS} as patients`, "consultations.patient_id", "patients.id")
      .leftJoin(`${ConsultationDatabase.TABLE_USERS} as doctors`, "consultations.doctor_id", "doctors.id")
      .leftJoin(`${ConsultationDatabase.TABLE_USERS} as nurses`, "consultations.nurse_id", "nurses.id")
      .where("consultations.id", id)
      .first();

    return result;
  }

  public async updateConsultation(id: string, updates: Partial<ConsultationDB>): Promise<void> {
    await BaseDatabase.connection(ConsultationDatabase.TABLE_CONSULTATIONS)
      .update(updates)
      .where({ id });
  }

  public async deleteConsultation(id: string): Promise<void> {
    await BaseDatabase.connection(ConsultationDatabase.TABLE_CONSULTATIONS)
      .delete()
      .where({ id });
  }

  public async updateConsultationStatus(id: string, status: string): Promise<void> {
    await BaseDatabase.connection(ConsultationDatabase.TABLE_CONSULTATIONS)
      .update({ status })
      .where({ id });
  }
}