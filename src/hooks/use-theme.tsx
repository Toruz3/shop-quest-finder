
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Check for initial theme in a safe way without causing hydration issues
  const [theme, setTheme] = useState<Theme>('light');
  
  // Load theme preference on mount (client-side only)
  useEffect(() => {
    // Check if a theme is saved in localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    // If it exists, use it, otherwise check system preferences
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (
      window.matchMedia && 
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setTheme('dark');
    }
    // No need for default case as we already set 'light' as the initial value
  }, []);

  useEffect(() => {
    // Save the theme to localStorage
    localStorage.setItem('theme', theme);
    
    // Update document classes
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
