import { useFinanceStore } from "@/src/store/useFinanceStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export function MonthlyOverviewChart() {
  const { transactions } = useFinanceStore();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const monthlyData = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date(currentYear, currentMonth - 5 + i, 1);
    return {
      name: d.toLocaleString('default', { month: 'short' }),
      income: 0,
      expense: 0,
      month: d.getMonth(),
      year: d.getFullYear()
    };
  });

  transactions.forEach(t => {
    const d = new Date(t.date);
    const m = d.getMonth();
    const y = d.getFullYear();
    const dataPoint = monthlyData.find(md => md.month === m && md.year === y);
    if (dataPoint) {
      if (t.type === 'income') dataPoint.income += t.amount;
      else dataPoint.expense += t.amount;
    }
  });

  return (
    <Card variant="glass" className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Income vs Expense</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={monthlyData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis dataKey="name" stroke="#888" tick={{ fill: '#888' }} />
            <YAxis stroke="#888" tick={{ fill: '#888' }} tickFormatter={(value) => `$${value}`} />
            <Tooltip
              cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
              contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
              formatter={(value: number) => `$${value.toFixed(2)}`}
            />
            <Legend verticalAlign="top" height={36} iconType="circle" />
            <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
            <Bar dataKey="expense" name="Expense" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
