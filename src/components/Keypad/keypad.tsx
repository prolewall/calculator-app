import './keypad.scss';
import KeypadButton, { ButtonType } from './KeypadButton';
import { CalculatorOperation, MathematicalOperation } from '../../constants/operationConstants';


interface KeypadProps {
    numberInputCallback: (value: string) => void;
    calculatorOperationCallback: (operation: CalculatorOperation) => void;
    mathematicalOperationCallback: (operation: MathematicalOperation) => void;
}

const Keypad:React.FC<KeypadProps> = ({numberInputCallback, calculatorOperationCallback, mathematicalOperationCallback}) => {
    // console.log("Keypad rerendering");


    return (
        <div className="Keypad">
            <KeypadButton value={"7"} type={ButtonType.Standard} onClickCallback={() => numberInputCallback("7")} />
            <KeypadButton value={"8"} type={ButtonType.Standard} onClickCallback={() => numberInputCallback("8")} />
            <KeypadButton value={"9"} type={ButtonType.Standard} onClickCallback={() => numberInputCallback("9")} />
            <KeypadButton value={"DEL"} type={ButtonType.Special} onClickCallback={() => calculatorOperationCallback(CalculatorOperation.Delete)} />

            <KeypadButton value={"4"} type={ButtonType.Standard} onClickCallback={() => numberInputCallback("4")} />
            <KeypadButton value={"5"} type={ButtonType.Standard} onClickCallback={() => numberInputCallback("5")} />
            <KeypadButton value={"6"} type={ButtonType.Standard} onClickCallback={() => numberInputCallback("6")} />
            <KeypadButton value={"+"} type={ButtonType.Standard} onClickCallback={() => mathematicalOperationCallback(MathematicalOperation.Add)} />

            <KeypadButton value={"1"} type={ButtonType.Standard} onClickCallback={() => numberInputCallback("1")} />
            <KeypadButton value={"2"} type={ButtonType.Standard} onClickCallback={() => numberInputCallback("2")} />
            <KeypadButton value={"3"} type={ButtonType.Standard} onClickCallback={() => numberInputCallback("3")} />
            <KeypadButton value={"-"} type={ButtonType.Standard} onClickCallback={() => mathematicalOperationCallback(MathematicalOperation.Subtract)} />

            <KeypadButton value={"."} type={ButtonType.Standard} onClickCallback={() => numberInputCallback(".")} />
            <KeypadButton value={"0"} type={ButtonType.Standard} onClickCallback={() => numberInputCallback("0")} />
            <KeypadButton value={"/"} type={ButtonType.Standard} onClickCallback={() => mathematicalOperationCallback(MathematicalOperation.Divide)} />
            <KeypadButton value={"x"} type={ButtonType.Standard} onClickCallback={() => mathematicalOperationCallback(MathematicalOperation.Multiply)} />

            <KeypadButton value={"RESET"} type={ButtonType.Special} onClickCallback={() => calculatorOperationCallback(CalculatorOperation.Reset)} id="reset-button" />
            <KeypadButton value={"="} type={ButtonType.Equals} onClickCallback={() => calculatorOperationCallback(CalculatorOperation.Calculate)} id="equals-button" />
        </div>
    )
}

export default Keypad;