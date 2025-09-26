// Import environment first to check mock status
import { isUsingMocks, config } from './config/environment';

// Initialize mock system BEFORE any other imports if enabled
// This must happen before axios or any service is imported
if (isUsingMocks()) {
  console.log('🔍 MAIN.TSX - MOCK MODE ENABLED - Initializing mock system...');
  
  // Set up a global API mock flag
  (window as any).__USING_API_MOCKS__ = true;
  
  // Import and initialize mocks
  import('./mocks/MockInit').then(({ initMockSystem }) => {
    initMockSystem();
  });
  
  // Import and setup mock interceptor
  import('./mocks/MockService').then(({ setupMockInterceptor }) => {
    setupMockInterceptor();
  });
} else {
  console.log('🔍 MAIN.TSX - Using real API at:', config.API_URL);
  (window as any).__USING_API_MOCKS__ = false;
}

// Now import React and other dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
