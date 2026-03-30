import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Habit } from '../types/habit';
import { useGamificationStore } from './useGamificationStore';

interface HabitState {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'completedDates' | 'currentStreak' | 'longestStreak'>) => void;
  updateHabit: (id: string, updates: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  toggleHabitCompletion: (id: string, date: string) => void;
}

const MOCK_HABITS: Habit[] = [
  {
    id: '1',
    title: 'Morning Meditation',
    description: '15 minutes of mindfulness',
    color: 'bg-emerald-500',
    icon: 'Brain',
    createdAt: new Date().toISOString(),
    completedDates: [],
    currentStreak: 12,
    longestStreak: 21,
    xpReward: 50,
  },
  {
    id: '2',
    title: 'Drink 2L Water',
    color: 'bg-blue-500',
    icon: 'Droplet',
    createdAt: new Date().toISOString(),
    completedDates: [],
    currentStreak: 5,
    longestStreak: 14,
    xpReward: 20,
  },
  {
    id: '3',
    title: 'Read 20 Pages',
    color: 'bg-purple-500',
    icon: 'BookOpen',
    createdAt: new Date().toISOString(),
    completedDates: [],
    currentStreak: 0,
    longestStreak: 45,
    xpReward: 40,
  }
];

export const useHabitStore = create<HabitState>()(
  persist(
    (set) => ({
      habits: MOCK_HABITS,
      addHabit: (habitData) => set((state) => {
        const newHabit: Habit = {
          ...habitData,
          id: Math.random().toString(36).substring(2, 9),
          createdAt: new Date().toISOString(),
          completedDates: [],
          currentStreak: 0,
          longestStreak: 0,
        };
        return { habits: [...state.habits, newHabit] };
      }),
      updateHabit: (id, updates) => set((state) => ({
        habits: state.habits.map(h => h.id === id ? { ...h, ...updates } : h)
      })),
      deleteHabit: (id) => set((state) => ({
        habits: state.habits.filter(h => h.id !== id)
      })),
      toggleHabitCompletion: (id, date) => set((state) => {
        return {
          habits: state.habits.map(habit => {
            if (habit.id !== id) return habit;
            
            const isCompleted = habit.completedDates.includes(date);
            let newCompletedDates;
            let newStreak = habit.currentStreak;
            
            if (isCompleted) {
              newCompletedDates = habit.completedDates.filter(d => d !== date);
              newStreak = Math.max(0, newStreak - 1);
            } else {
              newCompletedDates = [...habit.completedDates, date];
              newStreak += 1;
              // Award XP
              useGamificationStore.getState().addXp(habit.xpReward);
            }
            
            return {
              ...habit,
              completedDates: newCompletedDates,
              currentStreak: newStreak,
              longestStreak: Math.max(habit.longestStreak, newStreak)
            };
          })
        };
      }),
    }),
    {
      name: 'life-os-habits',
    }
  )
);
