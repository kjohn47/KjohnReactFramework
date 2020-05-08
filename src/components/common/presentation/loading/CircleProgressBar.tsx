import React from 'react';

export enum CPBSize {
    Small,
    Medium,
    Big
}

export interface ICircleProgressBarProps {
    size: CPBSize;
    progress: number;
}

const getBoxSize = ( size: CPBSize ) => {
    switch( size ) {
        case CPBSize.Small: {
            return 50;
        }
        case CPBSize.Medium: {
            return 100;
        }
        case CPBSize.Big: {
            return 160;
        }
    }
}

const getBarWidth = ( size: CPBSize ) => {
    switch( size ) {
        case CPBSize.Small: {
            return 6;
        }
        case CPBSize.Medium: {
            return 10;
        }
        case CPBSize.Big: {
            return 18;
        }
    }
}


const getTextSize = ( size: CPBSize ) => {
    switch( size ) {
        case CPBSize.Small: {
            return 12;
        }
        case CPBSize.Medium: {
            return 24;
        }
        case CPBSize.Big: {
            return 48;
        }
    }
}


const CircleProgressBar: React.FC<ICircleProgressBarProps> = ({size, progress}) => {
    const correctedProgress = progress < 0 ? 0 : progress > 100 ? 100 : progress;
    const boxSize = getBoxSize(size);
    const barWidth = getBarWidth(size);
    const radius = (boxSize - barWidth) / 2;
    const viewBox = `0 0 ${boxSize} ${boxSize}`;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - dashArray * correctedProgress / 100;

    return(
        <div className = "CircleProgressBar">
            <svg
                width={boxSize}
                height={boxSize}
                viewBox={viewBox}
                >
                <circle
                    className="CPBBackground"
                    cx={boxSize / 2}
                    cy={boxSize / 2}
                    r={radius}
                    strokeWidth={`${barWidth}px`} 
                />
                <circle
                    className="CPBProgress"
                    cx={boxSize / 2}
                    cy={boxSize / 2}
                    r={radius}
                    strokeWidth={`${barWidth}px`}
                    transform={`rotate(-90 ${boxSize / 2} ${boxSize / 2})`}
                    style={{
                        strokeDasharray: dashArray,
                        strokeDashoffset: dashOffset
                    }} 
                />
                <text
                    className="CPBText"
                    style = {{
                        fontSize: getTextSize(size)
                    }}
                    x="50%"
                    y="50%"
                    dy=".3em"
                    textAnchor="middle"
                >
                    {`${correctedProgress}%`}
                </text>
            </svg>
        </div>
    )
}
 

export default CircleProgressBar;