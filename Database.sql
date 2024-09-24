-- Active: 1726984890669@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,          
    username TEXT UNIQUE NOT NULL,                
    email TEXT UNIQUE NOT NULL,                   
    password TEXT NOT NULL,                       
    role_id TEXT NOT NULL,                        
    created_at TEXT NOT NULL,                     
    FOREIGN KEY (role_id) REFERENCES roles(id)    
);

CREATE TABLE roles (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,          
    role_name TEXT UNIQUE NOT NULL                
);

CREATE TABLE consultations (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,          
    patient_id TEXT NOT NULL,                     
    doctor_id TEXT,                               
    nurse_id TEXT,                                
    appointment_date TEXT NOT NULL,               
    reason TEXT NOT NULL,                         
    location_id TEXT NOT NULL,                    
    status TEXT CHECK (status IN ('Pendente', 'Agendado', 'Finalizado')) NOT NULL, 
    created_at TEXT NOT NULL,                     
    updated_at TEXT NOT NULL,                     
    FOREIGN KEY (patient_id) REFERENCES users(id) ON DELETE CASCADE, 
    FOREIGN KEY (doctor_id) REFERENCES users(id) ON DELETE SET NULL,  
    FOREIGN KEY (nurse_id) REFERENCES users(id) ON DELETE SET NULL,   
    FOREIGN KEY (location_id) REFERENCES locations(id)                
);

CREATE TABLE patient_records (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,          
    patient_id TEXT NOT NULL,                     
    doctor_id TEXT NOT NULL,                      
    notes TEXT,                                   
    created_at TEXT NOT NULL,                     
    updated_at TEXT NOT NULL,                     
    FOREIGN KEY (patient_id) REFERENCES users(id) ON DELETE CASCADE, 
    FOREIGN KEY (doctor_id) REFERENCES users(id) ON DELETE CASCADE   
);

CREATE TABLE locations (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,          
    address TEXT,                                 
    latitude REAL,                                
    longitude REAL                                
);

-- Inserir os papéis correspondentes na tabela roles
INSERT INTO roles (id, role_name)
VALUES 
    ('role_paciente', 'Paciente'),
    ('role_enfermeiro', 'Enfermeiro'),
    ('role_medico', 'Médico'),
    ('role_admin', 'ADMIN');


INSERT INTO users (id, username, email, password, role_id, created_at)
VALUES 
    ('user1', 'paciente1', 'paciente1@example.com', 'senha123', 'role_paciente', '2024-09-22'),
    ('user2', 'enfermeiro1', 'enfermeiro1@example.com', 'senha123', 'role_enfermeiro', '2024-09-22'),
    ('user3', 'medico1', 'medico1@example.com', 'senha123', 'role_medico', '2024-09-22'),
    ('user4', 'admin', 'admin@example.com', 'senha123', 'role_admin', '2024-09-22');

INSERT INTO locations (id, address, latitude, longitude) VALUES
    ('1', 'Clínica São Lucas', -21.245242, -45.000080),
    ('2', 'Hospital Vaz Monteiro', -21.240960, -44.996460),
    ('3', 'Clínica Santa Clara', -21.246970, -45.001470),
    ('4', 'Unimed Lavras', -21.242800, -45.002100),
    ('5', 'Hospital das Clínicas de Lavras', -21.241400, -45.004200);



-- Apagar todo o conteúdo das tabelas
DELETE FROM consultations;
DELETE FROM patient_records;
DELETE FROM users;
DELETE FROM roles;
DELETE FROM locations;
