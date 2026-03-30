import { LayoutDashboard, Clock, BarChart3, User, Target, Wallet, BookOpen, Sparkles, Trophy, Settings } from "lucide-react";

export const NAV_ITEMS = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "AI Assistant", path: "/ai", icon: Sparkles },
  { label: "Achievements", path: "/achievements", icon: Trophy },
  { label: "Integrations", path: "/integrations", icon: Settings },
  { label: "Habits", path: "/habits", icon: Target },
  { label: "Timeline", path: "/timeline", icon: Clock },
  { label: "Journal", path: "/journal", icon: BookOpen },
  { label: "Finance", path: "/finance", icon: Wallet },
  { label: "Analytics", path: "/analytics", icon: BarChart3 },
  { label: "Profile", path: "/profile", icon: User },
];
