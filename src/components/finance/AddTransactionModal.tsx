import * as React from "react";
import { Modal } from "@/src/components/ui/Modal";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { useFinanceStore } from "@/src/store/useFinanceStore";
import { TransactionType } from "@/src/types/finance";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTransactionModal({ isOpen, onClose }: AddTransactionModalProps) {
  const { categories, addTransaction } = useFinanceStore();
  
  const [type, setType] = React.useState<TransactionType>('expense');
  const [amount, setAmount] = React.useState("");
  const [categoryId, setCategoryId] = React.useState("");
  const [note, setNote] = React.useState("");
  const [date, setDate] = React.useState(() => new Date().toISOString().split('T')[0]);

  const filteredCategories = categories.filter(c => c.type === type);

  React.useEffect(() => {
    if (filteredCategories.length > 0 && !filteredCategories.find(c => c.id === categoryId)) {
      setCategoryId(filteredCategories[0].id);
    }
  }, [type, categories, categoryId, filteredCategories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !categoryId) return;

    addTransaction({
      amount: parseFloat(amount),
      categoryId,
      date: new Date(date).toISOString(),
      note,
      type
    });

    setAmount("");
    setNote("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Transaction">
      <form onSubmit={handleSubmit} className="space-y-6 py-4">
        
        <div className="flex gap-4 p-1 bg-white/5 rounded-xl">
          <button
            type="button"
            onClick={() => setType('expense')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${type === 'expense' ? 'bg-rose-500 text-white' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <ArrowDownCircle size={16} />
            Expense
          </button>
          <button
            type="button"
            onClick={() => setType('income')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${type === 'income' ? 'bg-emerald-500 text-white' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <ArrowUpCircle size={16} />
            Income
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input 
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00" 
              className="pl-8 text-lg font-medium"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <select 
            className="w-full h-10 px-3 rounded-md bg-background border border-input text-sm"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            {filteredCategories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <Input 
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Note (Optional)</label>
            <Input 
              placeholder="What was this for?" 
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={!amount || !categoryId}>Add Transaction</Button>
        </div>
      </form>
    </Modal>
  );
}
