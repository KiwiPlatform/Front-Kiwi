// Configuración de variables de entorno
export const config = {
  // API Configuration - Backend KiwiPay
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1',
  USE_MOCKS: import.meta.env.VITE_USE_MOCKS === 'true',
  
  // App Configuration
  APP_NAME: import.meta.env.VITE_APP_NAME || 'KiwiPay Loan Management',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  
  // Environment
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
  
  // Debug Configuration
  DEBUG_LOGS: import.meta.env.VITE_DEBUG === 'true' || import.meta.env.DEV,
} as const;

// Helper para verificar si estamos usando mocks
export const isUsingMocks = () => config.USE_MOCKS;

// Helper para obtener la URL base de la API
export const getApiUrl = (endpoint: string = '') => {
  return `${config.API_URL}${endpoint}`;
};

// Helper para logging mejorado
export const apiLog = (type: 'REQUEST' | 'RESPONSE' | 'ERROR' | 'SUCCESS', message: string, data?: unknown) => {
  if (config.DEBUG_LOGS) {
    const timestamp = new Date().toLocaleTimeString();
    const emoji = {
      REQUEST: '🚀',
      RESPONSE: '📥', 
      ERROR: '❌',
      SUCCESS: '✅'
    };
    
    console.log(`${emoji[type]} [${timestamp}] KIWIPAY API ${type}: ${message}`, data || '');
  }
};

// Helper para logging en desarrollo
export const devLog = (...args: unknown[]) => {
  if (config.IS_DEVELOPMENT) {
    console.log('[DEV]', ...args);
  }
}; 