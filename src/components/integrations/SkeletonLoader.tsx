import { motion } from "motion/react";

export function SkeletonLoader() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-10 w-48 bg-white/5 rounded-lg" />
      <div className="h-6 w-64 bg-white/5 rounded-lg" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {[1, 2].map((i) => (
          <div key={i} className="p-8 rounded-2xl glass-panel space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/5" />
              <div className="space-y-2">
                <div className="h-6 w-32 bg-white/5 rounded-lg" />
                <div className="h-4 w-48 bg-white/5 rounded-lg" />
              </div>
            </div>
            <div className="h-24 w-full bg-white/5 rounded-xl" />
            <div className="h-12 w-full bg-white/5 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
