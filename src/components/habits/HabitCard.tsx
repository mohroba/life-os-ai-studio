import * as React from "react";
import { Habit } from "@/src/types/habit";
import { motion, AnimatePresence } from "motion/react";
import { Check, Flame, Brain, Droplet, BookOpen, Target, Activity, Dumbbell, MoreVertical } from "lucide-react";
import { cn } from "@/src/lib/utils";

const ICONS: Record<string, any> = {
  Brain, Droplet, BookOpen, Target, Activity, Dumbbell
};

interface HabitCardProps {
  habit: Habit;
  date: string; // YYYY-MM-DD
  onToggle: (id: string, date: string) => void;
  onEdit?: (habit: Habit) => void;
}

export function HabitCard({ habit, date, onToggle, onEdit }: HabitCardProps) {
  const isCompleted = habit.completedDates.includes(date);
  const Icon = ICONS[habit.icon] || Target;
  
  // Extract color class name for dynamic styling
  const colorClass = habit.color.replace('bg-', 'text-');
  const ringColorClass = habit.color.replace('bg-', 'stroke-');

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onToggle(habit.id, date)}
      className={cn(
        "relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300",
        isCompleted ? "glass-panel border-primary/20" : "glass hover:bg-white/5"
      )}
    >
      {/* Completion Background Fill Animation */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={cn("absolute inset-0 rounded-2xl origin-left", habit.color)}
          />
        )}
      </AnimatePresence>

      <div className="p-5 flex items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-4">
          {/* Progress Ring / Checkmark */}
          <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18" cy="18" r="16"
                fill="none"
                className="stroke-border/50"
                strokeWidth="3"
              />
              <motion.circle
                cx="18" cy="18" r="16"
                fill="none"
                className={cn("transition-colors duration-300", isCompleted ? ringColorClass : "stroke-transparent")}
                strokeWidth="3"
                strokeDasharray="100"
                initial={{ strokeDashoffset: 100 }}
                animate={{ strokeDashoffset: isCompleted ? 0 : 100 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </svg>
            
            <AnimatePresence mode="wait">
              {isCompleted ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className={cn("rounded-full p-1", habit.color, "text-white")}
                >
                  <Check size={16} strokeWidth={3} />
                </motion.div>
              ) : (
                <motion.div
                  key="icon"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className={cn("p-2 rounded-full bg-white/5", colorClass)}
                >
                  <Icon size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div>
            <h3 className={cn("font-display font-semibold text-lg transition-colors", isCompleted ? "text-foreground" : "text-foreground/80")}>
              {habit.title}
            </h3>
            {habit.description && (
              <p className="text-sm text-muted-foreground line-clamp-1">{habit.description}</p>
            )}
          </div>
        </div>

        {/* Streak Indicator & Edit */}
        <div className="flex flex-col items-end shrink-0 gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20">
              <Flame size={14} className={cn("text-orange-500", habit.currentStreak > 0 && "animate-pulse")} />
              <span className="text-sm font-bold text-orange-500">{habit.currentStreak}</span>
            </div>
            {onEdit && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(habit);
                }}
                className="p-1.5 rounded-full hover:bg-white/10 text-muted-foreground transition-colors"
              >
                <MoreVertical size={16} />
              </button>
            )}
          </div>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold pr-1">
            +{habit.xpReward} XP
          </span>
        </div>
      </div>
    </motion.div>
  );
}
