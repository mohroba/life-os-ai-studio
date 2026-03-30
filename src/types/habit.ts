export interface Habit {
  id: string;
  title: string;
  description?: string;
  color: string;
  icon: string;
  createdAt: string;
  completedDates: string[]; // Array of YYYY-MM-DD strings
  currentStreak: number;
  longestStreak: number;
  xpReward: number;
}
