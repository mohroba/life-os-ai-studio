import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatMessage } from '../types/chat';

interface ChatState {
  messages: ChatMessage[];
  addMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [
        {
          id: 'welcome',
          role: 'model',
          content: 'Hello! I am your Life OS AI Assistant. I can help you log transactions, create habits, write journal entries, or analyze your data. What would you like to do today?',
          timestamp: new Date().toISOString()
        }
      ],
      addMessage: (msg) => set((state) => ({
        messages: [...state.messages, { ...msg, id: Math.random().toString(36).substring(2, 9), timestamp: new Date().toISOString() }]
      })),
      clearHistory: () => set({ messages: [] })
    }),
    {
      name: 'life-os-chat',
    }
  )
);
