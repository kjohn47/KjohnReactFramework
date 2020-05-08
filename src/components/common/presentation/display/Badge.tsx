import React from 'react';
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
    OnClick?: () => void;
    ClassName?: string;
    Color?: BadgeColorEnum;
    ToolTip?: {
        TooltipText: string;
        ToolTipPosition?: ToolTipPosition;
        ToolTipColor?: ToolTipColor;
        forcePosition?: boolean;
    }
}

const Badge: React.FC<IBadge> = ({OnClick, ClassName, ToolTip, Color, children}) => {
    const _color = Color ? `${Color}` : BadgeColorEnum.Default;
    const RenderBadge: React.FC = () => <div 
                        className = { `BadgeComponent_Inner noselect BadgeComponentColor_${_color}` + 
                        ( OnClick !== undefined ? ` pointer_cursor BadgeComponentColorClick_${_color}` : "" ) +
                        ( ClassName ? ` ${ClassName}` : "" ) } 
                        onClick = {OnClick}
                        >
                            {children}
                        </div>
 
    return <div className="BadgeComponent">
        {ToolTip ? 
            <WithTooltip toolTipText={ToolTip.TooltipText} toolTipPosition={ToolTip.ToolTipPosition} toolTipColor = {ToolTip.ToolTipColor} forcePosition= {ToolTip.forcePosition}>
                <RenderBadge />
            </WithTooltip> 
         : 
        <RenderBadge />}
        </div>
}

export default Badge;