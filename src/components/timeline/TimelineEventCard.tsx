import * as React from "react";
import { TimelineEvent } from "@/src/types/timeline";
import { motion, AnimatePresence } from "motion/react";
import { Activity, DollarSign, BookOpen, Brain, ChevronDown } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface TimelineEventCardProps {
  event: TimelineEvent;
  key?: string | number;
}

const EVENT_CONFIG = {
  habit: { icon: Activity, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  expense: { icon: DollarSign, color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20" },
  journal: { icon: BookOpen, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  learning: { icon: Brain, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
};

export function TimelineEventCard({ event }: TimelineEventCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const config = EVENT_CONFIG[event.type];
  const Icon = config.icon;

  const timeString = new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative pl-12 md:pl-16 py-4 group"
    >
      {/* Timeline Node */}
      <div className="absolute left-[11px] md:left-[27px] top-8 w-4 h-4 rounded-full bg-background border-2 border-border z-10 group-hover:border-primary transition-colors" />
      
      {/* Time Label (Desktop) */}
      <div className="hidden md:block absolute left-0 top-7 w-20 text-right pr-6 text-xs font-mono text-muted-foreground">
        {timeString}
      </div>

      <motion.div 
        layout
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "glass-panel rounded-2xl p-4 md:p-5 cursor-pointer transition-all hover:bg-white/5 border",
          config.border
        )}
      >
        <motion.div layout className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className={cn("p-3 rounded-xl shrink-0", config.bg)}>
              <Icon className={cn("w-6 h-6", config.color)} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="md:hidden text-xs font-mono text-muted-foreground">{timeString}</span>
                <h3 className="text-lg font-display font-semibold text-foreground">{event.title}</h3>
              </div>
              
              {/* Quick Metadata Preview */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                {event.type === 'expense' && event.metadata?.amount && (
                  <span className="font-medium text-rose-400">${event.metadata.amount.toFixed(2)}</span>
                )}
                {event.type === 'habit' && event.metadata?.streak && (
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Activity size={14} /> {event.metadata.streak} day streak
                  </span>
                )}
                {event.type === 'learning' && event.metadata?.duration && (
                  <span className="flex items-center gap-1 text-purple-400">
                    <Brain size={14} /> {event.metadata.duration} mins
                  </span>
                )}
              </div>
            </div>
          </div>

          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="p-2 rounded-full hover:bg-white/10 text-muted-foreground shrink-0"
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-border/50 text-foreground/90 leading-relaxed">
                {event.description ? (
                  <p>{event.description}</p>
                ) : (
                  <p className="text-muted-foreground italic">No additional details provided.</p>
                )}
                
                {event.metadata?.tags && event.metadata.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {event.metadata.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 rounded-md bg-secondary text-xs font-medium text-muted-foreground border border-border">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
