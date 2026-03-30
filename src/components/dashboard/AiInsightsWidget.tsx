import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card";
import { Sparkles, TrendingUp, Brain } from "lucide-react";
import { motion } from "motion/react";

export function AiInsightsWidget() {
  const insights = [
    {
      icon: TrendingUp,
      text: "You've been spending 20% less on dining out this week. Great job!",
      color: "text-green-500",
      bg: "bg-green-500/10"
    },
    {
      icon: Brain,
      text: "Your focus sessions are most productive between 10 AM and 12 PM.",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    }
  ];

  return (
    <Card variant="glass-panel" className="h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
      
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles className="text-primary w-5 h-5" />
          AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15 }}
            className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
          >
            <div className={`p-2 rounded-lg ${insight.bg} shrink-0`}>
              <insight.icon className={`w-5 h-5 ${insight.color}`} />
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed">
              {insight.text}
            </p>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
