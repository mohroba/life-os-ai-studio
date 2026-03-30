import * as React from "react";
import { PageWrapper } from "@/src/components/layout/PageWrapper";
import { TimelineFilter } from "@/src/components/timeline/TimelineFilter";
import { TimelineEventCard } from "@/src/components/timeline/TimelineEventCard";
import { MOCK_TIMELINE_EVENTS } from "@/src/data/mockTimeline";
import { EventType, TimelineEvent } from "@/src/types/timeline";
import { motion, AnimatePresence } from "motion/react";

export function Timeline() {
  const [activeFilter, setActiveFilter] = React.useState<EventType | 'all'>('all');

  // Filter events based on active filter
  const filteredEvents = React.useMemo(() => {
    if (activeFilter === 'all') return MOCK_TIMELINE_EVENTS;
    return MOCK_TIMELINE_EVENTS.filter(event => event.type === activeFilter);
  }, [activeFilter]);

  // Group events by date string
  const groupedEvents = React.useMemo(() => {
    const groups: Record<string, TimelineEvent[]> = {};
    
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const todayStr = today.toDateString();
    const yesterdayStr = yesterday.toDateString();

    filteredEvents.forEach(event => {
      const eventDate = new Date(event.timestamp);
      const eventDateStr = eventDate.toDateString();
      
      let groupKey = eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      if (eventDateStr === todayStr) groupKey = "Today";
      else if (eventDateStr === yesterdayStr) groupKey = "Yesterday";

      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(event);
    });

    return groups;
  }, [filteredEvents]);

  return (
    <PageWrapper className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-display font-bold text-gradient">Timeline</h1>
          <p className="text-muted-foreground mt-2 text-lg">Your life, chronologically.</p>
        </div>
      </div>
      
      <TimelineFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <div className="relative">
        {/* Main Vertical Line */}
        <div className="absolute left-[18px] md:left-[34px] top-0 bottom-0 w-0.5 bg-border/50 z-0" />

        <div className="space-y-12">
          <AnimatePresence mode="popLayout">
            {Object.entries(groupedEvents).map(([dateLabel, events]) => (
              <motion.div 
                key={dateLabel}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                {/* Date Group Header */}
                <div className="sticky top-20 z-20 flex items-center gap-4 py-2 bg-background/80 backdrop-blur-md mb-4 ml-12 md:ml-16 rounded-lg">
                  <h2 className="text-xl font-display font-semibold text-foreground">{dateLabel}</h2>
                  <div className="h-px flex-1 bg-border/50" />
                </div>

                <div className="space-y-2">
                  <AnimatePresence mode="popLayout">
                    {(events as TimelineEvent[]).map((event) => (
                      <TimelineEventCard key={event.id} event={event} />
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredEvents.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center text-muted-foreground ml-12 md:ml-16"
            >
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌀</span>
              </div>
              <p className="text-lg">No events found for this filter.</p>
            </motion.div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
