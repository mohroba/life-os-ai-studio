import * as React from "react";
import { PageWrapper } from "@/src/components/layout/PageWrapper";
import { HabitCard } from "@/src/components/habits/HabitCard";
import { CreateHabitModal } from "@/src/components/habits/CreateHabitModal";
import { EditHabitModal } from "@/src/components/habits/EditHabitModal";
import { WeeklyCalendar } from "@/src/components/habits/WeeklyCalendar";
import { useHabitStore } from "@/src/store/useHabitStore";
import { Habit } from "@/src/types/habit";
import { motion, AnimatePresence } from "motion/react";
import { Target, Trophy, Plus } from "lucide-react";
import { Button } from "@/src/components/ui/Button";

export function Habits() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingHabit, setEditingHabit] = React.useState<Habit | null>(null);
  const [selectedDate, setSelectedDate] = React.useState(() => new Date().toISOString().split('T')[0]);
  const { habits, toggleHabitCompletion } = useHabitStore();
  
  // Calculate daily progress
  const completedCount = habits.filter(h => h.completedDates.includes(selectedDate)).length;
  const totalCount = habits.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <PageWrapper className="space-y-8 max-w-4xl mx-auto pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold text-gradient">Habits</h1>
          <p className="text-muted-foreground mt-2 text-lg">Build consistency, one day at a time.</p>
        </div>
      </div>

      {/* Weekly Calendar */}
      <WeeklyCalendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />

      {/* Daily Progress Widget */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 rounded-2xl relative overflow-hidden"
      >
        <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center shadow-lg shadow-primary/20">
              <Trophy className="text-background w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold">Daily Progress</h2>
              <p className="text-muted-foreground text-sm mt-1">
                {completedCount} of {totalCount} habits completed today
              </p>
            </div>
          </div>

          <div className="flex-1 w-full md:max-w-md space-y-3">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-primary">{Math.round(progress)}%</span>
              <span className="text-muted-foreground">100%</span>
            </div>
            
            <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-orange-400 rounded-full relative"
              >
                <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)', transform: 'skewX(-20deg)' }} />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Habits List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-semibold flex items-center gap-2">
            <Target className="text-primary" size={24} />
            {selectedDate === new Date().toISOString().split('T')[0] ? "Today's Routine" : "Routine"}
          </h2>
          <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(true)} className="gap-2">
            <Plus size={16} /> Add Habit
          </Button>
        </div>

        <AnimatePresence mode="popLayout">
          {habits.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 text-center text-muted-foreground glass rounded-2xl border-dashed"
            >
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <p className="text-lg font-medium text-foreground">No habits yet.</p>
              <p className="text-sm mt-1">Click the + button to create your first habit.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {habits.map((habit, i) => (
                <motion.div
                  key={habit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <HabitCard 
                    habit={habit} 
                    date={selectedDate} 
                    onToggle={toggleHabitCompletion} 
                    onEdit={setEditingHabit}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      <CreateHabitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <EditHabitModal habit={editingHabit} isOpen={!!editingHabit} onClose={() => setEditingHabit(null)} />
    </PageWrapper>
  );
}
