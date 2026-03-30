import { motion } from "motion/react";
import { useThemeStore, THEMES, ThemeType } from "@/src/store/useThemeStore";
import { Check, Palette, Sparkles, Zap, Shield, Leaf, Layout } from "lucide-react";

const THEME_ICONS: Record<ThemeType, any> = {
  default: Sparkles,
  cyberpunk: Zap,
  luxury: Shield,
  minimal: Layout,
  organic: Leaf,
  brutal: Palette,
};

export function ThemeCustomizer() {
  const { currentTheme, setTheme } = useThemeStore();

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-primary/10 text-primary">
          <Palette size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold">Theme Customizer</h2>
          <p className="text-muted-foreground text-sm">Personalize your Life OS experience</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(Object.keys(THEMES) as ThemeType[]).map((themeKey) => {
          const theme = THEMES[themeKey];
          const Icon = THEME_ICONS[themeKey];
          const isSelected = currentTheme === themeKey;

          return (
            <motion.button
              key={themeKey}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setTheme(themeKey)}
              className={`p-6 rounded-2xl border-2 text-left transition-all relative overflow-hidden group ${
                isSelected 
                  ? 'border-primary bg-primary/5' 
                  : 'border-white/5 bg-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${
                  isSelected ? 'bg-primary text-primary-foreground' : 'bg-white/10 text-muted-foreground'
                }`}>
                  <Icon size={24} />
                </div>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="p-1 rounded-full bg-primary text-primary-foreground"
                  >
                    <Check size={14} />
                  </motion.div>
                )}
              </div>

              <h3 className="text-lg font-bold mb-1">{theme.name}</h3>
              <div className="flex gap-1 mt-3">
                {Object.values(theme.colors).map((color, i) => (
                  <div 
                    key={i} 
                    className="w-4 h-4 rounded-full border border-white/10" 
                    style={{ backgroundColor: color }} 
                  />
                ))}
              </div>

              {/* Theme Preview Background */}
              <div 
                className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-3xl opacity-20 transition-opacity group-hover:opacity-40"
                style={{ backgroundColor: theme.colors.primary }}
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
