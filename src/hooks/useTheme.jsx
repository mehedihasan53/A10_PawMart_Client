import { useState, useEffect } from 'react';

const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') return false;
    
    // Check localStorage first
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Apply theme to document immediately
    const applyTheme = (dark) => {
      const html = document.documentElement;
      
      if (dark) {
        html.classList.add('dark');
        html.style.colorScheme = 'dark';
        localStorage.setItem('theme', 'dark');
      } else {
        html.classList.remove('dark');
        html.style.colorScheme = 'light';
        localStorage.setItem('theme', 'light');
      }
    };

    applyTheme(isDark);
  }, [isDark]);

  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Only update if user hasn't manually set a preference
      const saved = localStorage.getItem('theme');
      if (!saved) {
        setIsDark(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const newTheme = !prev;
      
      // Apply theme immediately to prevent flash
      const html = document.documentElement;
      if (newTheme) {
        html.classList.add('dark');
        html.style.colorScheme = 'dark';
      } else {
        html.classList.remove('dark');
        html.style.colorScheme = 'light';
      }
      
      return newTheme;
    });
  };

  const setTheme = (theme) => {
    const dark = theme === 'dark';
    setIsDark(dark);
    
    // Apply theme immediately
    const html = document.documentElement;
    if (dark) {
      html.classList.add('dark');
      html.style.colorScheme = 'dark';
    } else {
      html.classList.remove('dark');
      html.style.colorScheme = 'light';
    }
  };

  return {
    isDark,
    toggleTheme,
    setTheme,
    theme: isDark ? 'dark' : 'light'
  };
};

export default useTheme;