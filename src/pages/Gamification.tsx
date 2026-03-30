import { PageWrapper } from "@/src/components/layout/PageWrapper";
import { LevelProgress } from "@/src/components/gamification/LevelProgress";
import { BadgesGrid } from "@/src/components/gamification/BadgesGrid";
import { AchievementsList } from "@/src/components/gamification/AchievementsList";
import { motion, Variants } from "motion/react";

export function Gamification() {
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
        className="space-y-12 pb-24"
      >
        <header className="flex flex-col gap-2">
          <h1 className="text-4xl font-display font-bold text-gradient">Achievements</h1>
          <p className="text-muted-foreground text-lg">Track your progress and unlock rewards.</p>
        </header>

        <motion.div variants={itemVariants}>
          <LevelProgress />
        </motion.div>

        <motion.div variants={itemVariants}>
          <BadgesGrid />
        </motion.div>

        <motion.div variants={itemVariants}>
          <AchievementsList />
        </motion.div>
      </motion.div>
    </PageWrapper>
  );
}
