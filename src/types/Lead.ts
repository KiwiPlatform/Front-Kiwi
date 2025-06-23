export enum LeadStatus {
  NUEVO = "NUEVO",
  CONTACTADO = "CONTACTADO",
  EN_EVALUACION = "EN_EVALUACION",
  PRE_APROBADO = "PRE_APROBADO",
  APROBADO = "APROBADO",
  RECHAZADO = "RECHAZADO",
  DESEMBOLSADO = "DESEMBOLSADO"
}

export const LeadStatusLabels: Record<LeadStatus, string> = {
  [LeadStatus.NUEVO]: "Nuevo",
  [LeadStatus.CONTACTADO]: "Contactado",
  [LeadStatus.EN_EVALUACION]: "En Evaluación",
  [LeadStatus.PRE_APROBADO]: "Pre-aprobado",
  [LeadStatus.APROBADO]: "Aprobado",
  [LeadStatus.RECHAZADO]: "Rechazado",
  [LeadStatus.DESEMBOLSADO]: "Desembolsado"
};

export interface Lead {
  id: number;
  cliente: string;
  clinica: string;
  correo: string;
  costo: string;
  dni: string;
  especialidad: string;
  ingreso: string;
  recepcionista: string;
  telefono: string;
  fechaRegistro?: string; // Fecha completa DD/MM/YY HH:MM
  origen?: string; // Origen del lead (WEB, etc.)
  observacion?: string; // Observación opcional
  status: LeadStatus;
}