import { PageWrapper } from "@/src/components/layout/PageWrapper";
import { IntegrationCard } from "@/src/components/integrations/IntegrationCard";
import { SkeletonLoader } from "@/src/components/integrations/SkeletonLoader";
import { useIntegrationsStore } from "@/src/store/useIntegrationsStore";
import { motion, Variants } from "motion/react";
import { useAppStore } from "@/src/store/useStore";
import { Wifi, WifiOff, RefreshCw } from "lucide-react";

export function Integrations() {
  const { integrations, isLoading, sync } = useIntegrationsStore();
  const isOffline = useAppStore((state) => state.isOffline);

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

  const handleSyncAll = async () => {
    if (isOffline) return;
    for (const integration of integrations) {
      if (integration.isConnected) {
        await sync(integration.id);
      }
    }
  };

  return (
    <PageWrapper>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-12 pb-24"
      >
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-display font-bold text-gradient">Integrations</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Connect your favorite services to automate your Life OS and sync data across platforms.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`px-4 py-2 rounded-xl flex items-center gap-2 border transition-all duration-300 ${
              isOffline ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
            }`}>
              {isOffline ? <WifiOff size={18} /> : <Wifi size={18} />}
              <span className="text-xs font-bold uppercase tracking-widest">
                {isOffline ? 'Offline' : 'Online'}
              </span>
            </div>
            
            <button 
              onClick={handleSyncAll}
              disabled={isOffline}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">Sync All</span>
            </button>
          </div>
        </header>

        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {integrations.map((integration) => (
              <motion.div key={integration.id} variants={itemVariants}>
                <IntegrationCard integration={integration} />
              </motion.div>
            ))}
          </div>
        )}

        <motion.div variants={itemVariants} className="p-8 rounded-2xl glass-panel border-white/5 bg-white/5 flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-muted-foreground">
            <RefreshCw size={32} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-display font-bold">More coming soon</h3>
            <p className="text-muted-foreground text-sm max-w-md">
              We're working on integrations for Spotify, Strava, and more. Have a request? Let us know!
            </p>
          </div>
          <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-bold">
            Request Integration
          </button>
        </motion.div>
      </motion.div>
    </PageWrapper>
  );
}
