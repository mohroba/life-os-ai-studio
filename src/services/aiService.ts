import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { useFinanceStore } from "../store/useFinanceStore";
import { useHabitStore } from "../store/useHabitStore";
import { useJournalStore } from "../store/useJournalStore";

// The environment injects process.env.GEMINI_API_KEY
declare const process: any;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const addTransactionDeclaration: FunctionDeclaration = {
  name: "addTransaction",
  description: "Log a new financial transaction (income or expense).",
  parameters: {
    type: Type.OBJECT,
    properties: {
      amount: { type: Type.NUMBER, description: "The amount of the transaction" },
      type: { type: Type.STRING, description: "Either 'income' or 'expense'" },
      note: { type: Type.STRING, description: "A short description of the transaction" },
      categoryName: { type: Type.STRING, description: "The category of the transaction, e.g., Food, Transport, Salary, Entertainment" }
    },
    required: ["amount", "type", "categoryName"]
  }
};

const addHabitDeclaration: FunctionDeclaration = {
  name: "addHabit",
  description: "Create a new habit to track.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING, description: "The name of the habit" },
      description: { type: Type.STRING, description: "A short description of the habit" }
    },
    required: ["title"]
  }
};

const addJournalEntryDeclaration: FunctionDeclaration = {
  name: "addJournalEntry",
  description: "Add a new journal entry.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING, description: "The title of the journal entry" },
      content: { type: Type.STRING, description: "The content of the journal entry" },
      mood: { type: Type.STRING, description: "The mood, must be one of: 'awful', 'bad', 'neutral', 'good', 'awesome'" }
    },
    required: ["title", "content", "mood"]
  }
};

export async function sendMessageToAI(message: string, history: any[] = []) {
  try {
    const contents = history.map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        systemInstruction: "You are a helpful life assistant. You can help the user log finances, habits, and journal entries. Use the provided tools to take action when the user asks to log or create something. If you use a tool, confirm to the user that the action was taken.",
        tools: [{ functionDeclarations: [addTransactionDeclaration, addHabitDeclaration, addJournalEntryDeclaration] }]
      }
    });

    const functionCalls = response.functionCalls;
    if (functionCalls && functionCalls.length > 0) {
      let actionResults = [];
      for (const call of functionCalls) {
        if (call.name === 'addTransaction') {
          const { amount, type, note, categoryName } = call.args as any;
          const { categories, addTransaction } = useFinanceStore.getState();
          let category = categories.find(c => c.name.toLowerCase().includes(categoryName.toLowerCase()));
          if (!category) category = categories[0];
          
          addTransaction({
            amount: Number(amount),
            type: type as 'income' | 'expense',
            categoryId: category.id,
            note: note || '',
            date: new Date().toISOString()
          });
          actionResults.push(`Added transaction: ${type} of $${amount} for ${category.name}.`);
        } else if (call.name === 'addHabit') {
          const { title, description } = call.args as any;
          useHabitStore.getState().addHabit({
            title,
            description: description || '',
            color: 'bg-primary',
            icon: 'Target',
            xpReward: 20
          });
          actionResults.push(`Added habit: ${title}.`);
        } else if (call.name === 'addJournalEntry') {
          const { title, content, mood } = call.args as any;
          useJournalStore.getState().addEntry({
            title,
            content: `<p>${content}</p>`,
            mood: mood as any,
            tags: ['ai-generated']
          });
          actionResults.push(`Added journal entry: ${title}.`);
        }
      }
      
      return {
        text: `I've taken care of that for you!\n\n${actionResults.join('\n')}`,
        isFunctionCall: true
      };
    }

    return {
      text: response.text || "I'm not sure how to respond to that.",
      isFunctionCall: false
    };
  } catch (error) {
    console.error("AI Error:", error);
    return {
      text: "Sorry, I encountered an error processing your request.",
      isFunctionCall: false
    };
  }
}
