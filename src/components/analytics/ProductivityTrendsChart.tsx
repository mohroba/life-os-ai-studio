import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/Card";
import { useHabitStore } from "@/src/store/useHabitStore";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function ProductivityTrendsChart() {
  const { habits } = useHabitStore();

  // Generate last 30 days
  const last30Days = Array.from({ length: 30 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d.toISOString().split('T')[0];
  });

  const data = last30Days.map(date => {
    const completedCount = habits.filter(h => h.completedDates.includes(date)).length;
    const d = new Date(date);
    return {
      name: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      completed: completedCount,
    };
  });

  return (
    <Card variant="glass-panel" className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Productivity Trends</CardTitle>
        <CardDescription>Habits completed over the last 30 days</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis dataKey="name" stroke="#888" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} minTickGap={30} />
            <YAxis stroke="#888" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Line type="monotone" dataKey="completed" name="Completed Habits" stroke="#a855f7" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#a855f7' }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
