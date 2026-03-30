import { motion } from "motion/react";
import { useGamificationStore } from "@/src/store/useGamificationStore";
import { Layout, TrendingUp, Moon, Trophy, CheckCircle2 } from "lucide-react";

const ICON_MAP: Record<string, any> = {
  Layout,
  TrendingUp,
  Moon,
  Trophy,
};

export function AchievementsList() {
  const { achievements } = useGamificationStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-display font-bold">Achievements</h3>
        <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
          {achievements.filter(a => a.isCompleted).length} / {achievements.length} Completed
        </span>
      </div>

      <div className="space-y-4">
        {achievements.map((achievement, i) => {
          const Icon = ICON_MAP[achievement.icon] || Trophy;
          const percentage = (achievement.progress / achievement.target) * 100;

          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 rounded-2xl glass-panel relative overflow-hidden group transition-all duration-300 ${
                achievement.isCompleted ? 'border-primary/30 bg-primary/5' : 'border-white/5 bg-white/5'
              }`}
            >
              <div className="flex items-start gap-5 relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 duration-300 ${
                  achievement.isCompleted ? 'bg-primary text-primary-foreground shadow-primary/20' : 'bg-white/10 text-muted-foreground'
                }`}>
                  {achievement.isCompleted ? <CheckCircle2 size={32} /> : <Icon size={32} />}
                </div>
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-display font-bold">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-primary">+{achievement.xpReward} XP</span>
                      <p className="text-xs text-muted-foreground mt-1">
                        {achievement.progress} / {achievement.target}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full rounded-full ${
                          achievement.isCompleted ? 'bg-primary' : 'bg-primary/40'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {achievement.isCompleted && (
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
