import * as React from "react";
import { motion } from "motion/react";
import { Plus, DollarSign, BookOpen, Target } from "lucide-react";
import { CreateHabitModal } from "@/src/components/habits/CreateHabitModal";
import { AddTransactionModal } from "@/src/components/finance/AddTransactionModal";
import { QuickAddJournalModal } from "@/src/components/journal/QuickAddJournalModal";
import { useNavigate } from "react-router-dom";

export function QuickActionsWidget() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = React.useState<'habit' | 'finance' | 'journal' | null>(null);

  const actions = [
    { label: "Add Habit", icon: Target, color: "bg-orange-500", onClick: () => setActiveModal('habit') },
    { label: "Log Expense", icon: DollarSign, color: "bg-emerald-500", onClick: () => setActiveModal('finance') },
    { label: "New Entry", icon: BookOpen, color: "bg-blue-500", onClick: () => setActiveModal('journal') },
    { label: "Ask AI", icon: Plus, color: "bg-purple-500", onClick: () => navigate('/ai') },
  ];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, i) => (
          <motion.button
            key={i}
            onClick={action.onClick}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl glass hover:bg-white/10 transition-colors border-white/5"
          >
            <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center text-white shadow-lg`}>
              <action.icon className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-foreground">{action.label}</span>
          </motion.button>
        ))}
      </div>

      <CreateHabitModal isOpen={activeModal === 'habit'} onClose={() => setActiveModal(null)} />
      <AddTransactionModal isOpen={activeModal === 'finance'} onClose={() => setActiveModal(null)} />
      <QuickAddJournalModal isOpen={activeModal === 'journal'} onClose={() => setActiveModal(null)} />
    </>
  );
}
