import apiClient from './apiClient';
import type { Lead } from '../types/Lead';
import { apiLog } from '../config/environment';
import { LeadStatus } from '../types/Lead';

// Interfaces del backend KiwiPay
interface BackendLead {
  id: number;
  receptionistName?: string;  // Solo viene en LeadDetailResponse
  clientName: string;
  dni: string;
  phone: string;
  email?: string;  // Solo viene en LeadDetailResponse
  monthlyIncome?: number;  // Solo viene en LeadDetailResponse
  treatmentCost: number;
  clinicId?: number;  // Solo viene en LeadDetailResponse
  clinicName: string;
  medicalSpecialtyId?: number;  // Solo viene en LeadDetailResponse
  medicalSpecialtyName: string;
  status: string; // Se mapeará al enum LeadStatus
  origin?: string;  // Solo viene en LeadDetailResponse
  createdAt: string;
  updatedAt?: string;  // Solo viene en LeadDetailResponse
  observacion?: string; // Nuevo campo opcional
}

interface CreateLeadRequest {
  receptionistName: string;
  clientName: string;
  clinicId: number;
  medicalSpecialtyId: number;
  dni: string;
  monthlyIncome: number;
  treatmentCost: number;
  phone: string;
  email?: string;
  status: string;
  observacion?: string;
}

interface UpdateLeadRequest {
  receptionistName?: string;
  clientName?: string;
  clinicId?: number;
  medicalSpecialtyId?: number;
  dni?: string;
  monthlyIncome?: number;
  treatmentCost?: number;
  phone?: string;
  email?: string;
  status?: string;
  observacion?: string;
}

// Adaptador para convertir entre el formato del backend y el formato del frontend
const adaptBackendToFrontend = (backendLead: BackendLead): Lead => {
  // Extraer información temporal del createdAt
  let yearOfRegistration = 'N/A';
  let fechaCompleta = 'N/A';

  if (backendLead.createdAt) {
    try {
      const date = new Date(backendLead.createdAt);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      // Tiempo relativo para la tabla
      if (diffDays === 0) {
        yearOfRegistration = 'Hoy';
      } else if (diffDays === 1) {
        yearOfRegistration = 'Ayer';
      } else if (diffDays < 7) {
        yearOfRegistration = `Hace ${diffDays} días`;
      } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        yearOfRegistration = `Hace ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`;
      } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        yearOfRegistration = `Hace ${months} ${months === 1 ? 'mes' : 'meses'}`;
      } else {
        const years = Math.floor(diffDays / 365);
        yearOfRegistration = `Hace ${years} ${years === 1 ? 'año' : 'años'}`;
      }

      // Fecha completa para la página de edición (formato DD/MM/YY HH:MM)
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString().slice(-2);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      fechaCompleta = `${day}/${month}/${year} ${hours}:${minutes}`;

    } catch (error) {
      console.error('Error parsing createdAt date:', error);
    }
  }

  const adapted: Lead = {
    id: backendLead.id,
    cliente: backendLead.clientName,
    clinica: backendLead.clinicName,
    correo: backendLead.email || 'N/A',  // El email no viene en LeadResponse
    costo: backendLead.treatmentCost?.toString() || '0',
    dni: backendLead.dni,
    especialidad: backendLead.medicalSpecialtyName,
    ingreso: yearOfRegistration,  // Ahora muestra tiempo relativo
    recepcionista: backendLead.receptionistName || 'N/A',  // receptionistName no viene en LeadResponse
    telefono: backendLead.phone,
    fechaRegistro: fechaCompleta,  // Fecha completa para edición
    origen: backendLead.origin || 'WEB',  // Origen del lead
    observacion: backendLead.observacion || '',
    status: backendLead.status as LeadStatus
  };

  apiLog('SUCCESS', 'Backend lead adapted to frontend format', {
    backendId: backendLead.id,
    frontendId: adapted.id,
    clientName: adapted.cliente,
    clinicName: adapted.clinica,
    yearOfRegistration: yearOfRegistration,
    fechaRegistro: fechaCompleta,
    origen: adapted.origen
  });

  return adapted;
};

const adaptFrontendToBackend = (frontendLead: Partial<import('../types/Lead').Lead>): Partial<CreateLeadRequest | UpdateLeadRequest> => {
  const adapted: Partial<CreateLeadRequest | UpdateLeadRequest> = {
    receptionistName: frontendLead.recepcionista,
    clientName: frontendLead.cliente,
    dni: frontendLead.dni,
    monthlyIncome: frontendLead.ingreso ? parseFloat(frontendLead.ingreso) : undefined,
    treatmentCost: frontendLead.costo ? parseFloat(frontendLead.costo) : undefined,
    phone: frontendLead.telefono,
    email: frontendLead.correo || undefined,
    status: frontendLead.status as string,
    observacion: frontendLead.observacion
  };

  apiLog('SUCCESS', 'Frontend lead adapted to backend format', {
    clientName: adapted.clientName,
    dni: adapted.dni,
    monthlyIncome: adapted.monthlyIncome,
    treatmentCost: adapted.treatmentCost
  });

  return adapted;
};

export const getLeads = async (): Promise<Lead[]> => {
  apiLog('REQUEST', 'Fetching all leads from KiwiPay backend', {});

  try {
    const response = await apiClient.get<BackendLead[]>('/leads/all');

    apiLog('SUCCESS', 'Leads fetched successfully from KiwiPay backend', {
      count: response.data.length,
      leads: response.data.map(lead => ({ id: lead.id, clientName: lead.clientName }))
    });

    // Convertir cada lead del formato backend al formato frontend
    const adaptedLeads = response.data.map(adaptBackendToFrontend);

    apiLog('SUCCESS', 'All leads adapted to frontend format', {
      originalCount: response.data.length,
      adaptedCount: adaptedLeads.length
    });

    return adaptedLeads;

  } catch (error: unknown) {
    const err = error as { response?: { status?: number; data?: unknown }; validationErrors?: unknown };
    apiLog('ERROR', 'Failed to fetch leads from KiwiPay backend', {
      error: (error as Error).message,
      status: err.response?.status,
      data: err.response?.data
    });
    throw error;
  }
};

export const getLeadById = async (id: number): Promise<Lead | undefined> => {
  apiLog('REQUEST', 'Fetching lead by ID from KiwiPay backend', { id });

  try {
    const response = await apiClient.get<BackendLead>(`/leads/${id}`);

    apiLog('SUCCESS', 'Lead fetched successfully by ID from KiwiPay backend', {
      id: response.data.id,
      clientName: response.data.clientName,
      clinicName: response.data.clinicName
    });

    const adaptedLead = adaptBackendToFrontend(response.data);

    apiLog('SUCCESS', 'Lead adapted to frontend format', {
      id: adaptedLead.id,
      cliente: adaptedLead.cliente
    });

    return adaptedLead;

  } catch (error: unknown) {
    const err = error as { response?: { status?: number; data?: unknown }; validationErrors?: unknown };
    if (err.response?.status === 404) {
      apiLog('ERROR', 'Lead not found in KiwiPay backend', { id });
      return undefined;
    }

    apiLog('ERROR', 'Failed to fetch lead by ID from KiwiPay backend', {
      id,
      error: (error as Error).message,
      status: err.response?.status,
      data: err.response?.data
    });
    throw error;
  }
};

export const createLead = async (lead: Omit<Lead, 'id'>): Promise<Lead> => {
  apiLog('REQUEST', 'Creating new lead in KiwiPay backend', {
    cliente: lead.cliente,
    clinica: lead.clinica,
    dni: lead.dni
  });

  try {
    // Adaptar los datos del frontend al formato del backend
    const backendData = adaptFrontendToBackend(lead) as CreateLeadRequest;

    // Nota: Para crear un lead necesitamos clinicId y medicalSpecialtyId
    // Por ahora usaremos valores por defecto ya que no tenemos los endpoints de catálogos
    const createData: CreateLeadRequest = {
      receptionistName: backendData.receptionistName || '',
      clientName: backendData.clientName || '',
      clinicId: 1, // Valor por defecto, necesitarías obtenerlo del catálogo
      medicalSpecialtyId: 1, // Valor por defecto, necesitarías obtenerlo del catálogo
      dni: backendData.dni || '',
      monthlyIncome: backendData.monthlyIncome || 0,
      treatmentCost: backendData.treatmentCost || 0,
      phone: backendData.phone || '',
      email: backendData.email,
      status: backendData.status,
      observacion: backendData.observacion
    };

    const response = await apiClient.post<BackendLead>('/leads', createData);

    apiLog('SUCCESS', 'Lead created successfully in KiwiPay backend', {
      id: response.data.id,
      clientName: response.data.clientName,
      status: response.data.status
    });

    const adaptedLead = adaptBackendToFrontend(response.data);

    apiLog('SUCCESS', 'Created lead adapted to frontend format', {
      id: adaptedLead.id,
      cliente: adaptedLead.cliente
    });

    return adaptedLead;

  } catch (error: unknown) {
    const err = error as { response?: { status?: number; data?: unknown }; validationErrors?: unknown };
    apiLog('ERROR', 'Failed to create lead in KiwiPay backend', {
      error: (error as Error).message,
      status: err.response?.status,
      data: err.response?.data,
      validationErrors: err.validationErrors
    });
    throw error;
  }
};

export const updateLead = async (id: number, lead: Partial<Lead>): Promise<Lead> => {
  apiLog('REQUEST', 'Updating lead in KiwiPay backend', {
    id,
    cliente: lead.cliente,
    changes: Object.keys(lead)
  });

  try {
    // Adaptar los datos del frontend al formato del backend
    const backendData = adaptFrontendToBackend(lead) as UpdateLeadRequest;

    const response = await apiClient.put<BackendLead>(`/leads/${id}`, backendData);

    apiLog('SUCCESS', 'Lead updated successfully in KiwiPay backend', {
      id: response.data.id,
      clientName: response.data.clientName,
      updatedAt: response.data.updatedAt
    });

    const adaptedLead = adaptBackendToFrontend(response.data);

    apiLog('SUCCESS', 'Updated lead adapted to frontend format', {
      id: adaptedLead.id,
      cliente: adaptedLead.cliente
    });

    return adaptedLead;

  } catch (error: unknown) {
    const err = error as { response?: { status?: number; data?: unknown }; validationErrors?: unknown };
    apiLog('ERROR', 'Failed to update lead in KiwiPay backend', {
      id,
      error: (error as Error).message,
      status: err.response?.status,
      data: err.response?.data,
      validationErrors: err.validationErrors
    });
    throw error;
  }
};

export const deleteLead = async (id: number): Promise<void> => {
  apiLog('REQUEST', 'Deleting lead from KiwiPay backend', { id });

  try {
    await apiClient.delete(`/leads/${id}`);

    apiLog('SUCCESS', 'Lead deleted successfully from KiwiPay backend', { id });

  } catch (error: unknown) {
    const err = error as { response?: { status?: number; data?: unknown }; validationErrors?: unknown };
    apiLog('ERROR', 'Failed to delete lead from KiwiPay backend', {
      id,
      error: (error as Error).message,
      status: err.response?.status,
      data: err.response?.data
    });
    throw error;
  }
};

// Log de inicialización del servicio
apiLog('SUCCESS', 'LeadService initialized for KiwiPay backend', {
  methods: ['getLeads', 'getLeadById', 'createLead', 'updateLead', 'deleteLead'],
  adaptors: ['adaptBackendToFrontend', 'adaptFrontendToBackend']
});