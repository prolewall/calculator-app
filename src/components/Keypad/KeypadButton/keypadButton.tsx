import './keypadButton.scss';

export enum ButtonType {
    Standard,
    Special,
    Equals
}

interface KeypadButtonProps {
    value: string;
    type: ButtonType;
    onClickCallback: () => void;
    id?: string;
}

const KeypadButton:React.FC<KeypadButtonProps> = ({value, type, onClickCallback, id}) => {
    // console.log("KeypadButton rerendering");

    const getTypeClass = (type: ButtonType): string => {
        switch(type) {
            case ButtonType.Standard: return "KeypadButton__standard";
            case ButtonType.Special: return "KeypadButton__special";
            case ButtonType.Equals: return "KeypadButton__equals";
        }
    }

    return (
        <button id={id} className={'KeypadButton ' + getTypeClass(type)} onClick={() => onClickCallback()}>
            {value}
        </button>
    )
}

export default KeypadButton;