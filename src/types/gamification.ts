export type BadgeCategory = 'habits' | 'finance' | 'journal' | 'general';

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: BadgeCategory;
  unlockedAt?: string;
  requirement: number; // e.g., 10 habits completed
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  target: number;
  isCompleted: boolean;
  xpReward: number;
}

export interface UserStats {
  totalXp: number;
  level: number;
  currentLevelXp: number;
  nextLevelXp: number;
  streakDays: number;
}
