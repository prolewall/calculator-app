import './App.scss';
import Calculator from './components/Calculator';
import ThemeToggle from './components/ThemeToggle';
import React, { useState, useCallback } from 'react';



const App = () => {
  const getInitialTheme = (): string => {
    const storedThemePreference = localStorage.getItem("theme");

    if (storedThemePreference) {
      return storedThemePreference
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (prefersDark) {
        return "theme-1";
      } else {
        return "theme-2";
      }
    }
  };

  const [currentTheme, setCurrentTheme] = useState(getInitialTheme);

  const handleThemeClassChange = useCallback((newTheme: string) => {
    setCurrentTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }, []);

  return (
    <div data-testid="App" className={`App ${currentTheme}`}>
      <div className="App__content">
        <div className="App__settings">
          <p className="App__name">calc</p>
          <ThemeToggle currentTheme={currentTheme} themeChangeCallback={handleThemeClassChange}/>
        </div>
        <Calculator />
      </div>
    </div>
  );
}

export default App;
