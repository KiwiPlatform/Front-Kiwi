import { Lead, LeadStatus } from '../types/Lead';

// Mock user data
export interface MockUser {
  user: {
    name: string;
    first_surname: string;
    email: string;
    role: string;
  };
  token: string;
  expiresAt: number;
}

// Mock users for authentication
export const mockUsers: Record<string, { password: string; userData: MockUser }> = {
  'admin': {
    password: 'admin123',
    userData: {
      user: {
        name: 'Admin',
        first_surname: 'User',
        email: 'admin@kiwipay.com',
        role: 'ADMIN'
      },
      token: 'mock-jwt-token-for-admin-very-secure-trust-me',
      expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours from now
    }
  },
  'user': {
    password: 'user123',
    userData: {
      user: {
        name: 'Regular',
        first_surname: 'User',
        email: 'user@kiwipay.com',
        role: 'USER'
      },
      token: 'mock-jwt-token-for-user-very-secure-trust-me',
      expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours from now
    }
  }
};

// Initial mock leads data
export let mockLeads: Lead[] = [
  {
    id: 1,
    cliente: 'Juan Pérez',
    clinica: 'Clínica Dental Sonrisa',
    correo: 'juan.perez@example.com',
    costo: '5000',
    dni: '12345678',
    especialidad: 'Odontología',
    ingreso: 'Hoy',
    recepcionista: 'María García',
    telefono: '987654321',
    fechaRegistro: '26/09/2025 10:30',
    origen: 'WEB',
    observacion: 'Cliente recurrente, segunda visita',
    status: LeadStatus.NUEVO
  },
  {
    id: 2,
    cliente: 'Ana López',
    clinica: 'Clínica Oftalmológica Visión',
    correo: 'ana.lopez@example.com',
    costo: '3500',
    dni: '87654321',
    especialidad: 'Oftalmología',
    ingreso: 'Ayer',
    recepcionista: 'Pedro Suárez',
    telefono: '912345678',
    fechaRegistro: '25/09/2025 15:45',
    origen: 'TELÉFONO',
    observacion: 'Interesada en cirugía láser',
    status: LeadStatus.CONTACTADO
  },
  {
    id: 3,
    cliente: 'Carlos Rodríguez',
    clinica: 'Clínica Dermatológica DermaSkin',
    correo: 'carlos.rodriguez@example.com',
    costo: '2000',
    dni: '45678901',
    especialidad: 'Dermatología',
    ingreso: 'Hace 3 días',
    recepcionista: 'Lucía Martínez',
    telefono: '934567890',
    fechaRegistro: '23/09/2025 11:20',
    origen: 'REFERIDO',
    observacion: 'Tratamiento para acné severo',
    status: LeadStatus.EN_EVALUACION
  },
  {
    id: 4,
    cliente: 'Sofía Morales',
    clinica: 'Clínica Cardiológica HeartCare',
    correo: 'sofia.morales@example.com',
    costo: '8000',
    dni: '23456789',
    especialidad: 'Cardiología',
    ingreso: 'Hace 1 semana',
    recepcionista: 'Roberto Gómez',
    telefono: '945678912',
    fechaRegistro: '19/09/2025 09:10',
    origen: 'WEB',
    status: LeadStatus.PRE_APROBADO
  },
  {
    id: 5,
    cliente: 'Martín Torres',
    clinica: 'Clínica Neurológica NeuroCare',
    correo: 'martin.torres@example.com',
    costo: '6500',
    dni: '34567890',
    especialidad: 'Neurología',
    ingreso: 'Hace 2 semanas',
    recepcionista: 'Carmen López',
    telefono: '956789012',
    fechaRegistro: '12/09/2025 14:00',
    origen: 'TELÉFONO',
    observacion: 'Necesita resonancia magnética urgente',
    status: LeadStatus.APROBADO
  }
];

// Helper function to find the next available ID
export const getNextLeadId = (): number => {
  if (mockLeads.length === 0) {
    return 1;
  }
  return Math.max(...mockLeads.map(lead => lead.id)) + 1;
};

// Get mock data from localStorage if available
export const initMockData = (): void => {
  try {
    // Attempt to load persisted leads from localStorage
    const storedLeads = localStorage.getItem('mockLeads');
    if (storedLeads) {
      mockLeads = JSON.parse(storedLeads);
    }
  } catch (error) {
    console.error('Error initializing mock data:', error);
    // If there's an error loading from localStorage, use the default mock data
  }
};

// Save mock data to localStorage
export const saveMockData = (): void => {
  try {
    localStorage.setItem('mockLeads', JSON.stringify(mockLeads));
  } catch (error) {
    console.error('Error saving mock data:', error);
  }
};

// Initialize mock data on module load
initMockData();