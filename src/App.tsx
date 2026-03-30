/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { useAppStore } from "./store/useStore";
import { useThemeStore, THEMES } from "./store/useThemeStore";
import { useEffect, useState } from "react";

// Layout
import { AppLayout } from "./components/layout/AppLayout";
import { SplashScreen } from "./components/layout/SplashScreen";

// Pages
import { Dashboard } from "./pages/Dashboard";
import { Habits } from "./pages/Habits";
import { Timeline } from "./pages/Timeline";
import { Journal } from "./pages/Journal";
import { Finance } from "./pages/Finance";
import { Analytics } from "./pages/Analytics";
import { Profile } from "./pages/Profile";
import { AIChat } from "./pages/AIChat";
import { Gamification } from "./pages/Gamification";
import { Integrations } from "./pages/Integrations";
import { Demo } from "./pages/Demo";

export default function App() {
  const { setOffline } = useAppStore();
  const { currentTheme } = useThemeStore();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const handleOnline = () => setOffline(false);
    const handleOffline = () => setOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [setOffline]);

  // Apply Theme
  useEffect(() => {
    const theme = THEMES[currentTheme];
    const root = document.documentElement;
    
    // Colors
    root.style.setProperty("--c-primary", theme.colors.primary);
    root.style.setProperty("--c-bg", theme.colors.background);
    root.style.setProperty("--c-card", theme.colors.card);
    root.style.setProperty("--c-text", theme.colors.text);
    root.style.setProperty("--c-accent", theme.colors.accent);
    
    // Fonts
    if (currentTheme === "cyberpunk") {
      root.style.setProperty("--f-sans", "'JetBrains Mono', monospace");
      root.style.setProperty("--f-display", "'JetBrains Mono', monospace");
    } else if (currentTheme === "luxury" || currentTheme === "organic") {
      root.style.setProperty("--f-sans", "'Inter', sans-serif");
      root.style.setProperty("--f-display", "'Cormorant Garamond', serif");
    } else if (currentTheme === "brutal") {
      root.style.setProperty("--f-sans", "'Inter', sans-serif");
      root.style.setProperty("--f-display", "'Anton', sans-serif");
    } else {
      root.style.setProperty("--f-sans", "'Inter', sans-serif");
      root.style.setProperty("--f-display", "'Outfit', sans-serif");
    }
  }, [currentTheme]);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/habits" element={<Habits />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/achievements" element={<Gamification />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/ai" element={<AIChat />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}


