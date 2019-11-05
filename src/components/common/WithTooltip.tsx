import React from 'react';
import "../../styles/Tooltip.css";

export enum ToolTipPosition {
    Left,
    Right,
    Top,
    Bottom
}

export enum ToolTipColor {
    Default,
    Red,
    Blue,
    Yellow,
    Green,
    Grey
}

interface ITooltipProps {
    toolTipText: string;
    toolTipPosition?: ToolTipPosition;
    toolTipColor?: ToolTipColor;
    className?: string;
}

const getToolTipPosition: ( position?: ToolTipPosition ) => string = ( position ) => {
    switch( position )
    {
        case ToolTipPosition.Left: 
            return "ToolTip_Text_Left";
        case ToolTipPosition.Right: 
            return "ToolTip_Text_Right";
        case ToolTipPosition.Bottom: 
            return "ToolTip_Text_Bottom";
        default:
            return "ToolTip_Text_Top";
    }
}

const getToolTipColor: ( color?: ToolTipColor ) => string = ( color ) => {
    switch( color )
    {
        case ToolTipColor.Red:
            return " ToolTip_Text_Red";
        case ToolTipColor.Blue:
            return " ToolTip_Text_Blue";
        case ToolTipColor.Green:
            return " ToolTip_Text_Green";
        case ToolTipColor.Yellow:
            return " ToolTip_Text_Yellow";
        case ToolTipColor.Grey:
            return " ToolTip_Text_Grey";
        default:
            return "";
    }
}

const WithTooltip: React.FC<ITooltipProps> = ( props ) => {
    let css = "ToolTip_Text " + getToolTipPosition( props.toolTipPosition ) + getToolTipColor( props.toolTipColor );
    let toolTipContainerCss = "ToolTip";
    toolTipContainerCss = props.className !== undefined ? toolTipContainerCss + " " + props.className : toolTipContainerCss;
    return(
        <div className = { toolTipContainerCss }>
            {props.children}
            <span className = { css } >{ props.toolTipText }</span>
        </div>
    );
}

export default WithTooltip;