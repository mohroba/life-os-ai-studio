import { motion } from "motion/react";
import { useIntegrationsStore } from "@/src/store/useIntegrationsStore";
import { Send, Calendar, CheckCircle2, AlertCircle, RefreshCw, Trash2, ExternalLink } from "lucide-react";
import { useAppStore } from "@/src/store/useStore";

const ICON_MAP: Record<string, any> = {
  Send,
  Calendar,
};

export function IntegrationCard({ integration }: { integration: any }) {
  const { connect, disconnect, sync } = useIntegrationsStore();
  const isOffline = useAppStore((state) => state.isOffline);
  const Icon = ICON_MAP[integration.icon] || Send;

  const handleConnect = async () => {
    if (integration.isConnected) return;
    await connect(integration.id);
  };

  const handleSync = async () => {
    if (!integration.isConnected || isOffline) return;
    await sync(integration.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-8 rounded-2xl glass-panel relative overflow-hidden group transition-all duration-300 ${
        integration.isConnected ? 'border-primary/30 bg-primary/5' : 'border-white/5 bg-white/5'
      }`}
    >
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className="flex items-center gap-5">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 duration-300 ${
            integration.isConnected ? 'bg-primary text-primary-foreground shadow-primary/20' : 'bg-white/10 text-muted-foreground'
          }`}>
            <Icon size={32} />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold">{integration.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-2 h-2 rounded-full ${
                integration.status === 'active' ? 'bg-emerald-500' : 
                integration.status === 'pending' ? 'bg-yellow-500 animate-pulse' : 
                integration.status === 'error' ? 'bg-red-500' : 'bg-white/20'
              }`} />
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {integration.status}
              </span>
            </div>
          </div>
        </div>

        {integration.isConnected && (
          <div className="flex items-center gap-2">
            <button 
              onClick={handleSync}
              disabled={isOffline || integration.status === 'pending'}
              className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={18} className={integration.status === 'pending' ? 'animate-spin' : ''} />
            </button>
            <button 
              onClick={() => disconnect(integration.id)}
              className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>

      <p className="text-muted-foreground text-sm mb-8 leading-relaxed relative z-10">
        {integration.description}
      </p>

      <div className="space-y-4 relative z-10">
        {!integration.isConnected ? (
          <button
            onClick={handleConnect}
            className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            Connect Service
            <ExternalLink size={18} />
          </button>
        ) : (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <span>Last Synced</span>
                <span>{integration.lastSyncedAt ? new Date(integration.lastSyncedAt).toLocaleString() : 'Never'}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <span>Status</span>
                <span className="text-emerald-500">Connected</span>
              </div>
            </div>
            
            {integration.id === 'telegram' && (
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center gap-3">
                <AlertCircle size={18} className="text-primary" />
                <p className="text-xs font-medium text-primary">
                  Bot is active. Use /start in Telegram to begin.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {integration.isConnected && (
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
      )}
    </motion.div>
  );
}
