import { useLocation } from "react-router-dom";
import { NAV_ITEMS } from "@/src/config/navigation";
import { useAppStore } from "@/src/store/useStore";
import { WifiOff, Bell, Search } from "lucide-react";

export function Header() {
  const location = useLocation();
  const { isOffline } = useAppStore();
  
  const currentNavItem = NAV_ITEMS.find(item => item.path === location.pathname);
  const title = currentNavItem?.label || "Life OS";

  return (
    <header className="h-20 px-4 md:px-8 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md bg-background/50 border-b border-border/50">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-display font-semibold md:hidden text-gradient">Life OS</h1>
        <h2 className="hidden md:block text-xl font-display font-medium text-foreground/90">{title}</h2>
        
        {isOffline && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-medium border border-destructive/20">
            <WifiOff size={14} />
            <span className="hidden sm:inline">Offline</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 rounded-full hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors">
          <Search size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-orange-400 p-[2px] cursor-pointer ml-2">
          <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=LifeOS" 
              alt="User avatar" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
