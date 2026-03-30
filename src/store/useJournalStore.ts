import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { JournalEntry } from '../types/journal';
import { useGamificationStore } from './useGamificationStore';

interface JournalState {
  entries: JournalEntry[];
  addEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateEntry: (id: string, entry: Partial<Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteEntry: (id: string) => void;
}

export const useJournalStore = create<JournalState>()(
  persist(
    (set) => ({
      entries: [
        {
          id: '1',
          title: 'A productive day',
          content: '<p>Today was incredibly productive. I managed to finish all my tasks and even had some time to read a book.</p>',
          mood: 'awesome',
          tags: ['productivity', 'reading'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ],
      addEntry: (entry) => set((state) => {
        const newEntry = {
          ...entry,
          id: Math.random().toString(36).substring(2, 9),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        // Award XP
        useGamificationStore.getState().addXp(50);

        return {
          entries: [newEntry, ...state.entries],
        };
      }),
      updateEntry: (id, updatedFields) => set((state) => ({
        entries: state.entries.map((e) =>
          e.id === id ? { ...e, ...updatedFields, updatedAt: new Date().toISOString() } : e
        ),
      })),
      deleteEntry: (id) => set((state) => ({
        entries: state.entries.filter((e) => e.id !== id),
      })),
    }),
    {
      name: 'journal-storage',
    }
  )
);
