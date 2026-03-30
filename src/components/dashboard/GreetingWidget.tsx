import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export function GreetingWidget() {
  const hour = new Date().getHours();
  let greeting = "Good evening";
  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row md:items-end justify-between gap-4"
    >
      <div>
        <h1 className="text-4xl font-display font-bold text-gradient">{greeting}, Alex.</h1>
        <p className="text-muted-foreground mt-1 text-lg">Ready to level up today?</p>
      </div>
      
      <div className="glass px-4 py-3 rounded-2xl flex items-center gap-3 border-primary/20 max-w-md">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
          <Sparkles className="text-primary w-4 h-4" />
        </div>
        <p className="text-sm text-foreground/90">
          <span className="font-semibold text-primary">AI Hint:</span> You usually read at this time. Want to start a 20-minute focus timer?
        </p>
      </div>
    </motion.div>
  );
}
