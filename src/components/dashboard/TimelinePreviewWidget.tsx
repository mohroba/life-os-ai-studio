import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card";
import { Clock } from "lucide-react";
import { motion } from "motion/react";
import { MOCK_TIMELINE_EVENTS } from "@/src/data/mockTimeline";

export function TimelinePreviewWidget() {
  const events = MOCK_TIMELINE_EVENTS.slice(0, 4);

  return (
    <Card variant="glass" className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="text-primary w-5 h-5" />
          Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative border-l border-border/50 ml-3 space-y-6">
          {events.map((event, i) => {
            const timeString = new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-6"
              >
                <div className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-primary ring-4 ring-background" />
                <div className="text-xs font-mono text-muted-foreground mb-1">{timeString}</div>
                <div className="text-sm font-medium text-foreground">{event.title}</div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
