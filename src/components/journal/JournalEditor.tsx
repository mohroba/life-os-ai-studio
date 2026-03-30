import * as React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useJournalStore } from "@/src/store/useJournalStore";
import { JournalEntry, Mood } from "@/src/types/journal";
import { Button } from "@/src/components/ui/Button";
import { ArrowLeft, Frown, CloudRain, Meh, Sun, Sparkles, Bold, Italic, List, ListOrdered, X } from "lucide-react";

interface JournalEditorProps {
  entryId: string | null;
  onClose: () => void;
}

const MOODS: { value: Mood; icon: any; label: string; color: string }[] = [
  { value: 'awful', icon: Frown, label: 'Awful', color: 'text-rose-500' },
  { value: 'bad', icon: CloudRain, label: 'Bad', color: 'text-orange-500' },
  { value: 'neutral', icon: Meh, label: 'Neutral', color: 'text-yellow-500' },
  { value: 'good', icon: Sun, label: 'Good', color: 'text-emerald-500' },
  { value: 'awesome', icon: Sparkles, label: 'Awesome', color: 'text-blue-500' },
];

export function JournalEditor({ entryId, onClose }: JournalEditorProps) {
  const { entries, addEntry, updateEntry } = useJournalStore();
  const existingEntry = entryId ? entries.find(e => e.id === entryId) : null;

  const [title, setTitle] = React.useState(existingEntry?.title || "");
  const [mood, setMood] = React.useState<Mood>(existingEntry?.mood || 'neutral');
  const [tags, setTags] = React.useState<string[]>(existingEntry?.tags || []);
  const [tagInput, setTagInput] = React.useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write your thoughts here...",
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: existingEntry?.content || "",
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[300px] text-lg leading-relaxed',
      },
    },
  });

  const handleSave = () => {
    if (!editor) return;
    const content = editor.getHTML();
    
    if (existingEntry) {
      updateEntry(existingEntry.id, { title, content, mood, tags });
    } else {
      addEntry({ title, content, mood, tags });
    }
    onClose();
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onClose}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <Button onClick={handleSave} disabled={!title.trim() || editor?.isEmpty}>
          Save Entry
        </Button>
      </div>

      <div className="space-y-6 flex-1 overflow-y-auto pb-20 no-scrollbar">
        {/* Title Input */}
        <input
          type="text"
          placeholder="Entry Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent text-4xl font-display font-bold focus:outline-none placeholder:text-muted-foreground/50"
        />

        {/* Meta Bar: Mood & Tags */}
        <div className="flex flex-wrap items-center gap-6 py-4 border-y border-border/50">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground mr-2">Mood:</span>
            {MOODS.map((m) => {
              const Icon = m.icon;
              const isActive = mood === m.value;
              return (
                <button
                  key={m.value}
                  onClick={() => setMood(m.value)}
                  className={`p-2 rounded-full transition-all ${isActive ? 'bg-white/10 scale-110' : 'hover:bg-white/5 opacity-50 hover:opacity-100'}`}
                  title={m.label}
                >
                  <Icon size={20} className={isActive ? m.color : 'text-muted-foreground'} />
                </button>
              );
            })}
          </div>

          <div className="w-px h-6 bg-border/50 hidden sm:block" />

          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <span className="text-sm text-muted-foreground mr-2">Tags:</span>
            <div className="flex flex-wrap items-center gap-2 flex-1">
              {tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/10 text-xs font-medium">
                  #{tag}
                  <button onClick={() => removeTag(tag)} className="hover:text-rose-500 transition-colors">
                    <X size={12} />
                  </button>
                </span>
              ))}
              <input
                type="text"
                placeholder="Add tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground/50 min-w-[80px] flex-1"
              />
            </div>
          </div>
        </div>

        {/* Toolbar */}
        {editor && (
          <div className="flex items-center gap-1 p-1 bg-white/5 rounded-lg w-fit">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 rounded-md transition-colors ${editor.isActive('bold') ? 'bg-white/10 text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}
            >
              <Bold size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 rounded-md transition-colors ${editor.isActive('italic') ? 'bg-white/10 text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}
            >
              <Italic size={18} />
            </button>
            <div className="w-px h-4 bg-border/50 mx-1" />
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-2 rounded-md transition-colors ${editor.isActive('bulletList') ? 'bg-white/10 text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}
            >
              <List size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`p-2 rounded-md transition-colors ${editor.isActive('orderedList') ? 'bg-white/10 text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}
            >
              <ListOrdered size={18} />
            </button>
          </div>
        )}

        {/* Editor Content */}
        <div className="min-h-[400px] cursor-text" onClick={() => editor?.commands.focus()}>
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
