import axios from 'axios';
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { getApiUrl, apiLog } from '../config/environment';

// Crear instancia de axios con configuración base para KiwiPay Backend
const apiClient: AxiosInstance = axios.create({
  baseURL: getApiUrl(),
  timeout: 30000, // 30 segundos para operaciones más complejas
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requests
apiClient.interceptors.request.use(
  (config) => {
    // Agregar token de autenticación si existe
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      if (userData.token) {
        config.headers.Authorization = `Bearer ${userData.token}`;
      }
    }
    
    // Log detallado de la request
    apiLog('REQUEST', `${config.method?.toUpperCase()} ${config.url}`, {
      url: `${config.baseURL}${config.url}`,
      method: config.method?.toUpperCase(),
      data: config.data,
      params: config.params,
      headers: {
        'Content-Type': config.headers['Content-Type'],
        'Authorization': config.headers.Authorization ? 'Bearer [TOKEN]' : 'None'
      }
    });
    
    return config;
  },
  (error) => {
    apiLog('ERROR', 'Request interceptor error', error);
    return Promise.reject(error);
  }
);

// Interceptor para responses
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log detallado de la response exitosa
    apiLog('SUCCESS', `${response.config.method?.toUpperCase()} ${response.config.url} - Status: ${response.status}`, {
      status: response.status,
      statusText: response.statusText,
      url: response.config.url,
      dataType: Array.isArray(response.data) ? `Array[${response.data.length}]` : typeof response.data,
      data: response.data
    });
    
    return response;
  },
  (error: AxiosError) => {
    const method = error.config?.method?.toUpperCase();
    const url = error.config?.url;
    const status = error.response?.status;
    
    // Log detallado del error
    if (error.response) {
      // Error con respuesta del servidor
      const errorData = error.response.data;
      
      // Verificar si es formato RFC 7807 Problem Details del backend KiwiPay
      if (errorData && typeof errorData === 'object' && 'title' in errorData) {
        const problemDetail = errorData as {
          title: string;
          detail: string;
          status: number;
          errors?: Record<string, string>;
        };
        
        apiLog('ERROR', `${method} ${url} - ${status} ${problemDetail.title}`, {
          status: status,
          title: problemDetail.title,
          detail: problemDetail.detail,
          errors: problemDetail.errors,
          url: url
        });
        
        // Agregar errores de validación al error para uso en componentes
        if (problemDetail.errors) {
          (error as any).validationErrors = problemDetail.errors;
        }
      } else {
        // Error estándar
        apiLog('ERROR', `${method} ${url} - ${status} HTTP Error`, {
          status: status,
          statusText: error.response.statusText,
          data: errorData,
          url: url
        });
      }
    } else if (error.request) {
      // Error de red (sin respuesta)
      apiLog('ERROR', `${method} ${url} - Network Error`, {
        message: 'No response received from server',
        code: error.code,
        url: url
      });
    } else {
      // Error de configuración
      apiLog('ERROR', `${method} ${url} - Request Setup Error`, {
        message: error.message,
        url: url
      });
    }

    // Manejo de errores específicos
    if (error.response?.status === 401) {
      // Token expirado o inválido
      apiLog('ERROR', 'Authentication failed - Redirecting to login', {
        action: 'Removing stored user data and redirecting'
      });
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

// Log de inicialización
apiLog('SUCCESS', 'KiwiPay API Client initialized', {
  baseURL: apiClient.defaults.baseURL,
  timeout: `${apiClient.defaults.timeout}ms`
});

export default apiClient; 