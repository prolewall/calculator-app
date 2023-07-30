import React from 'react';
import './display.scss';

interface DisplayProps {
    currentValue: string;
}

const Display:React.FC<DisplayProps> = ({currentValue}) => {
    return (
        <div className="Display">
            <p className="Display-currentValue">{currentValue}</p>
        </div>
    );
}

export default Display;