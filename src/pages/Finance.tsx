import * as React from "react";
import { PageWrapper } from "@/src/components/layout/PageWrapper";
import { useFinanceStore } from "@/src/store/useFinanceStore";
import { AddTransactionModal } from "@/src/components/finance/AddTransactionModal";
import { TransactionList } from "@/src/components/finance/TransactionList";
import { ExpenseBreakdownChart } from "@/src/components/finance/ExpenseBreakdownChart";
import { MonthlyOverviewChart } from "@/src/components/finance/MonthlyOverviewChart";
import { motion } from "motion/react";
import { Wallet, TrendingUp, TrendingDown, Plus } from "lucide-react";
import { Button } from "@/src/components/ui/Button";

export function Finance() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { transactions } = useFinanceStore();

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <PageWrapper>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-gradient">Finance</h1>
          <p className="text-muted-foreground mt-1">Track your spending and income.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus size={16} /> Add Transaction
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl glass border border-white/10 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Wallet size={24} />
          </div>
          <div>
            <div className="text-sm text-muted-foreground font-medium">Total Balance</div>
            <div className="text-2xl font-bold">${balance.toFixed(2)}</div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl glass border border-white/10 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <TrendingUp size={24} />
          </div>
          <div>
            <div className="text-sm text-muted-foreground font-medium">Total Income</div>
            <div className="text-2xl font-bold text-emerald-500">${totalIncome.toFixed(2)}</div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl glass border border-white/10 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
            <TrendingDown size={24} />
          </div>
          <div>
            <div className="text-sm text-muted-foreground font-medium">Total Expenses</div>
            <div className="text-2xl font-bold text-rose-500">${totalExpense.toFixed(2)}</div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
        <div className="lg:col-span-2 flex flex-col gap-6 h-full">
          <div className="flex-1 min-h-0">
            <MonthlyOverviewChart />
          </div>
          <div className="flex-1 min-h-0">
            <ExpenseBreakdownChart />
          </div>
        </div>
        <div className="h-full">
          <TransactionList />
        </div>
      </div>

      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </PageWrapper>
  );
}
