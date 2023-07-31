import React from 'react';
import './display.scss';
import { MathematicalOperation } from '../../constants/operationConstants';

interface DisplayProps {
    currentInput: string;
    previousResult?: string;
    previousInput?: string;
    operation?: MathematicalOperation;
}

const Display:React.FC<DisplayProps> = ({currentInput, previousResult, previousInput, operation}) => {

    const calculationString = `${previousResult ?? ""} ${operation ?? ""}${previousInput !== undefined ? ` ${previousInput} =` : ""}`

    return (
        <div className="Display">
            <p className="Display__calculation">{calculationString}</p>
            <p className="Display__currentInput">{currentInput}</p>
        </div>
    );
}

export default Display;