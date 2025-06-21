import axios from 'axios';
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { getApiUrl, devLog } from '../config/environment';

// Crear instancia de axios con configuración base
const apiClient: AxiosInstance = axios.create({
  baseURL: getApiUrl(),
  timeout: 10000, // 10 segundos
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
    
    devLog('API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
    });
    
    return config;
  },
  (error) => {
    devLog('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para responses
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    devLog('API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
    return response;
  },
  (error: AxiosError) => {
    devLog('API Response Error:', {
      status: error.response?.status,
      message: error.message,
      url: error.config?.url,
    });

    // Manejo de errores específicos
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default apiClient; 