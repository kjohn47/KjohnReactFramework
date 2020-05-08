import React from 'react';

export enum BallonArrowEnum {
    Top = "Top",
    Bottom = "Bottom",
    Left = "Left",
    Right = "Right"
}

export enum BalloonColorEnum {
    Danger = "Danger",
    Warning = "Warning",
    Confirmation = "Confirmation",
    Cancelation = "Cancelation",
    Information = "Information",
    Default = "Default"
}

export interface IBalloonProps {
    Close?: () => void;
    Arrow?: BallonArrowEnum;
    Color?: BalloonColorEnum;
    IsFloating?: boolean;
    Title?: string;
    IsVisible?: boolean;
}

const Balloon: React.FC<IBalloonProps> = (props) => {
    return (
        (!props.IsFloating || ( props.IsFloating && props.IsVisible) ) ?
        <div className = {"BalloonComponent"}>
            <div className={ "Balloon" + 
                ( props.IsFloating ? 
                  " BalloonFloat" + 
                        (props.Arrow ? 
                            " BalloonFloat_" + 
                                props.Arrow : "") : "" ) + 
                        ( props.Arrow ? 
                            " BalloonArrow BalloonArrow_" + 
                                props.Arrow : "" ) +
                        (props.Color ? 
                            " Balloon_" + props.Color : "" )
                }>
                { 
                    ( props.Title || ( props.Close && props.IsFloating ) ) && 
                    <div className="BalloonTitle">
                        {props.Title}
                    </div>
                }
                {
                    props.Close && props.IsFloating && 
                    <div className="BalloonClose">
                        <span onClick = {() => props.Close && props.Close()}>X</span>
                    </div>
                }
                <div className="BalloonContent">
                    {props.children}
                </div>
            </div>
        </div>
        : null
    )
}

export default Balloon;