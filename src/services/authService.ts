import apiClient from './apiClient';
import { apiLog } from '../config/environment';

// Interfaces para el backend KiwiPay
interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  type: string;
  username: string;
  email: string;
  role: string;
  expiresIn: number;
}

// Interfaz adaptada para mantener compatibilidad con el frontend actual
interface CompatibleUser {
  user: {
    name: string;
    first_surname: string;
    email: string;
    role?: string;
  };
  token: string;
}

const login = async (username: string, password: string): Promise<CompatibleUser> => {
  apiLog('REQUEST', 'Attempting login', { username, passwordProvided: !!password });

  try {
    // Llamada real al backend KiwiPay
    const response = await apiClient.post<LoginResponse>('/auth/login', {
      username,
      password,
    } as LoginRequest);

    apiLog('SUCCESS', 'Login successful from KiwiPay backend', {
      username: response.data.username,
      email: response.data.email,
      role: response.data.role,
      tokenType: response.data.type,
      expiresIn: response.data.expiresIn
    });

    // Adaptar la respuesta del backend al formato esperado por el frontend
    const compatibleUser: CompatibleUser = {
      user: {
        name: response.data.username,
        first_surname: '', // El backend KiwiPay no retorna apellido, usar vacío
        email: response.data.email,
        role: response.data.role,
      },
      token: response.data.token,
    };

    // Guardar datos del usuario en localStorage
    localStorage.setItem('user', JSON.stringify(compatibleUser));
    
    apiLog('SUCCESS', 'User data stored in localStorage', {
      userStored: !!localStorage.getItem('user')
    });

    return compatibleUser;
    
  } catch (error: any) {
    apiLog('ERROR', 'Login failed', {
      error: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    
    // Re-lanzar el error para que sea manejado por el componente
    throw error;
  }
};

const logout = () => {
  apiLog('REQUEST', 'Logging out user', {
    hadUser: !!localStorage.getItem('user')
  });
  
  localStorage.removeItem('user');
  
  apiLog('SUCCESS', 'User logged out successfully', {
    userRemoved: !localStorage.getItem('user')
  });
};

const getCurrentUser = (): CompatibleUser | null => {
  const userStr = localStorage.getItem('user');
  
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      apiLog('SUCCESS', 'Current user retrieved from localStorage', {
        username: user.user?.name,
        email: user.user?.email,
        hasToken: !!user.token
      });
      return user;
    } catch (error) {
      apiLog('ERROR', 'Error parsing user data from localStorage', error);
      localStorage.removeItem('user'); // Limpiar datos corruptos
      return null;
    }
  }
  
  apiLog('REQUEST', 'No current user found in localStorage', {});
  return null;
};

const isAuthenticated = (): boolean => {
  const user = getCurrentUser();
  const isAuth = !!(user && user.token);
  
  apiLog('REQUEST', 'Checking authentication status', {
    isAuthenticated: isAuth,
    hasUser: !!user,
    hasToken: !!(user?.token)
  });
  
  return isAuth;
};

const getToken = (): string | null => {
  const user = getCurrentUser();
  const token = user?.token || null;
  
  apiLog('REQUEST', 'Getting authentication token', {
    hasToken: !!token,
    tokenLength: token ? token.length : 0
  });
  
  return token;
};

const authService = {
  login,
  logout,
  getCurrentUser,
  isAuthenticated,
  getToken,
};

// Log de inicialización del servicio
apiLog('SUCCESS', 'AuthService initialized for KiwiPay backend', {
  methods: Object.keys(authService)
});

export default authService; 