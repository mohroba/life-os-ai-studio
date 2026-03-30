import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

interface WeeklyCalendarProps {
  selectedDate: string; // YYYY-MM-DD
  onSelectDate: (date: string) => void;
}

export function WeeklyCalendar({ selectedDate, onSelectDate }: WeeklyCalendarProps) {
  // Generate the last 7 days including today
  const days = React.useMemo(() => {
    const result = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      result.push({
        date: d.toISOString().split('T')[0],
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: d.getDate(),
        isToday: i === 0
      });
    }
    return result;
  }, []);

  return (
    <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {days.map((day) => {
        const isSelected = day.date === selectedDate;
        
        return (
          <button
            key={day.date}
            onClick={() => onSelectDate(day.date)}
            className={cn(
              "relative flex flex-col items-center justify-center min-w-[3rem] h-16 rounded-2xl transition-all duration-300",
              isSelected ? "text-primary-foreground" : "glass hover:bg-white/10 text-muted-foreground"
            )}
          >
            {isSelected && (
              <motion.div
                layoutId="active-day"
                className="absolute inset-0 bg-primary rounded-2xl -z-10 shadow-lg shadow-primary/20"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            
            <span className={cn("text-xs font-medium mb-1", isSelected ? "text-primary-foreground/80" : "")}>
              {day.dayName}
            </span>
            <span className={cn("text-lg font-display font-bold", isSelected ? "text-primary-foreground" : "text-foreground")}>
              {day.dayNumber}
            </span>
            
            {day.isToday && !isSelected && (
              <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary" />
            )}
          </button>
        );
      })}
    </div>
  );
}
