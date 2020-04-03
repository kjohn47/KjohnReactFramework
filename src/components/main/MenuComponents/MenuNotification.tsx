import React from 'react';
import Badge from '../../common/Badge';
import { ToolTipPosition, ToolTipColor } from '../../common/WithTooltip';

const MenuNotification: React.FC<{reference: any}> = ({reference}) => {
    
    return (
            <div ref={reference} className="MenuNotifications">
                <Badge 
                    ClassName="pointer_cursor" 
                    ToolTip={{
                        TooltipText: "Notifications",
                        ToolTipPosition: ToolTipPosition.Left,
                        ToolTipColor: ToolTipColor.Blue,
                        forcePosition: true
                    }}>
                    10
                </Badge>
            </div>
    )
}

export default MenuNotification;