import apiClient from './apiClient';
import type { Lead } from '../types/Lead';
import { isUsingMocks, devLog } from '../config/environment';

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
  devLog('Fetching leads...');

  if (isUsingMocks()) {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        devLog('Mock leads fetched successfully');
        resolve(mockLeads);
      }, 500); // Simulate network delay
    });
  } else {
    // Real API call
    try {
      const response = await apiClient.get('/leads');
      devLog('Real API leads fetched successfully');
      return response.data;
    } catch (error) {
      devLog('Real API leads fetch failed:', error);
      throw error;
    }
  }
};

export const getLeadById = async (id: number): Promise<Lead | undefined> => {
  devLog('Fetching lead by ID:', id);

  if (isUsingMocks()) {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const lead = mockLeads.find(l => l.id === id);
        devLog('Mock lead by ID fetched:', lead ? 'found' : 'not found');
        resolve(lead);
      }, 300); // Simulate network delay
    });
  } else {
    // Real API call
    try {
      const response = await apiClient.get(`/leads/${id}`);
      devLog('Real API lead by ID fetched successfully');
      return response.data;
    } catch (error) {
      devLog('Real API lead by ID fetch failed:', error);
      throw error;
    }
  }
};

// Nuevos métodos para operaciones CRUD completas
export const createLead = async (lead: Omit<Lead, 'id'>): Promise<Lead> => {
  devLog('Creating new lead:', lead);

  if (isUsingMocks()) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newLead: Lead = {
          ...lead,
          id: Math.max(...mockLeads.map(l => l.id)) + 1,
        };
        mockLeads.push(newLead);
        devLog('Mock lead created successfully');
        resolve(newLead);
      }, 400);
    });
  } else {
    try {
      const response = await apiClient.post('/leads', lead);
      devLog('Real API lead created successfully');
      return response.data;
    } catch (error) {
      devLog('Real API lead creation failed:', error);
      throw error;
    }
  }
};

export const updateLead = async (id: number, lead: Partial<Lead>): Promise<Lead> => {
  devLog('Updating lead:', id, lead);

  if (isUsingMocks()) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockLeads.findIndex(l => l.id === id);
        if (index !== -1) {
          mockLeads[index] = { ...mockLeads[index], ...lead };
          devLog('Mock lead updated successfully');
          resolve(mockLeads[index]);
        } else {
          devLog('Mock lead update failed: not found');
          reject(new Error('Lead not found'));
        }
      }, 400);
    });
  } else {
    try {
      const response = await apiClient.put(`/leads/${id}`, lead);
      devLog('Real API lead updated successfully');
      return response.data;
    } catch (error) {
      devLog('Real API lead update failed:', error);
      throw error;
    }
  }
};

export const deleteLead = async (id: number): Promise<void> => {
  devLog('Deleting lead:', id);

  if (isUsingMocks()) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockLeads.findIndex(l => l.id === id);
        if (index !== -1) {
          mockLeads.splice(index, 1);
          devLog('Mock lead deleted successfully');
          resolve();
        } else {
          devLog('Mock lead deletion failed: not found');
          reject(new Error('Lead not found'));
        }
      }, 300);
    });
  } else {
    try {
      await apiClient.delete(`/leads/${id}`);
      devLog('Real API lead deleted successfully');
    } catch (error) {
      devLog('Real API lead deletion failed:', error);
      throw error;
    }
  }
}; 