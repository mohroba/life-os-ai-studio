export type EventType = 'habit' | 'expense' | 'journal' | 'learning';

export interface TimelineEvent {
  id: string;
  type: EventType;
  title: string;
  description?: string;
  timestamp: string; // ISO string
  metadata?: {
    amount?: number;
    streak?: number;
    tags?: string[];
    duration?: number; // in minutes
  };
}
