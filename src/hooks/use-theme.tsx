
import * as React from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>('system');
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  
  // Effect for initializing theme from localStorage and system preferences
  React.useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, []);

  // Effect for applying theme to document and calculating isDarkMode
  React.useEffect(() => {
    try {
      let shouldBeDark = false;
      
      if (theme === 'dark') {
        shouldBeDark = true;
      } else if (theme === 'light') {
        shouldBeDark = false;
      } else if (theme === 'system') {
        shouldBeDark = typeof window !== 'undefined' &&
          window.matchMedia && 
          window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      
      setIsDarkMode(shouldBeDark);
      
      if (typeof document !== 'undefined') {
        if (shouldBeDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('theme', theme);
      }
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  }, [theme]);

  const toggleTheme = React.useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }, []);

  const contextValue = React.useMemo(() => ({
    theme,
    toggleTheme,
    setTheme,
    isDarkMode,
  }), [theme, toggleTheme, isDarkMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
