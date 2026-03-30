import { PageWrapper } from "@/src/components/layout/PageWrapper";
import { GreetingWidget } from "@/src/components/dashboard/GreetingWidget";
import { LifeScoreWidget } from "@/src/components/dashboard/LifeScoreWidget";
import { TodayOverviewWidget } from "@/src/components/dashboard/TodayOverviewWidget";
import { TimelinePreviewWidget } from "@/src/components/dashboard/TimelinePreviewWidget";
import { AiInsightsWidget } from "@/src/components/dashboard/AiInsightsWidget";
import { QuickActionsWidget } from "@/src/components/dashboard/QuickActionsWidget";
import { InlineInputWidget } from "@/src/components/dashboard/InlineInputWidget";
import { LevelProgress } from "@/src/components/gamification/LevelProgress";
import { motion, Variants } from "motion/react";

export function Dashboard() {
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
    <PageWrapper>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {/* Section 1: Greeting + AI Hint */}
        <motion.div variants={itemVariants} className="space-y-4">
          <GreetingWidget />
          <InlineInputWidget />
        </motion.div>

        {/* Section 2: Life Score / Gamification */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div variants={itemVariants}>
            <LifeScoreWidget />
          </motion.div>
          <motion.div variants={itemVariants}>
            <LevelProgress />
          </motion.div>
        </div>

        {/* Section 6: Quick Actions */}
        <motion.div variants={itemVariants}>
          <QuickActionsWidget />
        </motion.div>

        {/* Section 3: Today Overview (Habits, Tasks, Finance) */}
        <motion.div variants={itemVariants}>
          <TodayOverviewWidget />
        </motion.div>

        {/* Section 4 & 5: Timeline & AI Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div variants={itemVariants}>
            <TimelinePreviewWidget />
          </motion.div>
          <motion.div variants={itemVariants}>
            <AiInsightsWidget />
          </motion.div>
        </div>
      </motion.div>
    </PageWrapper>
  );
}
