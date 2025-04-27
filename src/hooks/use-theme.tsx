
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Use a simple string as the initial state to avoid client/server mismatch
  const [theme, setTheme] = useState<Theme>('light');
  
  // Effect for initializing theme from localStorage and system preferences
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        setTheme(savedTheme);
      } else if (
        typeof window !== 'undefined' &&
        window.matchMedia && 
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        setTheme('dark');
      }
    } catch (error) {
      // Fallback to light theme if there's any error
      console.error('Error accessing localStorage or matchMedia:', error);
    }
  }, []);

  // Effect for applying theme to document and saving to localStorage
  useEffect(() => {
    try {
      if (typeof document !== 'undefined') {
        if (theme === 'dark') {
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

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const contextValue = {
    theme,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
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
