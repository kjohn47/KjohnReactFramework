import React from 'react';
import useWindowSize from '../../common/functions/windowResize';
import { mobileWidth } from '../../common/config/configuration';

export enum ToolTipPosition {
    Left = "ToolTip_Text_Left",
    Right = "ToolTip_Text_Right",
    Top = "ToolTip_Text_Top",
    Bottom = "ToolTip_Text_Bottom"
}

export enum ToolTipColor {
    Default = "ToolTip_Text_Default",
    Red = "ToolTip_Text_Red",
    Blue = "ToolTip_Text_Blue",
    Yellow = "ToolTip_Text_Yellow",
    Green = "ToolTip_Text_Green",
    Grey = "ToolTip_Text_Grey"
}

interface ITooltipProps {
    toolTipText: string;
    toolTipPosition?: ToolTipPosition;
    toolTipColor?: ToolTipColor;
    className?: string;
}

const WithTooltip: React.FC<ITooltipProps> = ( props ) => {
    const [ width ] = useWindowSize();
    
    let css = "ToolTip_Text " + ( props.toolTipPosition && width > mobileWidth ? props.toolTipPosition : "ToolTip_Text_Bottom" ) + " " + ( props.toolTipColor ? props.toolTipColor : "ToolTip_Text_Default" );
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