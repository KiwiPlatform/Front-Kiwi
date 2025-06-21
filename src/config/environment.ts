// Configuración de variables de entorno
export const config = {
  // API Configuration
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  USE_MOCKS: import.meta.env.VITE_USE_MOCKS === 'true',
  
  // App Configuration
  APP_NAME: import.meta.env.VITE_APP_NAME || 'FRONT-kiwi',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  
  // Environment
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
} as const;

// Helper para verificar si estamos usando mocks
export const isUsingMocks = () => config.USE_MOCKS;

// Helper para obtener la URL base de la API
export const getApiUrl = (endpoint: string = '') => {
  return `${config.API_URL}${endpoint}`;
};

// Helper para logging en desarrollo
export const devLog = (...args: unknown[]) => {
  if (config.IS_DEVELOPMENT) {
    console.log('[DEV]', ...args);
  }
}; 