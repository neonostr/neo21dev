import { useState, useEffect } from 'react';
import { Type } from 'lucide-react';

const fonts = ['system', 'inter', 'jetbrains', 'space-grotesk', 'ibm-plex'] as const;
type Font = (typeof fonts)[number];

const fontConfig: Record<Font, { name: string; family: string }> = {
  system: { name: 'System Default', family: 'system-ui, -apple-system, sans-serif' },
  inter: { name: 'Inter', family: '"Inter", sans-serif' },
  jetbrains: { name: 'JetBrains Mono', family: '"JetBrains Mono", monospace' },
  'space-grotesk': { name: 'Space Grotesk', family: '"Space Grotesk", sans-serif' },
  'ibm-plex': { name: 'IBM Plex Sans', family: '"IBM Plex Sans", sans-serif' },
};

export const FontSwitcher = () => {
  const [currentFont, setCurrentFont] = useState<Font>('system');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('font-family') as Font;
    if (saved && fonts.includes(saved)) {
      setCurrentFont(saved);
      document.documentElement.style.setProperty('--font-sans', fontConfig[saved].family);
    }
  }, []);

  const cycleFont = () => {
    const currentIndex = fonts.indexOf(currentFont);
    const nextIndex = (currentIndex + 1) % fonts.length;
    const nextFont = fonts[nextIndex];
    
    setCurrentFont(nextFont);
    document.documentElement.style.setProperty('--font-sans', fontConfig[nextFont].family);
    localStorage.setItem('font-family', nextFont);
    
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <>
      <button
        onClick={cycleFont}
        className="p-2 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors opacity-30 hover:opacity-100"
        title="Click to change font"
      >
        <Type className="w-4 h-4" />
      </button>
      
      {showToast && (
        <div className="fixed bottom-16 right-4 px-3 py-2 rounded-lg bg-card border shadow-lg text-sm z-50 animate-in fade-in slide-in-from-bottom-2">
          Font: <span className="font-medium text-primary">{fontConfig[currentFont].name}</span>
        </div>
      )}
    </>
  );
};
