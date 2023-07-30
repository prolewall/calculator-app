import './calculator.scss';
import Display from '../Display';
import Keypad from '../Keypad';

const Calculator = () => {
  return (
    <div className="Calculator">
      <Display 
          currentValue='12'
        />
      <Keypad />
    </div>
  );
}

export default Calculator;