import { forwardRef } from "react";

import "./keypadButton.scss";

export enum ButtonType {
  Standard = "Standard",
  Special = "Special",
  Equals = "Equals",
}

interface KeypadButtonProps {
  value: string;
  type: ButtonType;
  onClickCallback: () => void;
  id?: string;
}

const KeypadButton = forwardRef<HTMLButtonElement, KeypadButtonProps>(
  function KeypadButton(props: KeypadButtonProps, ref) {
    const getTypeClass = (type: ButtonType): string => {
      switch (type) {
        case ButtonType.Standard:
          return "KeypadButton__standard";
        case ButtonType.Special:
          return "KeypadButton__special";
        case ButtonType.Equals:
          return "KeypadButton__equals";
      }
    };

    return (
      <button
        id={props.id}
        className={"KeypadButton " + getTypeClass(props.type)}
        onClick={() => props.onClickCallback()}
        ref={ref}
      >
        {props.value}
      </button>
    );
  }
);

export default KeypadButton;
