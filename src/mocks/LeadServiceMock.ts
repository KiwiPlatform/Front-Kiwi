/**
 * Direct implementation of lead service using mock data instead of API calls.
 * This completely bypasses Axios and the API client.
 */

import { apiLog } from '../config/environment';
import { mockLeads, getNextLeadId, saveMockData } from './MockData';
import { Lead } from '../types/Lead';

// Direct mock implementation of lead service
export const leadServiceMock = {
  // Get all leads
  getLeads: async (): Promise<Lead[]> => {
    apiLog('REQUEST', '[DIRECT MOCK] Fetching all leads', {});
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    apiLog('SUCCESS', '[DIRECT MOCK] Leads fetched successfully', { 
      count: mockLeads.length,
      leads: mockLeads.slice(0, 3).map(lead => ({ id: lead.id, cliente: lead.cliente }))
    });
    
    return [...mockLeads]; // Return a copy to avoid accidental mutations
  },
  
  // Get lead by ID
  getLeadById: async (id: number): Promise<Lead | undefined> => {
    apiLog('REQUEST', '[DIRECT MOCK] Fetching lead by ID', { id });
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const lead = mockLeads.find(lead => lead.id === id);
    
    if (!lead) {
      apiLog('ERROR', '[DIRECT MOCK] Lead not found', { id });
      return undefined;
    }
    
    apiLog('SUCCESS', '[DIRECT MOCK] Lead found', { 
      id: lead.id, 
      cliente: lead.cliente,
      status: lead.status
    });
    
    return { ...lead }; // Return a copy to avoid accidental mutations
  },
  
  // Create new lead
  createLead: async (lead: Omit<Lead, 'id'>): Promise<Lead> => {
    apiLog('REQUEST', '[DIRECT MOCK] Creating new lead', { 
      cliente: lead.cliente,
      dni: lead.dni
    });
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Create new lead with auto-generated ID
    const newLead: Lead = {
      ...lead,
      id: getNextLeadId()
    };
    
    // Add to mock leads array
    mockLeads.push(newLead);
    saveMockData();
    
    apiLog('SUCCESS', '[DIRECT MOCK] Lead created successfully', { 
      id: newLead.id, 
      cliente: newLead.cliente
    });
    
    return { ...newLead }; // Return a copy to avoid accidental mutations
  },
  
  // Update lead
  updateLead: async (id: number, lead: Partial<Lead>): Promise<Lead> => {
    apiLog('REQUEST', '[DIRECT MOCK] Updating lead', { 
      id,
      changes: Object.keys(lead)
    });
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find lead index
    const leadIndex = mockLeads.findIndex(l => l.id === id);
    
    if (leadIndex === -1) {
      apiLog('ERROR', '[DIRECT MOCK] Lead not found for update', { id });
      throw new Error(`Lead with ID ${id} not found`);
    }
    
    // Update lead with new data
    const updatedLead: Lead = {
      ...mockLeads[leadIndex],
      ...lead,
      id // Ensure ID remains the same
    };
    
    // Update in mock array
    mockLeads[leadIndex] = updatedLead;
    saveMockData();
    
    apiLog('SUCCESS', '[DIRECT MOCK] Lead updated successfully', { 
      id, 
      cliente: updatedLead.cliente 
    });
    
    return { ...updatedLead }; // Return a copy to avoid accidental mutations
  },
  
  // Delete lead
  deleteLead: async (id: number): Promise<void> => {
    apiLog('REQUEST', '[DIRECT MOCK] Deleting lead', { id });
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Find lead index
    const leadIndex = mockLeads.findIndex(lead => lead.id === id);
    
    if (leadIndex === -1) {
      apiLog('ERROR', '[DIRECT MOCK] Lead not found for deletion', { id });
      throw new Error(`Lead with ID ${id} not found`);
    }
    
    // Remove from mock array
    mockLeads.splice(leadIndex, 1);
    saveMockData();
    
    apiLog('SUCCESS', '[DIRECT MOCK] Lead deleted successfully', { id });
  }
};