import { Card, CardContent } from "@/src/components/ui/Card";
import { motion } from "motion/react";
import { Flame, Trophy, Star } from "lucide-react";

export function LifeScoreWidget() {
  const currentXP = 8450;
  const nextLevelXP = 10000;
  const progress = (currentXP / nextLevelXP) * 100;

  return (
    <Card variant="glass-panel" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center shadow-lg shadow-primary/20 rotate-3">
                <span className="text-3xl font-display font-bold text-background">24</span>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-1 shadow-sm">
                <div className="bg-secondary text-xs font-bold px-2 py-0.5 rounded-full border border-border">
                  Lvl
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-display font-bold flex items-center gap-2">
                Life Hacker
                <Trophy className="w-5 h-5 text-yellow-500" />
              </h2>
              <p className="text-muted-foreground text-sm mt-1">Top 5% of users this week</p>
            </div>
          </div>

          <div className="flex-1 w-full md:max-w-md space-y-3">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-primary flex items-center gap-1">
                <Star className="w-4 h-4" /> {currentXP.toLocaleString()} XP
              </span>
              <span className="text-muted-foreground">{nextLevelXP.toLocaleString()} XP</span>
            </div>
            
            <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-orange-400 rounded-full relative"
              >
                <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)', transform: 'skewX(-20deg)' }} />
              </motion.div>
            </div>
          </div>

          <div className="flex items-center gap-3 glass px-4 py-3 rounded-xl border-orange-500/30 bg-orange-500/5">
            <Flame className="w-6 h-6 text-orange-500" />
            <div>
              <div className="text-xl font-display font-bold text-orange-500">14 Days</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Streak</div>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
