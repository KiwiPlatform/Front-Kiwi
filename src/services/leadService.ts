import type { Lead } from '../types/Lead';

const mockLeads: Lead[] = [
  { id: 1, cliente: 'Miriam Bautista', clinica: 'Clinica San Juan', correo: 'miriam@example.com', costo: '2500', dni: '40407949', especialidad: 'Dermatología', ingreso: '2024', recepcionista: 'Ana García', telefono: '985554441' },
  { id: 2, cliente: 'Carlos Mendoza', clinica: 'Clinica Central', correo: 'carlos@example.com', costo: '1800', dni: '45885843', especialidad: 'Cardiología', ingreso: '2023', recepcionista: 'María López', telefono: '987812554' },
  { id: 3, cliente: 'Laura Torres', clinica: 'Clinica Norte', correo: 'laura@example.com', costo: '3200', dni: '41281406', especialidad: 'Oftalmología', ingreso: '2024', recepcionista: 'Pedro Ruiz', telefono: '950004005' },
  { id: 4, cliente: 'Roberto Silva', clinica: 'Clinica Sur', correo: 'roberto@example.com', costo: '1500', dni: '45678909', especialidad: 'Odontología', ingreso: '2023', recepcionista: 'Carmen Vega', telefono: '923617285' },
  { id: 5, cliente: 'Patricia Rojas', clinica: 'Clinica Este', correo: 'patricia@example.com', costo: '2800', dni: '34567890', especialidad: 'Ginecología', ingreso: '2024', recepcionista: 'Luis Morales', telefono: '993767431' },
  { id: 6, cliente: 'Fernando Díaz', clinica: 'Clinica Oeste', correo: 'fernando@example.com', costo: '1900', dni: '26543456', especialidad: 'Neurología', ingreso: '2023', recepcionista: 'Sofia Castro', telefono: '931675462' },
  { id: 7, cliente: 'Gabriela Herrera', clinica: 'Clinica Centro', correo: 'gabriela@example.com', costo: '2100', dni: '70987654', especialidad: 'Psicología', ingreso: '2024', recepcionista: 'Diego Ramos', telefono: '941309479' },
  { id: 8, cliente: 'Miguel Vargas', clinica: 'Clinica Moderna', correo: 'miguel@example.com', costo: '3500', dni: '45678990', especialidad: 'Ortopedia', ingreso: '2023', recepcionista: 'Elena Torres', telefono: '981559433' },
];

export const getLeads = async (): Promise<Lead[]> => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockLeads);
    }, 500); // Simulate network delay
  });
};

export const getLeadById = async (id: number): Promise<Lead | undefined> => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const lead = mockLeads.find(l => l.id === id);
      resolve(lead);
    }, 300); // Simulate network delay
  });
}; 