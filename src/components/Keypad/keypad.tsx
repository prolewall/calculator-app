import { useEffect, useMemo, useRef } from "react";

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

interface ButtonDefinition {
  value: CalculatorInput;
  displayValue?: string;
  type?: ButtonType;
  associatedKeys?: string[];
  id?: string;
}

const Keypad: React.FC<KeypadProps> = ({ inputCallback }) => {
  const handleKeyPress = (event: KeyboardEvent) => {
    const associatedButton = getMap().get(getButtonRefKey(event.key));

    if (associatedButton) {
      associatedButton.focus();
      associatedButton.click();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  });

  const buttonsRef = useRef<Map<string, HTMLButtonElement> | null>(null);

  const buttonDefinitions: ButtonDefinition[] = useMemo(
    () => [
      { value: "7" },
      { value: "8" },
      { value: "9" },
      {
        value: CalculatorOperation.Delete,
        type: ButtonType.Special,
        displayValue: "DEL",
        associatedKeys: ["Backspace"],
      },
      { value: "4" },
      { value: "5" },
      { value: "6" },
      {
        value: MathematicalOperation.Add,
        type: ButtonType.Standard,
        displayValue: "+",
      },
      { value: "1" },
      { value: "2" },
      { value: "3" },
      {
        value: MathematicalOperation.Subtract,
        type: ButtonType.Standard,
        displayValue: "-",
      },
      { value: "." },
      { value: "0" },
      {
        value: MathematicalOperation.Divide,
        type: ButtonType.Standard,
        displayValue: "/",
      },
      {
        value: MathematicalOperation.Multiply,
        type: ButtonType.Standard,
        displayValue: "x",
        associatedKeys: ["*", "x"],
      },
      {
        value: CalculatorOperation.Reset,
        type: ButtonType.Special,
        displayValue: "RESET",
        id: "reset-button",
        associatedKeys: ["Delete"],
      },
      {
        value: CalculatorOperation.Calculate,
        type: ButtonType.Equals,
        displayValue: "=",
        id: "equals-button",
      },
    ],
    []
  );

  function getMap(): Map<string, HTMLButtonElement> {
    if (!buttonsRef.current) {
      buttonsRef.current = new Map();
    }
    return buttonsRef.current;
  }

  function getButtonRefKey(key: string) {
    return `KeypadButton-${key}`;
  }

  return (
    <div className="Keypad">
      {buttonDefinitions.map((definition, index) => (
        <KeypadButton
          value={definition.displayValue ?? definition.value}
          type={definition.type ?? ButtonType.Standard}
          onClickCallback={() => inputCallback(definition.value)}
          key={`KeypadButton-${index}`}
          ref={(node) => {
            const map = getMap();
            const associatedKeys = definition.associatedKeys ?? [
              definition.displayValue ?? definition.value,
            ];
            associatedKeys.forEach((key) => {
              if (node) {
                map.set(getButtonRefKey(key), node);
              } else {
                map.delete(getButtonRefKey(key));
              }
            });
          }}
          id={definition.id}
        />
      ))}
    </div>
  );
};

export default Keypad;
