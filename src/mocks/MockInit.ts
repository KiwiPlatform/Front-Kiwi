import { apiLog, isUsingMocks, config } from '../config/environment';
import { initMockData } from './MockData';
import { patchServicesWithMocks } from './DirectMockApi';

// Function to initialize mock system when the app starts
export const initMockSystem = () => {
  // Initialize mock data
  initMockData();

  if (isUsingMocks()) {
    // Patch global Axios if needed
    patchServicesWithMocks();
    
    apiLog('SUCCESS', '🔶 MOCK SYSTEM INITIALIZED - Data will be provided by mock handlers 🔶', {
      configuredApiUrl: config.API_URL,
      mockActive: true
    });
    
    // Add a global indicator to the UI that we're in mock mode (if in development)
    if (config.IS_DEVELOPMENT) {
      setTimeout(() => {
        try {
          const mockIndicator = document.createElement('div');
          mockIndicator.style.position = 'fixed';
          mockIndicator.style.bottom = '10px';
          mockIndicator.style.right = '10px';
          mockIndicator.style.backgroundColor = 'orange';
          mockIndicator.style.color = 'black';
          mockIndicator.style.padding = '5px 10px';
          mockIndicator.style.borderRadius = '5px';
          mockIndicator.style.fontWeight = 'bold';
          mockIndicator.style.zIndex = '9999';
          mockIndicator.style.opacity = '0.8';
          mockIndicator.textContent = '🔶 MOCK MODE';
          document.body.appendChild(mockIndicator);
        } catch (e) {
          console.warn('Could not add mock indicator to UI', e);
        }
      }, 1000);
    }
    
    return true;
  }
  
  apiLog('SUCCESS', 'Using real API - Mock system disabled', {
    configuredApiUrl: config.API_URL
  });
  
  return false;
};

// Export a direct check function
export const isMockMode = () => isUsingMocks();