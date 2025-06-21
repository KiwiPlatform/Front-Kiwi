import apiClient from './apiClient';
import { isUsingMocks, devLog } from '../config/environment';

// const API_URL = 'http://your-api-url.com/api'; // This is now just a placeholder

const login = async (username: string, password: string) => {
  devLog('Attempting login with:', { username, password });

  if (isUsingMocks()) {
    // Mock login logic
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'miriam' && password === 'password') {
          const mockUser = {
            user: {
              name: 'Miriam',
              first_surname: 'Bautista',
              email: 'moyola@autoplan.com.pe',
            },
            token: 'fake-jwt-token',
          };
          localStorage.setItem('user', JSON.stringify(mockUser));
          devLog('Mock login successful');
          resolve(mockUser);
        } else {
          devLog('Mock login failed: Invalid credentials');
          reject(new Error('Invalid credentials'));
        }
      }, 1000); // 1-second delay to simulate network request
    });
  } else {
    // Real API call
    try {
      const response = await apiClient.post('/auth/login', {
        username,
        password,
      });
      
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
        devLog('Real API login successful');
      }
      return response.data;
    } catch (error) {
      devLog('Real API login failed:', error);
      throw error;
    }
  }
};

const logout = () => {
  localStorage.removeItem('user');
  devLog('User logged out');
};

const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  return null;
};

const authService = {
  login,
  logout,
  getCurrentUser,
};

export default authService; 