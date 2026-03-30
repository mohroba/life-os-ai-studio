import * as React from "react";
import { Modal } from "@/src/components/ui/Modal";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { useJournalStore } from "@/src/store/useJournalStore";
import { Mood } from "@/src/types/journal";
import { Smile, Frown, Meh, Heart, AlertCircle } from "lucide-react";

const MOODS: { value: Mood; icon: React.ElementType; color: string }[] = [
  { value: 'awesome', icon: Heart, color: 'text-rose-500' },
  { value: 'good', icon: Smile, color: 'text-emerald-500' },
  { value: 'neutral', icon: Meh, color: 'text-blue-500' },
  { value: 'bad', icon: Frown, color: 'text-orange-500' },
  { value: 'awful', icon: AlertCircle, color: 'text-red-500' },
];

interface QuickAddJournalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickAddJournalModal({ isOpen, onClose }: QuickAddJournalModalProps) {
  const addEntry = useJournalStore((state) => state.addEntry);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [mood, setMood] = React.useState<Mood>('good');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addEntry({
      title,
      content: `<p>${content}</p>`,
      mood,
      tags: ['quick-note']
    });

    setTitle("");
    setContent("");
    setMood('good');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Quick Journal Entry">
      <form onSubmit={handleSubmit} className="space-y-6 py-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input 
            placeholder="What's on your mind?" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Content</label>
          <textarea 
            placeholder="Write your thoughts here..." 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-32 px-3 py-2 rounded-md bg-background border border-input text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">How are you feeling?</label>
          <div className="flex gap-4">
            {MOODS.map(({ value, icon: Icon, color }) => (
              <button
                key={value}
                type="button"
                onClick={() => setMood(value)}
                className={`p-3 rounded-full transition-all ${
                  mood === value 
                    ? 'bg-primary/20 scale-110 ring-2 ring-primary ring-offset-2 ring-offset-background' 
                    : 'bg-secondary hover:bg-secondary/80 opacity-70 hover:opacity-100'
                }`}
              >
                <Icon size={24} className={color} />
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={!title.trim() || !content.trim()}>Save Entry</Button>
        </div>
      </form>
    </Modal>
  );
}
