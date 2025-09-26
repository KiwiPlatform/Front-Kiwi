/**
 * This file contains direct mock implementations for API endpoints
 * that can replace the real API calls when VITE_USE_MOCKS is true
 */

import { authHandlers, leadHandlers } from './MockHandlers';
import { apiLog } from '../config/environment';
import axios from 'axios';

// Direct mock API implementation
export const mockApi = {
  auth: {
    // Mock login implementation
    login: async (username: string, password: string) => {
      apiLog('REQUEST', '[MOCK DIRECT] Login attempt', { username });
      try {
        const response = await authHandlers.login(username, password);
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  },
  
  leads: {
    // Get all leads
    getAll: async () => {
      apiLog('REQUEST', '[MOCK DIRECT] Fetching all leads', {});
      const response = await leadHandlers.getLeads();
      return response.data;
    },
    
    // Get lead by ID
    getById: async (id: number) => {
      apiLog('REQUEST', '[MOCK DIRECT] Fetching lead by ID', { id });
      try {
        const response = await leadHandlers.getLeadById(id);
        return response.data;
      } catch (error) {
        if ((error as any).response?.status === 404) {
          return null;
        }
        throw error;
      }
    },
    
    // Create new lead
    create: async (leadData: any) => {
      apiLog('REQUEST', '[MOCK DIRECT] Creating lead', { data: leadData });
      const response = await leadHandlers.createLead(leadData);
      return response.data;
    },
    
    // Update lead
    update: async (id: number, leadData: any) => {
      apiLog('REQUEST', '[MOCK DIRECT] Updating lead', { id, data: leadData });
      const response = await leadHandlers.updateLead(id, leadData);
      return response.data;
    },
    
    // Delete lead
    delete: async (id: number) => {
      apiLog('REQUEST', '[MOCK DIRECT] Deleting lead', { id });
      await leadHandlers.deleteLead(id);
      return true;
    }
  }
};

// Function to patch service methods with mock implementations
export const patchServicesWithMocks = () => {
  // This would directly patch service methods to use our mock implementations
  // if we need to bypass Axios entirely
  
  apiLog('SUCCESS', '🔶 DIRECT MOCK MODE: Services patched to use mock implementations', {});
  
  // Example of how to directly patch axios
  const originalPost = axios.post;
  axios.post = async function(url: string, data?: any, config?: any) {
    apiLog('REQUEST', `🔶 AXIOS PATCH: Intercepting POST ${url}`, { data });
    
    // Login endpoint
    if (url.includes('/auth/login') || url.endsWith('auth/login')) {
      try {
        const result = await mockApi.auth.login(data.username, data.password);
        return { data: result, status: 200, statusText: 'OK', headers: {}, config: {}, request: {} };
      } catch (error) {
        throw error;
      }
    }
    
    // If no matching endpoint, pass through to original implementation
    return originalPost(url, data, config);
  };
};