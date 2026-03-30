import * as React from "react";
import { PageWrapper } from "@/src/components/layout/PageWrapper";
import { JournalList } from "@/src/components/journal/JournalList";
import { JournalEditor } from "@/src/components/journal/JournalEditor";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/src/components/ui/Button";
import { Plus } from "lucide-react";

export function Journal() {
  const [view, setView] = React.useState<'list' | 'editor'>('list');
  const [editingId, setEditingId] = React.useState<string | null>(null);

  const handleCreateNew = () => {
    setEditingId(null);
    setView('editor');
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setView('editor');
  };

  const handleCloseEditor = () => {
    setView('list');
    setEditingId(null);
  };

  return (
    <PageWrapper>
      <AnimatePresence mode="wait">
        {view === 'list' ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full relative"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-display font-bold text-gradient">Journal</h1>
                <p className="text-muted-foreground mt-1">Capture your thoughts and track your mood.</p>
              </div>
              <Button onClick={handleCreateNew} className="gap-2">
                <Plus size={16} /> New Entry
              </Button>
            </div>

            <div className="max-w-3xl mx-auto pb-20">
              <JournalList onEdit={handleEdit} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="editor"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <JournalEditor entryId={editingId} onClose={handleCloseEditor} />
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
