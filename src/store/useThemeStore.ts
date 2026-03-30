import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeType = "default" | "cyberpunk" | "luxury" | "minimal" | "organic" | "brutal";

interface ThemeConfig {
  name: string;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    accent: string;
  };
  font: string;
}

export const THEMES: Record<ThemeType, ThemeConfig> = {
  default: {
    name: "Default Dark",
    colors: {
      primary: "#F27D26",
      background: "#050505",
      card: "rgba(255, 255, 255, 0.03)",
      text: "#FFFFFF",
      accent: "#F27D26",
    },
    font: "'Inter', sans-serif",
  },
  cyberpunk: {
    name: "Cyberpunk",
    colors: {
      primary: "#00FF00",
      background: "#000000",
      card: "rgba(0, 255, 0, 0.05)",
      text: "#00FF00",
      accent: "#FF00FF",
    },
    font: "'JetBrains Mono', monospace",
  },
  luxury: {
    name: "Luxury Gold",
    colors: {
      primary: "#D4AF37",
      background: "#0A0A0A",
      card: "rgba(212, 175, 55, 0.05)",
      text: "#F5F2ED",
      accent: "#D4AF37",
    },
    font: "'Cormorant Garamond', serif",
  },
  minimal: {
    name: "Clean Utility",
    colors: {
      primary: "#4A4A4A",
      background: "#F5F5F5",
      card: "#FFFFFF",
      text: "#1A1A1A",
      accent: "#000000",
    },
    font: "'SF Pro Text', sans-serif",
  },
  organic: {
    name: "Warm Organic",
    colors: {
      primary: "#5A5A40",
      background: "#F5F5F0",
      card: "#FFFFFF",
      text: "#1A1A1A",
      accent: "#5A5A40",
    },
    font: "'Cormorant Garamond', serif",
  },
  brutal: {
    name: "Brutalist",
    colors: {
      primary: "#000000",
      background: "#FFFFFF",
      card: "#FFFFFF",
      text: "#000000",
      accent: "#00FF00",
    },
    font: "'Anton', sans-serif",
  },
};

interface ThemeState {
  currentTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      currentTheme: "default",
      setTheme: (theme) => set({ currentTheme: theme }),
    }),
    {
      name: "life-os-theme",
    }
  )
);
