/**
 * Direct implementation of auth service using mock data instead of API calls.
 * This completely bypasses Axios and the API client.
 */

import { apiLog } from '../config/environment';
import { mockUsers } from './MockData';

// Interface compatible with the frontend expected result
export interface CompatibleUser {
  user: {
    name: string;
    first_surname: string;
    email: string;
    role?: string;
  };
  token: string;
  expiresAt?: number;
}

// Direct mock implementation of auth service
export const authServiceMock = {
  // Mock login implementation
  login: async (username: string, password: string): Promise<CompatibleUser> => {
    apiLog('REQUEST', '[DIRECT MOCK] Attempting login', { username, passwordProvided: !!password });
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if user exists and password matches
    const mockUser = mockUsers[username];
    if (!mockUser || mockUser.password !== password) {
      apiLog('ERROR', '[DIRECT MOCK] Login failed - Invalid credentials', {
        attemptedUsername: username,
        userExists: !!mockUser
      });
      
      throw new Error('Invalid username or password');
    }
    
    // Return successful login response
    apiLog('SUCCESS', '[DIRECT MOCK] Login successful', { 
      username,
      role: mockUser.userData.user.role
    });
    
    // Store user data in localStorage like the real service would
    localStorage.setItem('user', JSON.stringify(mockUser.userData));
    
    return mockUser.userData;
  },
  
  // Mock logout implementation
  logout: () => {
    apiLog('REQUEST', '[DIRECT MOCK] Logging out user', {
      hadUser: !!localStorage.getItem('user')
    });
    
    localStorage.removeItem('user');
    
    apiLog('SUCCESS', '[DIRECT MOCK] User logged out successfully', {
      userRemoved: !localStorage.getItem('user')
    });
  },
  
  // Mock getCurrentUser implementation
  getCurrentUser: (): CompatibleUser | null => {
    const userStr = localStorage.getItem('user');
    
    if (userStr) {
      try {
        const user = JSON.parse(userStr) as CompatibleUser;
        
        // Check if token has expired
        if (user.expiresAt && Date.now() > user.expiresAt) {
          console.warn('[DIRECT MOCK] Token expired, removing user data', {
            expiredAt: new Date(user.expiresAt).toISOString(),
            currentTime: new Date().toISOString()
          });
          localStorage.removeItem('user');
          return null;
        }
        
        apiLog('SUCCESS', '[DIRECT MOCK] Current user retrieved from localStorage', {
          username: user.user?.name,
          email: user.user?.email,
          hasToken: !!user.token
        });
        
        return user;
      } catch (error) {
        apiLog('ERROR', '[DIRECT MOCK] Error parsing user data from localStorage', error);
        localStorage.removeItem('user');
        return null;
      }
    }
    
    apiLog('REQUEST', '[DIRECT MOCK] No current user found in localStorage', {});
    return null;
  },
  
  // Mock isAuthenticated implementation
  isAuthenticated: (): boolean => {
    const user = authServiceMock.getCurrentUser();
    const isAuth = !!(user && user.token);
    
    apiLog('REQUEST', '[DIRECT MOCK] Checking authentication status', {
      isAuthenticated: isAuth,
      hasUser: !!user,
      hasToken: !!(user?.token)
    });
    
    return isAuth;
  },
  
  // Mock getToken implementation
  getToken: (): string | null => {
    const user = authServiceMock.getCurrentUser();
    const token = user?.token || null;
    
    apiLog('REQUEST', '[DIRECT MOCK] Getting authentication token', {
      hasToken: !!token,
      tokenLength: token ? token.length : 0
    });
    
    return token;
  },
  
  // Mock isTokenExpiringSoon implementation
  isTokenExpiringSoon: (minutesThreshold: number = 5): boolean => {
    const user = authServiceMock.getCurrentUser();
    if (!user?.expiresAt) return false;
    
    const timeUntilExpiry = user.expiresAt - Date.now();
    const minutesUntilExpiry = timeUntilExpiry / (1000 * 60);
    
    return minutesUntilExpiry <= minutesThreshold;
  }
};