import { PageWrapper } from "@/src/components/layout/PageWrapper";
import { LifeScoreCard } from "@/src/components/analytics/LifeScoreCard";
import { HabitStatsChart } from "@/src/components/analytics/HabitStatsChart";
import { FinanceStatsChart } from "@/src/components/analytics/FinanceStatsChart";
import { ProductivityTrendsChart } from "@/src/components/analytics/ProductivityTrendsChart";
import { InsightsGrid } from "@/src/components/analytics/InsightsGrid";
import { motion, Variants } from "motion/react";

export function Analytics() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <PageWrapper className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-gradient">Analytics</h1>
          <p className="text-muted-foreground mt-1">Visualize your life data and trends.</p>
        </div>
      </div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Top Row: Life Score & Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <LifeScoreCard />
          </motion.div>
          <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col justify-center">
            <InsightsGrid />
          </motion.div>
        </div>

        {/* Middle Row: Habits & Finance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={itemVariants} className="h-[350px]">
            <HabitStatsChart />
          </motion.div>
          <motion.div variants={itemVariants} className="h-[350px]">
            <FinanceStatsChart />
          </motion.div>
        </div>

        {/* Bottom Row: Productivity Trends */}
        <motion.div variants={itemVariants} className="h-[400px]">
          <ProductivityTrendsChart />
        </motion.div>
      </motion.div>
    </PageWrapper>
  );
}
