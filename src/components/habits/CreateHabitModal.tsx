import * as React from "react";
import { Modal } from "@/src/components/ui/Modal";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { useHabitStore } from "@/src/store/useHabitStore";
import { Brain, Droplet, BookOpen, Target, Activity, Dumbbell } from "lucide-react";

const ICONS = [
  { name: 'Target', icon: Target },
  { name: 'Brain', icon: Brain },
  { name: 'Droplet', icon: Droplet },
  { name: 'BookOpen', icon: BookOpen },
  { name: 'Activity', icon: Activity },
  { name: 'Dumbbell', icon: Dumbbell },
];

const COLORS = [
  'bg-emerald-500', 'bg-blue-500', 'bg-purple-500', 
  'bg-rose-500', 'bg-orange-500', 'bg-cyan-500'
];

interface CreateHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateHabitModal({ isOpen, onClose }: CreateHabitModalProps) {
  const addHabit = useHabitStore((state) => state.addHabit);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [selectedIcon, setSelectedIcon] = React.useState("Target");
  const [selectedColor, setSelectedColor] = React.useState(COLORS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addHabit({
      title,
      description,
      icon: selectedIcon,
      color: selectedColor,
      xpReward: 20, // Default XP
    });

    // Reset and close
    setTitle("");
    setDescription("");
    setSelectedIcon("Target");
    setSelectedColor(COLORS[0]);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Habit">
      <form onSubmit={handleSubmit} className="space-y-6 py-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Habit Name</label>
          <Input 
            placeholder="e.g., Morning Run" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description (Optional)</label>
          <Input 
            placeholder="e.g., 30 minutes around the park" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">Icon</label>
          <div className="flex flex-wrap gap-3">
            {ICONS.map(({ name, icon: Icon }) => (
              <button
                key={name}
                type="button"
                onClick={() => setSelectedIcon(name)}
                className={`p-3 rounded-xl transition-all ${
                  selectedIcon === name 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'glass hover:bg-white/10 text-muted-foreground'
                }`}
              >
                <Icon size={20} />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">Color Theme</label>
          <div className="flex flex-wrap gap-3">
            {COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full transition-all ${color} ${
                  selectedColor === color ? 'ring-2 ring-offset-2 ring-offset-background ring-primary scale-110' : 'opacity-70 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={!title.trim()}>Create Habit</Button>
        </div>
      </form>
    </Modal>
  );
}
