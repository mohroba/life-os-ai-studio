import { TimelineEvent } from "../types/timeline";

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const twoDaysAgo = new Date(today);
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

export const MOCK_TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "1",
    type: "habit",
    title: "Morning Meditation",
    description: "Completed 15 minutes of mindfulness meditation.",
    timestamp: new Date(today.setHours(7, 30, 0, 0)).toISOString(),
    metadata: { streak: 12, duration: 15 }
  },
  {
    id: "2",
    type: "expense",
    title: "Coffee Shop",
    description: "Morning latte at Blue Bottle.",
    timestamp: new Date(today.setHours(8, 45, 0, 0)).toISOString(),
    metadata: { amount: 5.50, tags: ["food", "coffee"] }
  },
  {
    id: "3",
    type: "learning",
    title: "React Advanced Patterns",
    description: "Read chapter 4 on compound components and hooks.",
    timestamp: new Date(today.setHours(10, 0, 0, 0)).toISOString(),
    metadata: { duration: 45, tags: ["programming", "react"] }
  },
  {
    id: "4",
    type: "journal",
    title: "Mid-day check-in",
    description: "Feeling productive but a bit tired. Need to make sure I drink enough water today. The new project is going well, but I should probably break down the tasks more.",
    timestamp: new Date(today.setHours(13, 15, 0, 0)).toISOString(),
    metadata: { tags: ["reflection", "energy"] }
  },
  {
    id: "5",
    type: "habit",
    title: "Gym Workout",
    description: "Upper body strength training.",
    timestamp: new Date(yesterday.setHours(18, 0, 0, 0)).toISOString(),
    metadata: { streak: 3, duration: 60 }
  },
  {
    id: "6",
    type: "expense",
    title: "Grocery Store",
    description: "Weekly groceries at Trader Joe's.",
    timestamp: new Date(yesterday.setHours(19, 30, 0, 0)).toISOString(),
    metadata: { amount: 84.20, tags: ["groceries", "essentials"] }
  },
  {
    id: "7",
    type: "journal",
    title: "Evening Reflection",
    description: "Great day overall. Managed to hit all my goals.",
    timestamp: new Date(yesterday.setHours(22, 0, 0, 0)).toISOString(),
    metadata: { tags: ["gratitude"] }
  },
  {
    id: "8",
    type: "learning",
    title: "Spanish Practice",
    description: "Duolingo lesson and some vocabulary flashcards.",
    timestamp: new Date(twoDaysAgo.setHours(9, 0, 0, 0)).toISOString(),
    metadata: { duration: 20, tags: ["language"] }
  }
];
