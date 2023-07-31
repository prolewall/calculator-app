import './App.scss';
import Calculator from './components/Calculator';
import ThemeToggle from './components/ThemeToggle';

const App = () => {
  return (
    <div className="App theme-1">
      <div className="App__content">
        <div className="App__settings">
          <p className="App__name">calc</p>
          <ThemeToggle />
        </div>
        <Calculator />
      </div>
    </div>
  );
}

export default App;
