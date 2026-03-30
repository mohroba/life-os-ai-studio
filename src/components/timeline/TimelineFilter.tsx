import { EventType } from "@/src/types/timeline";
import { Button } from "@/src/components/ui/Button";
import { motion } from "motion/react";
import { Activity, DollarSign, BookOpen, Brain, List } from "lucide-react";

interface TimelineFilterProps {
  activeFilter: EventType | 'all';
  onFilterChange: (filter: EventType | 'all') => void;
}

export function TimelineFilter({ activeFilter, onFilterChange }: TimelineFilterProps) {
  const filters: { id: EventType | 'all'; label: string; icon: any }[] = [
    { id: 'all', label: 'All', icon: List },
    { id: 'habit', label: 'Habits', icon: Activity },
    { id: 'expense', label: 'Expenses', icon: DollarSign },
    { id: 'journal', label: 'Journal', icon: BookOpen },
    { id: 'learning', label: 'Learning', icon: Brain },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id;
        return (
          <Button
            key={filter.id}
            variant={isActive ? "default" : "glass"}
            size="sm"
            onClick={() => onFilterChange(filter.id)}
            className={`relative overflow-hidden transition-all duration-300 ${isActive ? 'shadow-md shadow-primary/20' : ''}`}
          >
            {isActive && (
              <motion.div
                layoutId="active-filter"
                className="absolute inset-0 bg-primary/10"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <filter.icon size={16} className="mr-2 relative z-10" />
            <span className="relative z-10">{filter.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
