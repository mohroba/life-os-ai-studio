import { create } from "zustand";
import { openDB, IDBPDatabase } from "idb";
import { Integration, IntegrationState } from "../types/integrations";
import { useAppStore } from "./useStore";

const DB_NAME = "life-os-integrations";
const STORE_NAME = "integrations";

const initialIntegrations: Integration[] = [
  {
    id: "telegram",
    name: "Telegram Bot",
    description: "Log habits, expenses, and journal entries via a Telegram bot.",
    icon: "Send",
    isConnected: false,
    status: "inactive",
    settings: {
      botToken: "",
      chatId: "",
      allowHabits: true,
      allowFinance: true,
      allowJournal: true,
    },
  },
  {
    id: "google",
    name: "Google Sync",
    description: "Sync your calendar and tasks with Google Calendar and Tasks.",
    icon: "Calendar",
    isConnected: false,
    status: "inactive",
    settings: {
      syncCalendar: true,
      syncTasks: true,
      lastSyncToken: "",
    },
  },
];

let dbPromise: Promise<IDBPDatabase>;

const getDB = () => {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, 1, {
      upgrade(db) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      },
    });
  }
  return dbPromise;
};

export const useIntegrationsStore = create<IntegrationState>((set, get) => ({
  integrations: initialIntegrations,
  isLoading: true,
  error: null,

  // Initialize from IndexedDB
  init: async () => {
    try {
      const db = await getDB();
      const storedIntegrations = await db.getAll(STORE_NAME);
      
      if (storedIntegrations.length > 0) {
        // Merge stored with initial to ensure new integrations are added
        const merged = initialIntegrations.map(initial => {
          const stored = storedIntegrations.find(s => s.id === initial.id);
          return stored ? { ...initial, ...stored } : initial;
        });
        set({ integrations: merged, isLoading: false });
      } else {
        // First time, save initial to DB
        for (const integration of initialIntegrations) {
          await db.put(STORE_NAME, integration);
        }
        set({ integrations: initialIntegrations, isLoading: false });
      }
    } catch (err) {
      console.error("Failed to init integrations DB:", err);
      set({ isLoading: false, error: "Failed to load integrations" });
    }
  },

  connect: async (id, credentials) => {
    const isOffline = useAppStore.getState().isOffline;
    
    // Optimistic update
    set((state) => ({
      integrations: state.integrations.map((i) =>
        i.id === id ? { ...i, isConnected: true, status: isOffline ? "pending" : "active", lastSyncedAt: isOffline ? undefined : new Date().toISOString() } : i
      ),
    }));

    // Persist to IndexedDB
    const db = await getDB();
    const integration = get().integrations.find(i => i.id === id);
    if (integration) await db.put(STORE_NAME, integration);

    if (!isOffline) {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  },

  disconnect: async (id) => {
    set((state) => ({
      integrations: state.integrations.map((i) =>
        i.id === id ? { ...i, isConnected: false, status: "inactive" } : i
      ),
    }));

    const db = await getDB();
    const integration = get().integrations.find(i => i.id === id);
    if (integration) await db.put(STORE_NAME, integration);
  },

  sync: async (id) => {
    const isOffline = useAppStore.getState().isOffline;
    if (isOffline) return;

    set((state) => ({
      integrations: state.integrations.map((i) =>
        i.id === id ? { ...i, status: "pending" } : i
      ),
    }));

    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    set((state) => ({
      integrations: state.integrations.map((i) =>
        i.id === id ? { ...i, status: "active", lastSyncedAt: new Date().toISOString() } : i
      ),
    }));

    const db = await getDB();
    const integration = get().integrations.find(i => i.id === id);
    if (integration) await db.put(STORE_NAME, integration);
  },

  updateSettings: async (id, settings) => {
    set((state) => ({
      integrations: state.integrations.map((i) =>
        i.id === id ? { ...i, settings: { ...i.settings, ...settings } } : i
      ),
    }));

    const db = await getDB();
    const integration = get().integrations.find(i => i.id === id);
    if (integration) await db.put(STORE_NAME, integration);
  },
}));

// Auto-init
useIntegrationsStore.getState().init();
