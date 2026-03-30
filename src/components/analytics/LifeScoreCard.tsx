import { Card, CardContent } from "@/src/components/ui/Card";
import { useHabitStore } from "@/src/store/useHabitStore";
import { useFinanceStore } from "@/src/store/useFinanceStore";
import { useJournalStore } from "@/src/store/useJournalStore";
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { Trophy, Star, TrendingUp } from "lucide-react";

export function LifeScoreCard() {
  const { habits } = useHabitStore();
  const { transactions } = useFinanceStore();
  const { entries } = useJournalStore();

  // Calculate a mock life score based on data
  const habitScore = habits.reduce((acc, h) => acc + h.currentStreak * 10, 0);
  const financeScore = transactions.filter(t => t.type === 'income').length * 20;
  const journalScore = entries.length * 15;
  
  const totalScore = Math.min(1000, habitScore + financeScore + journalScore + 200); // Base 200
  const percentage = Math.min(100, (totalScore / 1000) * 100);

  const data = [
    { name: "Score", value: percentage, fill: "#f27d26" }
  ];

  return (
    <Card variant="glass-panel" className="relative overflow-hidden h-full">
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      
      <CardContent className="p-6 flex flex-col items-center justify-center h-full text-center">
        <h2 className="text-xl font-display font-bold mb-2">Overall Life Score</h2>
        <p className="text-sm text-muted-foreground mb-6">Based on your habits, finances, and journaling.</p>
        
        <div className="relative w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart 
              cx="50%" 
              cy="50%" 
              innerRadius="70%" 
              outerRadius="100%" 
              barSize={12} 
              data={data} 
              startAngle={90} 
              endAngle={-270}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
              <RadialBar
                background={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                dataKey="value"
                cornerRadius={10}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Trophy className="w-8 h-8 text-primary mb-1" />
            <span className="text-3xl font-display font-bold">{totalScore}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 w-full mt-8">
          <div className="flex flex-col items-center p-3 rounded-xl bg-white/5">
            <Star className="w-5 h-5 text-yellow-500 mb-1" />
            <span className="text-xs text-muted-foreground">Habits</span>
            <span className="font-bold">{habitScore}</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-xl bg-white/5">
            <TrendingUp className="w-5 h-5 text-emerald-500 mb-1" />
            <span className="text-xs text-muted-foreground">Finance</span>
            <span className="font-bold">{financeScore}</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-xl bg-white/5">
            <span className="text-xl mb-1">📝</span>
            <span className="text-xs text-muted-foreground">Journal</span>
            <span className="font-bold">{journalScore}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
