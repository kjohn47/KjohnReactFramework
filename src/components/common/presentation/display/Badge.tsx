import React, { useMemo } from 'react';
import WithTooltip, { ToolTipPosition, ToolTipColor } from '../wrapper/WithTooltip';

export enum BadgeColorEnum {
    Default = "Default",
    Danger = "Danger",
    Warning = "Warning",
    Information = "Information",
    Cancelation = "Cancelation",
    Confirmation = "Confirmation"
}

interface IBadge {
    OnClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    ClassName?: string;
    Color?: BadgeColorEnum;
    ToolTip?: {
        TooltipText: string;
        ToolTipPosition?: ToolTipPosition;
        ToolTipColor?: ToolTipColor;
        forcePosition?: boolean;
    }
    TabIndex?: number;
    OnKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

const RenderBadge: React.FC<IBadge> = ({OnClick, ClassName, children, OnKeyDown, TabIndex, Color}) => {
    const _color = useMemo(() =>Color ? `${Color}` : BadgeColorEnum.Default, [Color]);
    return (<div 
        className = { `BadgeComponent_Inner noselect BadgeComponentColor_${_color}` + 
        ( OnClick !== undefined ? ` pointer_cursor BadgeComponentColorClick_${_color}` : "" ) +
        ( ClassName ? ` ${ClassName}` : "" ) } 
        onClick = {OnClick}
        onKeyDown={OnKeyDown}
        tabIndex={TabIndex}
        >
            {children}
        </div>)
}

const Badge: React.FC<IBadge> = ({OnClick, ClassName, ToolTip, Color, children, OnKeyDown, TabIndex}) => {
 
    return <div className="BadgeComponent">
        {ToolTip ? 
            <WithTooltip toolTipText={ToolTip.TooltipText} toolTipPosition={ToolTip.ToolTipPosition} toolTipColor = {ToolTip.ToolTipColor} forcePosition= {ToolTip.forcePosition}>
                <RenderBadge {...{OnClick, ClassName, Color, children, OnKeyDown, TabIndex}}/>
            </WithTooltip> 
         : 
        <RenderBadge {...{OnClick, ClassName, Color, children, OnKeyDown, TabIndex}}/>}
        </div>
}

export default Badge;