import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Badge, Achievement, UserStats } from "../types/gamification";

interface GamificationState {
  totalXp: number;
  level: number;
  badges: Badge[];
  achievements: Achievement[];
  streakDays: number;
  
  addXp: (amount: number) => void;
  unlockBadge: (badgeId: string) => void;
  updateAchievementProgress: (achievementId: string, progress: number) => void;
  calculateLevel: (xp: number) => number;
  getXpProgress: () => { current: number; target: number; percentage: number };
}

const XP_PER_LEVEL = 500;

const initialBadges: Badge[] = [
  { id: 'h-1', title: 'Habit Starter', description: 'Complete 10 habits', icon: 'Target', category: 'habits', requirement: 10 },
  { id: 'h-2', title: 'Consistency King', description: 'Maintain a 7-day habit streak', icon: 'Flame', category: 'habits', requirement: 7 },
  { id: 'f-1', title: 'Budget Master', description: 'Log 20 transactions', icon: 'Wallet', category: 'finance', requirement: 20 },
  { id: 'j-1', title: 'Soul Searcher', description: 'Write 5 journal entries', icon: 'BookOpen', category: 'journal', requirement: 5 },
  { id: 'g-1', title: 'Level 5', description: 'Reach level 5', icon: 'Trophy', category: 'general', requirement: 5 },
];

const initialAchievements: Achievement[] = [
  { id: 'a-1', title: 'The Architect', description: 'Create 5 different habits', icon: 'Layout', progress: 2, target: 5, isCompleted: false, xpReward: 100 },
  { id: 'a-2', title: 'Wealth Builder', description: 'Save $1000 total', icon: 'TrendingUp', progress: 450, target: 1000, isCompleted: false, xpReward: 250 },
  { id: 'a-3', title: 'Mindful Moment', description: 'Complete a 30-day journaling streak', icon: 'Moon', progress: 3, target: 30, isCompleted: false, xpReward: 500 },
];

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set, get) => ({
      totalXp: 1250,
      level: 3,
      badges: initialBadges,
      achievements: initialAchievements,
      streakDays: 5,

      addXp: (amount) => {
        const newTotalXp = get().totalXp + amount;
        const newLevel = get().calculateLevel(newTotalXp);
        
        // Check for level-up badge
        if (newLevel > get().level) {
          // Logic for level-up notification could go here
        }

        set({ totalXp: newTotalXp, level: newLevel });
      },

      unlockBadge: (badgeId) => {
        set((state) => ({
          badges: state.badges.map((b) =>
            b.id === badgeId ? { ...b, unlockedAt: new Date().toISOString() } : b
          ),
        }));
      },

      updateAchievementProgress: (achievementId, progress) => {
        set((state) => ({
          achievements: state.achievements.map((a) => {
            if (a.id === achievementId) {
              const newProgress = Math.min(progress, a.target);
              const isNewlyCompleted = !a.isCompleted && newProgress >= a.target;
              
              if (isNewlyCompleted) {
                state.addXp(a.xpReward);
              }

              return { ...a, progress: newProgress, isCompleted: isNewlyCompleted };
            }
            return a;
          }),
        }));
      },

      calculateLevel: (xp) => {
        return Math.floor(xp / XP_PER_LEVEL) + 1;
      },

      getXpProgress: () => {
        const { totalXp, level } = get();
        const currentLevelXp = totalXp % XP_PER_LEVEL;
        return {
          current: currentLevelXp,
          target: XP_PER_LEVEL,
          percentage: (currentLevelXp / XP_PER_LEVEL) * 100,
        };
      },
    }),
    {
      name: "life-os-gamification",
    }
  )
);
