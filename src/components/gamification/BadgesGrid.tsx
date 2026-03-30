import { motion } from "motion/react";
import { useGamificationStore } from "@/src/store/useGamificationStore";
import { Target, Flame, Wallet, BookOpen, Trophy, Lock } from "lucide-react";

const ICON_MAP: Record<string, any> = {
  Target,
  Flame,
  Wallet,
  BookOpen,
  Trophy,
};

export function BadgesGrid() {
  const { badges } = useGamificationStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-display font-bold">Badges</h3>
        <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
          {badges.filter(b => b.unlockedAt).length} / {badges.length} Unlocked
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {badges.map((badge, i) => {
          const Icon = ICON_MAP[badge.icon] || Trophy;
          const isUnlocked = !!badge.unlockedAt;

          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5 }}
              className={`relative flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 ${
                isUnlocked 
                  ? 'glass bg-primary/5 border-primary/20 shadow-lg shadow-primary/5' 
                  : 'bg-white/5 border-white/10 grayscale opacity-60'
              }`}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${
                isUnlocked ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-white/10 text-muted-foreground'
              }`}>
                {isUnlocked ? <Icon size={28} /> : <Lock size={24} />}
              </div>
              <span className="text-sm font-bold text-center leading-tight mb-1">{badge.title}</span>
              <span className="text-[10px] text-muted-foreground text-center line-clamp-2">{badge.description}</span>
              
              {isUnlocked && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary animate-pulse" />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
