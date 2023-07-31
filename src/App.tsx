import './App.scss';
import Calculator from './components/Calculator';
import ThemeToggle from './components/ThemeToggle';
import React, { useState } from 'react';

const App = () => {
  const [themeClass, setThemeClass] = useState("theme-1");

  return (
    <div className={`App ${themeClass}`}>
      <div className="App__content">
        <div className="App__settings">
          <p className="App__name">calc</p>
          <ThemeToggle themeChangeCallback={setThemeClass}/>
        </div>
        <Calculator />
      </div>
    </div>
  );
}

export default App;
