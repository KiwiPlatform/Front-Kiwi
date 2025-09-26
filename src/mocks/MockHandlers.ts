import { mockUsers, mockLeads, getNextLeadId, saveMockData } from './MockData';
import { Lead, LeadStatus } from '../types/Lead';
import { apiLog } from '../config/environment';

// Mock delay to simulate network request
const mockDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Common mock response structure
interface MockResponse<T> {
  data: T;
  status: number;
  headers: Record<string, string>;
  config: Record<string, any>;
  statusText: string;
}

// Create standardized mock response
function createMockResponse<T>(data: T, status = 200): MockResponse<T> {
  return {
    data,
    status,
    headers: {
      'content-type': 'application/json'
    },
    config: {},
    statusText: status === 200 ? 'OK' : 'Error'
  };
}

// Authentication handlers
export const authHandlers = {
  // Mock login handler
  async login(username: string, password: string) {
    apiLog('REQUEST', '[MOCK] Login attempt', { 
      username,
      availableUsers: Object.keys(mockUsers),
      isMockUser: !!mockUsers[username]
    });
    
    console.log('🔑 MOCK AUTH: Login attempt with:', { 
      username, 
      passwordProvided: !!password,
      availableMockUsers: Object.keys(mockUsers)
    });
    
    // Simulate network delay
    await mockDelay(500);
    
    // Check if user exists and password matches
    const mockUser = mockUsers[username];
    if (!mockUser || mockUser.password !== password) {
      apiLog('ERROR', '[MOCK] Login failed - Invalid credentials', {
        attemptedUsername: username,
        userExists: !!mockUser,
        passwordMatch: mockUser ? (mockUser.password === password) : false
      });
      
      throw {
        response: {
          status: 401,
          data: {
            title: 'Authentication Failed',
            detail: 'Invalid username or password',
            status: 401
          }
        }
      };
    }
    
    // Return successful login response
    apiLog('SUCCESS', '[MOCK] Login successful', { 
      username,
      role: mockUser.userData.user.role,
      token: `${mockUser.userData.token.substring(0, 10)}...`
    });
    
    return createMockResponse(mockUser.userData);
  }
};

// Leads handlers
export const leadHandlers = {
  // Get all leads
  async getLeads() {
    apiLog('REQUEST', '[MOCK] Fetching all leads', {});
    
    // Simulate network delay
    await mockDelay(700);
    
    apiLog('SUCCESS', '[MOCK] Leads fetched successfully', { count: mockLeads.length });
    return createMockResponse(mockLeads);
  },
  
  // Get lead by ID
  async getLeadById(id: number) {
    apiLog('REQUEST', '[MOCK] Fetching lead by ID', { id });
    
    // Simulate network delay
    await mockDelay(300);
    
    // Find lead with matching ID
    const lead = mockLeads.find(lead => lead.id === id);
    
    if (!lead) {
      apiLog('ERROR', '[MOCK] Lead not found', { id });
      throw {
        response: {
          status: 404,
          data: {
            title: 'Not Found',
            detail: `Lead with ID ${id} not found`,
            status: 404
          }
        }
      };
    }
    
    apiLog('SUCCESS', '[MOCK] Lead found', { id, cliente: lead.cliente });
    return createMockResponse(lead);
  },
  
  // Create new lead
  async createLead(leadData: Omit<Lead, 'id'>) {
    apiLog('REQUEST', '[MOCK] Creating new lead', { cliente: leadData.cliente });
    
    // Simulate network delay
    await mockDelay(800);
    
    // Create new lead with auto-generated ID
    const newLead: Lead = {
      ...leadData,
      id: getNextLeadId(),
      fechaRegistro: new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).replace(',', '')
    };
    
    // Ensure status is valid or set to default
    if (!Object.values(LeadStatus).includes(newLead.status)) {
      newLead.status = LeadStatus.NUEVO;
    }
    
    // Add to mock leads array
    mockLeads.push(newLead);
    saveMockData();
    
    apiLog('SUCCESS', '[MOCK] Lead created successfully', { id: newLead.id, cliente: newLead.cliente });
    return createMockResponse(newLead);
  },
  
  // Update lead
  async updateLead(id: number, leadData: Partial<Lead>) {
    apiLog('REQUEST', '[MOCK] Updating lead', { id, changes: Object.keys(leadData) });
    
    // Simulate network delay
    await mockDelay(500);
    
    // Find lead index
    const leadIndex = mockLeads.findIndex(lead => lead.id === id);
    
    if (leadIndex === -1) {
      apiLog('ERROR', '[MOCK] Lead not found for update', { id });
      throw {
        response: {
          status: 404,
          data: {
            title: 'Not Found',
            detail: `Lead with ID ${id} not found`,
            status: 404
          }
        }
      };
    }
    
    // Update lead with new data
    const updatedLead: Lead = {
      ...mockLeads[leadIndex],
      ...leadData,
      id // Ensure ID remains the same
    };
    
    // Update in mock array
    mockLeads[leadIndex] = updatedLead;
    saveMockData();
    
    apiLog('SUCCESS', '[MOCK] Lead updated successfully', { id, cliente: updatedLead.cliente });
    return createMockResponse(updatedLead);
  },
  
  // Delete lead
  async deleteLead(id: number) {
    apiLog('REQUEST', '[MOCK] Deleting lead', { id });
    
    // Simulate network delay
    await mockDelay(600);
    
    // Find lead index
    const leadIndex = mockLeads.findIndex(lead => lead.id === id);
    
    if (leadIndex === -1) {
      apiLog('ERROR', '[MOCK] Lead not found for deletion', { id });
      throw {
        response: {
          status: 404,
          data: {
            title: 'Not Found',
            detail: `Lead with ID ${id} not found`,
            status: 404
          }
        }
      };
    }
    
    // Remove from mock array
    mockLeads.splice(leadIndex, 1);
    saveMockData();
    
    apiLog('SUCCESS', '[MOCK] Lead deleted successfully', { id });
    return createMockResponse(null);
  }
};

// Export all handlers
export const mockHandlers = {
  auth: authHandlers,
  leads: leadHandlers
};