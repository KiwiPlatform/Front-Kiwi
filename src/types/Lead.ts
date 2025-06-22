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
}