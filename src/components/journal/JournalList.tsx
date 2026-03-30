import * as React from "react";
import { useJournalStore } from "@/src/store/useJournalStore";
import { Card, CardContent } from "@/src/components/ui/Card";
import { Frown, CloudRain, Meh, Sun, Sparkles, Trash2, Edit3 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const MOOD_ICONS: Record<string, any> = {
  awful: { icon: Frown, color: 'text-rose-500' },
  bad: { icon: CloudRain, color: 'text-orange-500' },
  neutral: { icon: Meh, color: 'text-yellow-500' },
  good: { icon: Sun, color: 'text-emerald-500' },
  awesome: { icon: Sparkles, color: 'text-blue-500' },
};

interface JournalListProps {
  onEdit: (id: string) => void;
}

export function JournalList({ onEdit }: JournalListProps) {
  const { entries, deleteEntry } = useJournalStore();

  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <div className="space-y-4">
      {entries.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg mb-2">No journal entries yet.</p>
          <p className="text-sm">Start writing to capture your thoughts and moods.</p>
        </div>
      ) : (
        <AnimatePresence initial={false}>
          {entries.map((entry) => {
            const moodData = MOOD_ICONS[entry.mood] || MOOD_ICONS.neutral;
            const MoodIcon = moodData.icon;

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Card variant="glass" className="group hover:bg-white/5 transition-colors cursor-pointer" onClick={() => onEdit(entry.id)}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-display font-semibold truncate mb-1">
                          {entry.title}
                        </h3>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          {new Date(entry.createdAt).toLocaleDateString(undefined, { 
                            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                          })}
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MoodIcon size={14} className={moodData.color} />
                            <span className="capitalize">{entry.mood}</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => { e.stopPropagation(); onEdit(entry.id); }}
                          className="p-2 rounded-md hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); deleteEntry(entry.id); }}
                          className="p-2 rounded-md hover:bg-rose-500/20 text-muted-foreground hover:text-rose-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    <p className="text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                      {stripHtml(entry.content)}
                    </p>

                    {entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {entry.tags.map(tag => (
                          <span key={tag} className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      )}
    </div>
  );
}
