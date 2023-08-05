import {
  CalculatorInput,
  CalculatorOperation,
  MathematicalOperation,
} from "domain/types";

import KeypadButton, { ButtonType } from "./KeypadButton";
import "./keypad.scss";

interface KeypadProps {
  inputCallback: (value: CalculatorInput) => void;
}

const Keypad: React.FC<KeypadProps> = ({ inputCallback }) => {
  return (
    <div className="Keypad">
      <KeypadButton
        value={"7"}
        type={ButtonType.Standard}
        onClickCallback={() => inputCallback("7")}
      />
      <KeypadButton
        value={"8"}
        type={ButtonType.Standard}
        onClickCallback={() => inputCallback("8")}
      />
      <KeypadButton
        value={"9"}
        type={ButtonType.Standard}
        onClickCallback={() => inputCallback("9")}
      />
      <KeypadButton
        value={"DEL"}
        type={ButtonType.Special}
        onClickCallback={() => inputCallback(CalculatorOperation.Delete)}
      />

      <KeypadButton
        value={"4"}
        type={ButtonType.Standard}
        onClickCallback={() => inputCallback("4")}
      />
      <KeypadButton
        value={"5"}
        type={ButtonType.Standard}
        onClickCallback={() => inputCallback("5")}
      />
      <KeypadButton
        value={"6"}
        type={ButtonType.Standard}
        onClickCallback={() => inputCallback("6")}
      />
      <KeypadButton
        value={"+"}
        type={ButtonType.Standard}
        onClickCallback={() => inputCallback(MathematicalOperation.Add)}
      />

      <KeypadButton
        value={"1"}
        type={ButtonType.Standard}
        onClickCallback={() => inputCallback("1")}
      />
      <KeypadButton
        value={"2"}
        type={ButtonType.Standard}
        onClickCallback={() => inputCallback("2")}
      />
      <KeypadButton
        value={"3"}
        type={ButtonType.Standard}
        onClickCallback={() => inputCallback("3")}
      />
      <KeypadButton
        value={"-"}
        type={ButtonType.Standard}
        onClickCallback={() => inputCallback(MathematicalOperation.Subtract)}
      />

      <KeypadButton
        value={"."}
        type={ButtonType.Standard}
        onClickCallback={() => inputCallback(".")}
      />
      <KeypadButton
        value={"0"}
        type={ButtonType.Standard}
        onClickCallback={() => inputCallback("0")}
      />
      <KeypadButton
        value={"/"}
        type={ButtonType.Standard}
        onClickCallback={() => inputCallback(MathematicalOperation.Divide)}
      />
      <KeypadButton
        value={"x"}
        type={ButtonType.Standard}
        onClickCallback={() => inputCallback(MathematicalOperation.Multiply)}
      />

      <KeypadButton
        value={"RESET"}
        type={ButtonType.Special}
        onClickCallback={() => inputCallback(CalculatorOperation.Reset)}
        id="reset-button"
      />
      <KeypadButton
        value={"="}
        type={ButtonType.Equals}
        onClickCallback={() => inputCallback(CalculatorOperation.Calculate)}
        id="equals-button"
      />
    </div>
  );
};

export default Keypad;
