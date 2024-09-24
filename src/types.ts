export enum USER_ROLES {
    PATIENT = 'role_paciente',
    NURSE = 'role_enfermeiro',
    DOCTOR = 'role_medico',
    ADMIN = 'role_admin'
  }

  export interface UserDB {
    id: string;              
    username: string;        
    email: string;           
    password: string;        
    role_id: USER_ROLES;         
    created_at: string;      
  }

  export interface TokenPayload {
    id: string,
    username: string,
    role_id: USER_ROLES
  }  

  export interface ConsultationDB {
    id: string;
    patient_id: string;
    doctor_id?: string | null;  
    nurse_id?: string | null;   
    appointment_date: string;
    reason: string;
    location_id: string;
    status: 'Pendente' | 'Agendado' | 'Finalizado';
    created_at: string;
    updated_at: string;
  }

  export interface PatientRecordDB {
    id: string;
    patient_id: string;
    doctor_id: string;
    notes: string;
    created_at: string;
    updated_at: string;
    patient_name: string;
    doctor_name: string; 
    nomedaEnfermeira: string;
    nomedoMedico: string;
  }

  export interface PatientRecordCreateDB {
    id: string;
    patient_id: string;
    doctor_id: string;
    notes: string;
    created_at: string;
    updated_at: string;
  }

  export interface LocationDB {
    id: string;
    address: string;
    latitude: number;
    longitude: number;
  }