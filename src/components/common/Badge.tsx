import React from 'react';
import WithTooltip, { ToolTipPosition, ToolTipColor } from './WithTooltip';

interface IBadge {
    OnClick?: () => void;
    ClassName?: string;
    Color?: string;
    ToolTip?: {
        TooltipText: string;
        ToolTipPosition?: ToolTipPosition;
        ToolTipColor?: ToolTipColor;
        forcePosition?: boolean;
    }
}

const Badge: React.FC<IBadge> = ({OnClick, ClassName, ToolTip, Color, children}) => {
    const RenderBadge: React.FC = () => <div className = { "BadgeComponent noselect" + ( ClassName ? ` ${ClassName}` : "" ) } onClick = {OnClick}>{children}</div>
 
    return ToolTip ? 
        <div>
            <WithTooltip toolTipText={ToolTip.TooltipText} toolTipPosition={ToolTip.ToolTipPosition} toolTipColor = {ToolTip.ToolTipColor} forcePosition= {ToolTip.forcePosition}>
                <RenderBadge />
            </WithTooltip> 
        </div> : 
        <RenderBadge />
    
}

export default Badge;