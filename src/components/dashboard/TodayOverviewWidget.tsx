import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card";
import { CheckCircle2, Circle, DollarSign, ListTodo, Activity } from "lucide-react";
import { motion } from "motion/react";
import { useHabitStore } from "@/src/store/useHabitStore";

export function TodayOverviewWidget() {
  const { habits, toggleHabitCompletion } = useHabitStore();
  const today = new Date().toISOString().split('T')[0];

  const tasks = [
    { id: 1, name: "Review Q3 Report", priority: "high" },
    { id: 2, name: "Email John", priority: "medium" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card variant="glass" className="h-[320px] flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="text-primary w-5 h-5" />
            Habits
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-3">
          {habits.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center mt-4">No habits yet.</p>
          ) : (
            habits.map((habit, i) => {
              const isCompleted = habit.completedDates.includes(today);
              return (
                <motion.div 
                  key={habit.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => toggleHabitCompletion(habit.id, today)}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground" />
                  )}
                  <span className={isCompleted ? "line-through text-muted-foreground" : "text-foreground"}>
                    {habit.title}
                  </span>
                </motion.div>
              );
            })
          )}
        </CardContent>
      </Card>

      <Card variant="glass" className="h-[320px] flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <ListTodo className="text-primary w-5 h-5" />
            Tasks
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-3">
          {tasks.map((task, i) => (
            <motion.div 
              key={task.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 0.2 }}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border-l-2 border-l-primary"
            >
              <span className="text-foreground">{task.name}</span>
              <div className="w-2 h-2 rounded-full bg-primary" />
            </motion.div>
          ))}
        </CardContent>
      </Card>

      <Card variant="glass" className="h-[320px] flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="text-primary w-5 h-5" />
            Finance
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-center items-center">
          <div className="relative w-32 h-32 rounded-full border-8 border-white/5 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-8 border-primary border-t-transparent border-r-transparent rotate-45" />
            <div className="text-center">
              <div className="text-2xl font-display font-bold">$45</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Spent</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-6 text-center">
            $55 remaining of today's budget
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
