import * as React from "react";
import { cn } from "@/src/lib/utils";
import { motion, HTMLMotionProps } from "motion/react";
import { Plus } from "lucide-react";

export interface FABProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "ref"> {
  icon?: React.ReactNode;
  position?: "bottom-right" | "bottom-left" | "bottom-center";
}

const FAB = React.forwardRef<HTMLButtonElement, FABProps>(
  ({ className, icon = <Plus size={24} />, position = "bottom-right", ...props }, ref) => {
    const positions = {
      "bottom-right": "bottom-6 right-6",
      "bottom-left": "bottom-6 left-6",
      "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
    };

    return (
      <motion.button
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "fixed z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
          positions[position],
          className
        )}
        ref={ref}
        {...props as any}
      >
        {icon}
      </motion.button>
    );
  }
);
FAB.displayName = "FAB";

export { FAB };
