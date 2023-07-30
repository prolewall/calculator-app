import './keypad.scss';
import KeypadButton, { ButtonType } from './KeypadButton';

const Keypad = () => {
    return (
        <div className="Keypad">
            <KeypadButton value={"7"} type={ButtonType.Standard} onClickCallback={() => {}} />
            <KeypadButton value={"8"} type={ButtonType.Standard} onClickCallback={() => {}} />
            <KeypadButton value={"9"} type={ButtonType.Standard} onClickCallback={() => {}} />
            <KeypadButton value={"DEL"} type={ButtonType.Special} onClickCallback={() => {}} />

            <KeypadButton value={"4"} type={ButtonType.Standard} onClickCallback={() => {}} />
            <KeypadButton value={"5"} type={ButtonType.Standard} onClickCallback={() => {}} />
            <KeypadButton value={"6"} type={ButtonType.Standard} onClickCallback={() => {}} />
            <KeypadButton value={"+"} type={ButtonType.Standard} onClickCallback={() => {}} />

            <KeypadButton value={"1"} type={ButtonType.Standard} onClickCallback={() => {}} />
            <KeypadButton value={"2"} type={ButtonType.Standard} onClickCallback={() => {}} />
            <KeypadButton value={"3"} type={ButtonType.Standard} onClickCallback={() => {}} />
            <KeypadButton value={"-"} type={ButtonType.Standard} onClickCallback={() => {}} />

            <KeypadButton value={"."} type={ButtonType.Standard} onClickCallback={() => {}} />
            <KeypadButton value={"0"} type={ButtonType.Standard} onClickCallback={() => {}} />
            <KeypadButton value={"/"} type={ButtonType.Standard} onClickCallback={() => {}} />
            <KeypadButton value={"x"} type={ButtonType.Standard} onClickCallback={() => {}} />

            <KeypadButton value={"RESET"} type={ButtonType.Special} onClickCallback={() => {}} id="reset-button" />
            <KeypadButton value={"="} type={ButtonType.Equals} onClickCallback={() => {}} id="equals-button" />
        </div>
    )
}

export default Keypad;