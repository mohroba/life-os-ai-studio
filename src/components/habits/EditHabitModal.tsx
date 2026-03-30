import * as React from "react";
import { Modal } from "@/src/components/ui/Modal";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { useHabitStore } from "@/src/store/useHabitStore";
import { Habit } from "@/src/types/habit";
import { Brain, Droplet, BookOpen, Target, Activity, Dumbbell, Trash2 } from "lucide-react";

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

interface EditHabitModalProps {
  habit: Habit | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EditHabitModal({ habit, isOpen, onClose }: EditHabitModalProps) {
  const { updateHabit, deleteHabit } = useHabitStore();
  
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [selectedIcon, setSelectedIcon] = React.useState("Target");
  const [selectedColor, setSelectedColor] = React.useState(COLORS[0]);

  React.useEffect(() => {
    if (habit && isOpen) {
      setTitle(habit.title);
      setDescription(habit.description || "");
      setSelectedIcon(habit.icon);
      setSelectedColor(habit.color);
    }
  }, [habit, isOpen]);

  if (!habit) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    updateHabit(habit.id, {
      title,
      description,
      icon: selectedIcon,
      color: selectedColor,
    });

    onClose();
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this habit?")) {
      deleteHabit(habit.id);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Habit">
      <form onSubmit={handleSubmit} className="space-y-6 py-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Habit Name</label>
          <Input 
            placeholder="e.g., Morning Run" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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

        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <Button type="button" variant="ghost" className="text-rose-500 hover:text-rose-600 hover:bg-rose-500/10" onClick={handleDelete}>
            <Trash2 size={18} className="mr-2" />
            Delete
          </Button>
          <div className="flex gap-3">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={!title.trim()}>Save Changes</Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
