import { Card, CardContent } from "@/src/components/ui/Card";
import { useHabitStore } from "@/src/store/useHabitStore";
import { useFinanceStore } from "@/src/store/useFinanceStore";
import { useJournalStore } from "@/src/store/useJournalStore";
import { Target, TrendingDown, Smile } from "lucide-react";

export function InsightsGrid() {
  const { habits } = useHabitStore();
  const { transactions, categories } = useFinanceStore();
  const { entries } = useJournalStore();

  // Best Habit
  const bestHabit = habits.reduce((prev, current) => (prev.longestStreak > current.longestStreak) ? prev : current, habits[0]);

  // Top Expense Category
  const expenses = transactions.filter(t => t.type === 'expense');
  const categoryTotals = expenses.reduce((acc, t) => {
    acc[t.categoryId] = (acc[t.categoryId] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);
  
  const topExpenseCategoryId = Object.keys(categoryTotals).reduce((a, b) => categoryTotals[a] > categoryTotals[b] ? a : b, '');
  const topExpenseCategory = categories.find(c => c.id === topExpenseCategoryId);
  const topExpenseAmount = categoryTotals[topExpenseCategoryId] || 0;

  // Most frequent mood
  const moodCounts = entries.reduce((acc, e) => {
    acc[e.mood] = (acc[e.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const mostFrequentMood = Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b, 'neutral');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <Card variant="glass" className="hover:bg-white/5 transition-colors">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
            <Target size={24} />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Best Habit</h3>
          <p className="text-lg font-bold truncate w-full">{bestHabit?.title || 'None yet'}</p>
          <p className="text-xs text-primary mt-1">{bestHabit?.longestStreak || 0} day streak</p>
        </CardContent>
      </Card>

      <Card variant="glass" className="hover:bg-white/5 transition-colors">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mb-4">
            <TrendingDown size={24} />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Top Expense</h3>
          <p className="text-lg font-bold truncate w-full">{topExpenseCategory?.name || 'None yet'}</p>
          <p className="text-xs text-rose-500 mt-1">${topExpenseAmount.toFixed(2)}</p>
        </CardContent>
      </Card>

      <Card variant="glass" className="hover:bg-white/5 transition-colors">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4">
            <Smile size={24} />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Average Mood</h3>
          <p className="text-lg font-bold capitalize truncate w-full">{mostFrequentMood}</p>
          <p className="text-xs text-blue-500 mt-1">Based on journal entries</p>
        </CardContent>
      </Card>
    </div>
  );
}
