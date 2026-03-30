import { useFinanceStore } from "@/src/store/useFinanceStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card";
import { ArrowDownRight, ArrowUpRight, Trash2, Utensils, Car, ShoppingBag, Film, Zap, Briefcase, Laptop } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const ICON_MAP: Record<string, any> = {
  Utensils, Car, ShoppingBag, Film, Zap, Briefcase, Laptop
};

export function TransactionList() {
  const { transactions, categories, deleteTransaction } = useFinanceStore();

  const getCategory = (id: string) => categories.find(c => c.id === id);

  return (
    <Card variant="glass" className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto pr-2 space-y-3">
        {transactions.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No transactions yet.
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {transactions.map((t) => {
              const category = getCategory(t.categoryId);
              const Icon = category ? ICON_MAP[category.icon] || ShoppingBag : ShoppingBag;
              const isExpense = t.type === 'expense';

              return (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, height: 0, scale: 0.95 }}
                  animate={{ opacity: 1, height: 'auto', scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="group flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${category?.color || '#666'}20`, color: category?.color || '#666' }}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{category?.name || 'Unknown'}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(t.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        {t.note && ` • ${t.note}`}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`font-mono font-medium flex items-center gap-1 ${isExpense ? 'text-rose-500' : 'text-emerald-500'}`}>
                      {isExpense ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
                      ${t.amount.toFixed(2)}
                    </div>
                    <button
                      onClick={() => deleteTransaction(t.id)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 rounded-md transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </CardContent>
    </Card>
  );
}
