import { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';
import { FontSwitcher } from './FontSwitcher';

const themes = ['purple', 'orange', 'green', 'blue', 'teal'] as const;
type Theme = (typeof themes)[number];

const themeNames: Record<Theme, string> = {
  purple: 'Electric Purple',
  orange: 'Bitcoin Orange',
  green: 'Bright Green',
  blue: 'Calm Blue',
  teal: 'Cyber Teal',
};

// Hidden theme switcher - double-click the palette icon to cycle themes
// Remove this component once you've chosen your color
export const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('purple');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('accent-theme') as Theme;
    if (saved && themes.includes(saved)) {
      setCurrentTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    }
  }, []);

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    
    setCurrentTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('accent-theme', nextTheme);
    
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 flex gap-2 z-50">
        <FontSwitcher />
        <button
          onClick={cycleTheme}
          className="p-2 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors opacity-30 hover:opacity-100"
          title="Click to change accent color"
        >
          <Palette className="w-4 h-4" />
        </button>
      </div>
      
      {showToast && (
        <div className="fixed bottom-16 right-4 px-3 py-2 rounded-lg bg-card border shadow-lg text-sm z-50 animate-in fade-in slide-in-from-bottom-2">
          Theme: <span className="font-medium text-primary">{themeNames[currentTheme]}</span>
        </div>
      )}
    </>
  );
};
