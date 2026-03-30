import { motion } from "motion/react";
import { useGamificationStore } from "@/src/store/useGamificationStore";
import { Trophy, Star } from "lucide-react";

export function LevelProgress() {
  const { level, totalXp, getXpProgress } = useGamificationStore();
  const { current, target, percentage } = getXpProgress();

  return (
    <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30 shadow-lg shadow-primary/10">
            <span className="text-3xl font-display font-bold text-primary">{level}</span>
          </div>
          <div>
            <h3 className="text-xl font-display font-bold">Level {level}</h3>
            <p className="text-sm text-muted-foreground">Total XP: {totalXp.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1 text-primary mb-1">
            <Trophy size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">Master</span>
          </div>
          <p className="text-xs text-muted-foreground">Next level in {target - current} XP</p>
        </div>
      </div>

      <div className="space-y-2 relative z-10">
        <div className="flex justify-between text-xs font-medium px-1">
          <span>XP Progress</span>
          <span>{current} / {target}</span>
        </div>
        <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-primary to-primary/60 relative"
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[shimmer_2s_linear_infinite]" />
          </motion.div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 relative z-10">
        <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white/5 border border-white/5">
          <Star size={16} className="text-yellow-500" />
          <span className="text-xs font-bold">Daily Streak</span>
          <span className="text-sm font-display">5 Days</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white/5 border border-white/5">
          <Trophy size={16} className="text-primary" />
          <span className="text-xs font-bold">Badges</span>
          <span className="text-sm font-display">12 Earned</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white/5 border border-white/5">
          <Star size={16} className="text-emerald-500" />
          <span className="text-xs font-bold">Rank</span>
          <span className="text-sm font-display">Top 5%</span>
        </div>
      </div>
    </div>
  );
}
