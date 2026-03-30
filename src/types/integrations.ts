export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  isConnected: boolean;
  lastSyncedAt?: string;
  status: 'active' | 'inactive' | 'error' | 'pending';
  settings?: Record<string, any>;
}

export interface IntegrationState {
  integrations: Integration[];
  isLoading: boolean;
  error: string | null;
  
  init: () => Promise<void>;
  connect: (id: string, credentials?: any) => Promise<void>;
  disconnect: (id: string) => Promise<void>;
  sync: (id: string) => Promise<void>;
  updateSettings: (id: string, settings: any) => Promise<void>;
}
