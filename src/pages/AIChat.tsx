import * as React from "react";
import { PageWrapper } from "@/src/components/layout/PageWrapper";
import { useChatStore } from "@/src/store/useChatStore";
import { sendMessageToAI } from "@/src/services/aiService";
import { Card } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { Send, Sparkles, Bot, User, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const SUGGESTIONS = [
  "Log $15 for lunch today",
  "Create a habit to read 20 pages daily",
  "Add a journal entry about feeling awesome today",
];

export function AIChat() {
  const { messages, addMessage } = useChatStore();
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg = text.trim();
    setInput("");
    addMessage({ role: 'user', content: userMsg });
    setIsLoading(true);

    try {
      // Pass previous messages for context
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const response = await sendMessageToAI(userMsg, history);
      
      addMessage({ role: 'model', content: response.text });
    } catch (error) {
      addMessage({ role: 'model', content: "Sorry, I encountered an error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper className="h-[calc(100vh-2rem)] flex flex-col">
      <div className="flex items-center gap-3 mb-6 shrink-0">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
          <Sparkles size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-gradient">AI Assistant</h1>
          <p className="text-sm text-muted-foreground">Your personal life operating system guide.</p>
        </div>
      </div>

      <Card variant="glass-panel" className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === 'user' ? 'bg-primary/10 text-foreground rounded-tr-sm' : 'bg-secondary/50 text-foreground rounded-tl-sm'}`}>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                  <span className="text-[10px] text-muted-foreground mt-2 block opacity-50">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shrink-0">
                  <Bot size={16} />
                </div>
                <div className="bg-secondary/50 rounded-2xl rounded-tl-sm p-4 flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-border/50 bg-background/50 backdrop-blur-md">
          <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-2">
            {SUGGESTIONS.map((suggestion, i) => (
              <button
                key={i}
                onClick={() => handleSend(suggestion)}
                className="whitespace-nowrap px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors border border-white/5"
              >
                {suggestion}
              </button>
            ))}
          </div>
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me to log a transaction, create a habit..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              disabled={isLoading}
            />
            <Button type="submit" disabled={!input.trim() || isLoading} className="rounded-xl px-6">
              <Send size={18} />
            </Button>
          </form>
        </div>
      </Card>
    </PageWrapper>
  );
}
