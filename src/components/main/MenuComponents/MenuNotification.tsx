import React, { useState, useEffect } from 'react';
import Badge from '../../common/Badge';
import { ToolTipPosition, ToolTipColor } from '../../common/WithTooltip';
import MenuNotificationItem from './MenuNotificationItem';
import PageSelector from '../../common/PageSelector';
import { KnownPages } from '../../../common/context/routeContextEnums';

const MenuNotification: React.FC<{reference: any}> = ({reference}) => {
    const [open, setOpen] = useState<boolean>(false);
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "Test 1",
            isViewed: false
        },
        {
            id: 2,
            title: "Test 2",
            isViewed: false
        },
        {
            id: 3,
            title: "Test 3",
            isViewed: true
        },
        {
            id: 4,
            title: "Test 4",
            isViewed: true
        }
    ])

    const readNotifications = () => {
        if(open) {
            setNotifications([
                ...notifications.map((notification) => {
                    notification.isViewed = true;
                    return notification;
                })
            ])
            setOpen( false );
        }
        else 
        {
            setOpen( true );
        }
    }

    const handleClickOut: ( event: any ) => void = ( event ) => {
        if ( open && ( reference != null && reference.current !== null && !reference.current.contains( event.target ) ) ) {
            readNotifications();
        }
    }

    useEffect( () => {
        // add when mounted
        document.addEventListener( "mousedown", handleClickOut );
        // return function to be called when unmounted
        return () => {
            document.removeEventListener( "mousedown", handleClickOut );
        };
        //eslint-disable-next-line
    }, [ open ] )

    return (
        <div ref={reference} className="MenuNotifications">
            <Badge 
                ToolTip={{
                    TooltipText: "Notifications",
                    ToolTipPosition: ToolTipPosition.Left,
                    ToolTipColor: ToolTipColor.Blue,
                    forcePosition: true
                }}
                ClassName={ open ? "Notification_Badge_Clicked" : undefined}
                OnClick={() => readNotifications() }
                >
                {notifications.filter( x => !x.isViewed ).length}
            </Badge>
            {open && <>
                <div className="NotificationsDropArrow"/>
                <div className="NotificationsDrop">
                    {
                        notifications.map( (notification, i) => (
                            <MenuNotificationItem key={i}>
                                {notification.title}
                            </MenuNotificationItem>
                        ))
                    }
                    <div>
                        <PageSelector page={KnownPages.Test}>Ver Todas</PageSelector>
                    </div>
                </div>
            </>}
        </div>
    )
}

export default MenuNotification;