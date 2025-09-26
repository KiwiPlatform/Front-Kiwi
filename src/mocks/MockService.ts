import { apiLog, isUsingMocks, config } from '../config/environment';
import { mockHandlers } from './MockHandlers';
import axios from 'axios';

// Immediate debug log for mock status
console.log('🔍 MOCK SERVICE INITIALIZATION:', {
  USE_MOCKS: config.USE_MOCKS,
  VITE_USE_MOCKS: import.meta.env.VITE_USE_MOCKS,
  API_URL: config.API_URL
});

// URL pattern matching for endpoints - include both relative paths and full URLs
const AUTH_LOGIN_PATTERN = /\/auth\/login$|\/api\/auth\/login$|.*\/api\/v1\/auth\/login$/;
const LEADS_ALL_PATTERN = /\/leads\/all$|\/api\/leads\/all$|.*\/api\/v1\/leads\/all$/;
const LEADS_ID_PATTERN = /\/leads\/(\d+)$|\/api\/leads\/(\d+)$|.*\/api\/v1\/leads\/(\d+)$/;
const LEADS_CREATE_PATTERN = /\/leads$|\/api\/leads$|.*\/api\/v1\/leads$/;

/**
 * This function creates a mock interceptor for axios requests
 * It intercepts requests if VITE_USE_MOCKS is true and responds with mock data
 */
export const setupMockInterceptor = () => {
  if (!isUsingMocks()) {
    apiLog('SUCCESS', 'Mock interceptor not setup - Using real API', {});
    return;
  }

  // Override axios defaults for mock mode to prevent network requests
  axios.defaults.baseURL = 'http://mock-api';
  axios.defaults.adapter = function mockAdapter(config) {
    // This adapter prevents real network calls in mock mode
    return new Promise((resolve) => {
      resolve({
        data: { message: 'Mock adapter prevented network request' },
        status: 200,
        statusText: 'MOCKED',
        headers: {},
        config: config,
      });
    });
  };

  apiLog('SUCCESS', '🔶 MOCK MODE ENABLED - Using mock data instead of real API 🔶', {
    baseURL: axios.defaults.baseURL,
    adapter: 'mock adapter enabled'
  });

  // Use request interceptor to completely bypass the actual API call when mocks are enabled
  axios.interceptors.request.use(
    async (config) => {
      // Skip non-API calls or when mocks are disabled
      if (!isUsingMocks() || !config.url) {
        return config;
      }
      
      // Get the full URL by combining baseURL and the path
      const fullUrl = config.baseURL ? `${config.baseURL}${config.url}` : config.url;
      const method = config.method?.toLowerCase() || 'get';
      
      // Display the API URL for debugging
      apiLog('SUCCESS', `🔶 MOCK MODE ACTIVE: API URL configured as ${config.baseURL}`, {
        baseURL: config.baseURL,
        url: config.url,
        fullUrl: fullUrl
      });
      
      apiLog('REQUEST', `🔶 MOCK MODE: Intercepting ${method.toUpperCase()} ${fullUrl}`, {
        mockMode: true,
        url: config.url,
        fullUrl,
        method,
        data: config.data
      });
      
      try {
        // Parse request data if it's a string
        let requestData = config.data;
        if (typeof requestData === 'string') {
          try {
            requestData = JSON.parse(requestData);
          } catch (e) {
            // Keep as is if not valid JSON
          }
        }
        
        // Try to handle with mock - use both the URL path and the full URL
        const mockResponse = await handleMockRequest(fullUrl || config.url, method, requestData);
        
        if (mockResponse) {
          apiLog('SUCCESS', `🔶 MOCK RESPONSE: ${method.toUpperCase()} ${fullUrl}`, {
            mockData: mockResponse.data,
            status: mockResponse.status
          });
          
          // Create a resolved promise with the mock response to completely bypass the actual request
          // This is the key part that prevents the real API call from happening
          return Promise.resolve({
            ...config,
            adapter: () => {
              return Promise.resolve({
                data: mockResponse.data,
                status: mockResponse.status,
                statusText: mockResponse.statusText,
                headers: mockResponse.headers,
                config,
                request: {}
              });
            }
          });
        }
      } catch (error: any) {
        // If the mock handler threw an error, reject the request with the mock error
        apiLog('ERROR', `🔶 MOCK ERROR: ${method.toUpperCase()} ${config.url}`, {
          error: error.response?.data || error.message
        });
        
        // Reject the promise with the mock error
        return Promise.reject(error);
      }
      
      // If no mock handler matched or it returned null, continue with the actual request
      // This should not happen in mock mode if all your endpoints are properly mocked
      apiLog('ERROR', `🔶 MOCK MODE: No mock found for ${method.toUpperCase()} ${config.url}, performing real request`, {
        url: config.url,
        method: method
      });
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  apiLog('SUCCESS', '🔶 Mock interceptor setup successfully', { active: true });
};

/**
 * Handle mock requests based on URL patterns
 */
async function handleMockRequest(
  url: string,
  method: string,
  requestData: any
): Promise<any | null> {
  // Skip non-API endpoints
  if (!url) return null;
  
  // Log what we're trying to mock
  apiLog('REQUEST', `🔶 MOCK MODE: Checking patterns for ${method.toUpperCase()} ${url}`, {
    patterns: {
      AUTH_LOGIN_PATTERN: AUTH_LOGIN_PATTERN.toString(),
      LEADS_ALL_PATTERN: LEADS_ALL_PATTERN.toString(),
      LEADS_ID_PATTERN: LEADS_ID_PATTERN.toString(),
      LEADS_CREATE_PATTERN: LEADS_CREATE_PATTERN.toString()
    }
  });

  // Authentication endpoints
  if (method === 'post' && AUTH_LOGIN_PATTERN.test(url)) {
    const { username, password } = requestData || {};
    return mockHandlers.auth.login(username, password);
  }
  
  // Leads endpoints
  
  // GET /leads/all - Get all leads
  if (method === 'get' && LEADS_ALL_PATTERN.test(url)) {
    return mockHandlers.leads.getLeads();
  }
  
  // GET /leads/:id - Get lead by ID
  if (method === 'get' && LEADS_ID_PATTERN.test(url)) {
    const match = url.match(LEADS_ID_PATTERN);
    // Find the first non-undefined group that contains a number
    const idStr = match ? match.slice(1).find(group => group !== undefined) : null;
    const id = idStr ? parseInt(idStr, 10) : 0;
    
    apiLog('REQUEST', `🔶 MOCK MODE: Extracted ID ${id} from URL ${url}`, {
      match: match ? match[0] : null,
      groups: match ? match.slice(1) : []
    });
    
    return mockHandlers.leads.getLeadById(id);
  }
  
  // POST /leads - Create lead
  if (method === 'post' && LEADS_CREATE_PATTERN.test(url)) {
    return mockHandlers.leads.createLead(requestData);
  }
  
  // PUT /leads/:id - Update lead
  if (method === 'put' && LEADS_ID_PATTERN.test(url)) {
    const match = url.match(LEADS_ID_PATTERN);
    // Find the first non-undefined group that contains a number
    const idStr = match ? match.slice(1).find(group => group !== undefined) : null;
    const id = idStr ? parseInt(idStr, 10) : 0;
    
    apiLog('REQUEST', `🔶 MOCK MODE: Extracted ID ${id} from URL ${url} for update`, {
      match: match ? match[0] : null,
      groups: match ? match.slice(1) : []
    });
    
    return mockHandlers.leads.updateLead(id, requestData);
  }
  
  // DELETE /leads/:id - Delete lead
  if (method === 'delete' && LEADS_ID_PATTERN.test(url)) {
    const match = url.match(LEADS_ID_PATTERN);
    // Find the first non-undefined group that contains a number
    const idStr = match ? match.slice(1).find(group => group !== undefined) : null;
    const id = idStr ? parseInt(idStr, 10) : 0;
    return mockHandlers.leads.deleteLead(id);
  }
  
  // If no mock handler matches, return null to let the request continue
  apiLog('ERROR', `🔶 MOCK MODE: No matching handler for ${method.toUpperCase()} ${url}`, {
    url,
    method,
    patterns: {
      authLogin: AUTH_LOGIN_PATTERN.test(url),
      leadsAll: LEADS_ALL_PATTERN.test(url),
      leadsId: LEADS_ID_PATTERN.test(url),
      leadsCreate: LEADS_CREATE_PATTERN.test(url)
    }
  });
  
  return null;
}