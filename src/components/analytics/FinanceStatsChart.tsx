import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/Card";
import { useFinanceStore } from "@/src/store/useFinanceStore";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function FinanceStatsChart() {
  const { transactions } = useFinanceStore();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const monthlyData = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date(currentYear, currentMonth - 5 + i, 1);
    return {
      name: d.toLocaleString('default', { month: 'short' }),
      balance: 0,
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
      if (t.type === 'income') dataPoint.balance += t.amount;
      else dataPoint.balance -= t.amount;
    }
  });

  // Calculate cumulative balance or just net flow per month
  let cumulative = 0;
  const chartData = monthlyData.map(d => {
    cumulative += d.balance;
    return {
      name: d.name,
      netFlow: d.balance,
      cumulative: cumulative
    };
  });

  return (
    <Card variant="glass" className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Financial Flow</CardTitle>
        <CardDescription>Net flow over last 6 months</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorFlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis dataKey="name" stroke="#888" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis stroke="#888" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
              formatter={(value: number) => `$${value.toFixed(2)}`}
            />
            <Area type="monotone" dataKey="netFlow" name="Net Flow" stroke="#10b981" fillOpacity={1} fill="url(#colorFlow)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
