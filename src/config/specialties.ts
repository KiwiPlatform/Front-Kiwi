// Mapeo de especialidades del frontend a IDs del backend
export const SPECIALTY_MAPPING: Record<string, number> = {
  'Dermatología': 1,
  'Cardiología': 2,
  'Oftalmología': 3,
  'Odontología': 4,
  'Ginecología': 5,
  'Neurología': 6,
  'Psicología': 7,
  'Ortopedia': 8,
  'Pediatría': 9,
  'Traumatología': 10
};

// Mapeo inverso de IDs del backend a nombres del frontend
export const SPECIALTY_ID_TO_NAME: Record<number, string> = {
  1: 'Dermatología',
  2: 'Cardiología',
  3: 'Oftalmología',
  4: 'Odontología',
  5: 'Ginecología',
  6: 'Neurología',
  7: 'Psicología',
  8: 'Ortopedia',
  9: 'Pediatría',
  10: 'Traumatología'
};

// Función para obtener el ID de una especialidad
export const getSpecialtyId = (specialtyName: string): number => {
  const id = SPECIALTY_MAPPING[specialtyName] || 1; // Default a 1 si no se encuentra
  
  // Log de depuración
  console.log('getSpecialtyId:', {
    specialtyName: specialtyName,
    mappedId: id,
    availableSpecialties: Object.keys(SPECIALTY_MAPPING)
  });
  
  return id;
};

// Función para obtener el nombre de una especialidad por ID
export const getSpecialtyName = (specialtyId: number): string => {
  const name = SPECIALTY_ID_TO_NAME[specialtyId] || 'Sin especificar';
  
  // Log de depuración
  console.log('getSpecialtyName:', {
    specialtyId: specialtyId,
    mappedName: name,
    availableIds: Object.keys(SPECIALTY_ID_TO_NAME)
  });
  
  return name;
}; 