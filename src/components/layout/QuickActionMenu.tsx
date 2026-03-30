import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Target, Wallet, BookOpen, X } from "lucide-react";
import { CreateHabitModal } from "@/src/components/habits/CreateHabitModal";
import { AddTransactionModal } from "@/src/components/finance/AddTransactionModal";
import { QuickAddJournalModal } from "@/src/components/journal/QuickAddJournalModal";

export function QuickActionMenu() {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const [activeModal, setActiveModal] = React.useState<'habit' | 'finance' | 'journal' | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const actions = [
    { id: 'habit', label: 'Add Habit', icon: Target, color: 'bg-emerald-500', onClick: () => { setActiveModal('habit'); setIsOpen(false); } },
    { id: 'finance', label: 'Add Transaction', icon: Wallet, color: 'bg-blue-500', onClick: () => { setActiveModal('finance'); setIsOpen(false); } },
    { id: 'journal', label: 'Quick Journal', icon: BookOpen, color: 'bg-purple-500', onClick: () => { setActiveModal('journal'); setIsOpen(false); } },
  ];

  return (
    <>
      <div className="fixed bottom-24 md:bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="flex flex-col gap-3 items-end"
            >
              {actions.map((action, index) => (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: index * 0.05 } }}
                  exit={{ opacity: 0, x: 20, transition: { delay: (actions.length - 1 - index) * 0.05 } }}
                  onClick={action.onClick}
                  className="flex items-center gap-3 group"
                >
                  <span className="px-3 py-1.5 rounded-lg bg-background/80 backdrop-blur-md text-sm font-medium shadow-sm opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-200">
                    {action.label}
                  </span>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg ${action.color} hover:scale-110 transition-transform`}>
                    <action.icon size={20} />
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleMenu}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-primary-foreground shadow-xl transition-colors z-50 ${
            isOpen ? 'bg-rose-500' : 'bg-primary'
          }`}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Plus size={28} />
          </motion.div>
        </motion.button>
      </div>

      <CreateHabitModal 
        isOpen={activeModal === 'habit'} 
        onClose={() => setActiveModal(null)} 
      />
      <AddTransactionModal 
        isOpen={activeModal === 'finance'} 
        onClose={() => setActiveModal(null)} 
      />
      <QuickAddJournalModal 
        isOpen={activeModal === 'journal'} 
        onClose={() => setActiveModal(null)} 
      />
    </>
  );
}
