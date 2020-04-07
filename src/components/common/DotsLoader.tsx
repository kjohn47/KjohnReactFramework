import React from 'react';

export enum DotsLoaderSize {
    Small = "Small",
    Medium = "Medium",
    Big = "Big"
}

export enum DotsLoaderNrBall {
    One,
    Two,
    Three
}

export enum DotsLoaderColor {
    Black = "Black",
    Grey = "Grey",
    White = "White"
}

interface IDotsLoaderProps {
    Size?: DotsLoaderSize,
    DotsNumber?: DotsLoaderNrBall,
    Color?: DotsLoaderColor
}

const DotsLoader: React.FC<IDotsLoaderProps> = ({
    Color = DotsLoaderColor.Black,
    DotsNumber = DotsLoaderNrBall.One,
    Size = DotsLoaderSize.Medium
}) => {
    return (
        <div className="BallLoaderComponent">
            &nbsp;
            <div className={"ball-loader ball-loader_" + Size + " ball-loader_" + Color}>
                <div className="ball-loader-ball ball1" />
                { ( DotsNumber === DotsLoaderNrBall.Two || DotsNumber ===  DotsLoaderNrBall.Three ) && <div className="ball-loader-ball ball2" />}
                { DotsNumber ===  DotsLoaderNrBall.Three && <div className="ball-loader-ball ball3" />}
            </div>
        </div>
    )
}

export default DotsLoader;