import React from 'react';
import useWindowSize from '../../../../logic/functions/windowResize';
import { mobileWidth } from '../../../../logic/config/configuration';

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
    forcePosition?: boolean;
}

const WithTooltip: React.FC<ITooltipProps> = ( props ) => {
    const [ width ] = useWindowSize();

    let css = "ToolTip_Text " + ( props.toolTipPosition && (props.forcePosition || width > mobileWidth) ? props.toolTipPosition : "ToolTip_Text_Bottom" ) + " " + ( props.toolTipColor ? props.toolTipColor : "ToolTip_Text_Default" );
    let toolTipContainerCss = "ToolTip";
    toolTipContainerCss = props.className !== undefined ? toolTipContainerCss + " " + props.className : toolTipContainerCss;
    const childOnTop: boolean = props.toolTipPosition === undefined || (!props.forcePosition && width < mobileWidth) || props.toolTipPosition === ToolTipPosition.Bottom || props.toolTipPosition === ToolTipPosition.Right;
    return (
        <div className={ toolTipContainerCss }>
            { childOnTop && props.children }
            <span className={ css } >{ props.toolTipText }</span>
            { !childOnTop && props.children }
        </div>
    );
}

export default WithTooltip;