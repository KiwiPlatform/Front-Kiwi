import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

interface LeadsContextType {
  leadsVersion: number;
  refreshLeads: () => void;
}

const LeadsContext = createContext<LeadsContextType | undefined>(undefined);

export const LeadsProvider = ({ children }: { children: ReactNode }) => {
  const [leadsVersion, setLeadsVersion] = useState(0);

  const refreshLeads = useCallback(() => {
    setLeadsVersion(v => v + 1);
  }, []);

  return (
    <LeadsContext.Provider value={{ leadsVersion, refreshLeads }}>
      {children}
    </LeadsContext.Provider>
  );
};

export const useLeadsContext = () => {
  const context = useContext(LeadsContext);
  if (!context) {
    throw new Error('useLeadsContext must be used within a LeadsProvider');
  }
  return context;
}; 