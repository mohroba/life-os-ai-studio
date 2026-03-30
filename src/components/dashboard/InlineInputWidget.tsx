import * as React from "react";
import { motion } from "motion/react";
import { Send, Loader2, Sparkles } from "lucide-react";
import { sendMessageToAI } from "@/src/services/aiService";

export function InlineInputWidget() {
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setResult(null);
    try {
      const response = await sendMessageToAI(input);
      setResult(response.text);
      setInput("");
      setTimeout(() => setResult(null), 5000); // Clear result after 5s
    } catch (error) {
      setResult("Failed to process command.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-4 rounded-2xl relative overflow-hidden"
    >
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      
      <form onSubmit={handleSubmit} className="relative z-10">
        <div className="flex items-center gap-3 bg-background/50 border border-white/10 rounded-xl p-2 focus-within:ring-2 focus-within:ring-primary/50 transition-all">
          <div className="pl-2 text-primary">
            <Sparkles size={20} />
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Quick add: 'Spent $15 on lunch' or 'Read 20 pages'"
            className="flex-1 bg-transparent border-none focus:outline-none text-sm py-2"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50 transition-colors hover:bg-primary/90"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
        
        {result && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3 text-sm text-emerald-400 flex items-center gap-2 px-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {result}
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}
