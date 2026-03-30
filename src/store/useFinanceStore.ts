import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Transaction, Category } from '../types/finance';
import { useGamificationStore } from './useGamificationStore';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'food', name: 'Food & Dining', color: '#f97316', icon: 'Utensils', type: 'expense' },
  { id: 'transport', name: 'Transportation', color: '#3b82f6', icon: 'Car', type: 'expense' },
  { id: 'shopping', name: 'Shopping', color: '#ec4899', icon: 'ShoppingBag', type: 'expense' },
  { id: 'entertainment', name: 'Entertainment', color: '#8b5cf6', icon: 'Film', type: 'expense' },
  { id: 'bills', name: 'Bills & Utilities', color: '#ef4444', icon: 'Zap', type: 'expense' },
  { id: 'salary', name: 'Salary', color: '#10b981', icon: 'Briefcase', type: 'income' },
  { id: 'freelance', name: 'Freelance', color: '#14b8a6', icon: 'Laptop', type: 'income' },
];

interface FinanceState {
  transactions: Transaction[];
  categories: Category[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      transactions: [
        {
          id: '1',
          amount: 45,
          categoryId: 'food',
          date: new Date().toISOString(),
          note: 'Lunch at cafe',
          type: 'expense',
        },
        {
          id: '2',
          amount: 3200,
          categoryId: 'salary',
          date: new Date(Date.now() - 2 * 86400000).toISOString(),
          note: 'Monthly Salary',
          type: 'income',
        },
        {
          id: '3',
          amount: 120,
          categoryId: 'shopping',
          date: new Date(Date.now() - 1 * 86400000).toISOString(),
          note: 'Groceries',
          type: 'expense',
        }
      ],
      categories: DEFAULT_CATEGORIES,
      addTransaction: (transaction) => set((state) => {
        const newTransaction = { ...transaction, id: Math.random().toString(36).substring(2, 9) };
        
        // Award XP
        useGamificationStore.getState().addXp(10);

        return {
          transactions: [newTransaction, ...state.transactions]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        };
      }),
      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id),
      })),
      addCategory: (category) => set((state) => ({
        categories: [
          ...state.categories,
          { ...category, id: Math.random().toString(36).substring(2, 9) },
        ],
      })),
    }),
    {
      name: 'finance-storage',
    }
  )
);
