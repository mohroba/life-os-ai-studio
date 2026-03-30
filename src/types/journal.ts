export type Mood = 'awful' | 'bad' | 'neutral' | 'good' | 'awesome';

export interface JournalEntry {
  id: string;
  title: string;
  content: string; // HTML content
  mood: Mood;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
