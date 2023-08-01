import React, {useMemo} from 'react';
import './display.scss';
import { MathematicalOperation } from '../../constants/operationConstants';

interface DisplayProps {
    currentInput: string;
    previousResult?: string;
    previousInput?: string;
    operation?: MathematicalOperation;
}

function getTextWidth(canvas: HTMLCanvasElement, text: string): number{
    const context = canvas.getContext("2d") ?? new CanvasRenderingContext2D();
    const metrics = context.measureText(text);
    return metrics.width;
  }

const Display:React.FC<DisplayProps> = ({currentInput, previousResult, previousInput, operation}) => {

    const calculationString = `${previousResult ?? ""} ${operation ?? ""}${previousInput !== undefined ? ` ${previousInput} =` : ""}`
    const canvas = useMemo(() => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (context) {
            context.font = "bold 50px League Spartan";
        }
        return canvas;
    }, []);

    const inputWidth = getTextWidth(canvas, currentInput);
    console.log(`width: ${inputWidth}`);

    return (
        <div className="Display">
            <p className="Display__calculation" >{calculationString}</p>
            <p className="Display__currentInput">{currentInput}</p>
        </div>
    );
}

export default Display;