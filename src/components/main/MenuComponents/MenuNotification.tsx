import React, { useState, useEffect, useContext } from 'react';
import Badge from '../../common/Badge';
import MenuNotificationItem from './MenuNotificationItem';
import PageSelector from '../../common/PageSelector';
import { KnownPages } from '../../../common/context/routeContextEnums';
import { ToolTipPosition, ToolTipColor } from '../../common/WithTooltip';
import { AppContext } from '../../../common/config/appConfig';
import { AppGlobalTheme } from '../../../common/context/appContextEnums';

//Fake date, should come from service
const notDate = new Date();
notDate.setDate( notDate.getDate() - 7 );
//---------------------------------------

const MenuNotification: React.FC<{reference: any}> = ({reference}) => {
    const [open, setOpen] = useState<boolean>(false);
    //mock notification list
    const [notifications, setNotifications] = useState( {
        dateFrom: notDate.toLocaleDateString(),
        unRead: 2,
        olderThanWeekUnread: 100,
        notificationList: [
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
        ]
    })
    const [appContext] = useContext(AppContext);

    const readNotifications = ( updateOld: boolean = false) => {
        if(open) {
            setNotifications({
                ...notifications,
                    unRead: 0,
                    olderThanWeekUnread: updateOld ? 0 : notifications.olderThanWeekUnread,
                    notificationList: [ ...notifications.notificationList.map((notification) => {
                        notification.isViewed = true;
                        return notification;
                    })
                ]
            })
            setOpen( false );
        }
        else 
        {
            setOpen( true );
        }
    }

    const removeNotification: ( id: number ) => void = (id) => {
        setNotifications({
            ...notifications,
            unRead: notifications.notificationList.find( n => n.id === id && !n.isViewed ) ? notifications.unRead - 1 : notifications.unRead,
            notificationList: [...notifications.notificationList.filter( n => n.id !== id )]
        })
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
    }, [ open, notifications ] )

    const getTooltipColor: () => ToolTipColor = () => {
        switch(appContext.globalTheme) {
            case (AppGlobalTheme.Green) : {
                return ToolTipColor.Green;
            }
            case (AppGlobalTheme.Red) : {
                return ToolTipColor.Red;
            }
            case (AppGlobalTheme.Pink) : {
                return ToolTipColor.Red;
            }
            case (AppGlobalTheme.Grey) : {
                return ToolTipColor.Grey;
            }
            case (AppGlobalTheme.Orange) : {
                return ToolTipColor.Yellow;
            }
            default: {
                return ToolTipColor.Blue;
            }
        }
    }

    return (
        <div ref={reference} className="MenuNotifications">
            <Badge 
                ToolTip={{
                    TooltipText: "Notifications",
                    ToolTipPosition: ToolTipPosition.Left,
                    ToolTipColor: getTooltipColor(),
                    forcePosition: true
                }}
                ClassName={ open ? "Notification_Badge_Clicked" : undefined}
                OnClick={() => readNotifications() }
                >
                {notifications.unRead}
            </Badge>
            {open && <>
                <div className="NotificationsDropArrow"/>
                <div className="NotificationsDrop KRFScroll">
                    <div className="NotificationHeader">
                        <div>Notifications List</div>
                        <div style={{fontSize: 'smaller', fontWeight: 'normal'}}>{ notifications.dateFrom + " - " + new Date().toLocaleDateString() }</div>
                    </div>
                    {
                        notifications.notificationList.map( (notification, i) => (
                            <MenuNotificationItem key={i} IsViewed = {notification.isViewed} DeleteItem = {() => {removeNotification(notification.id)}}>
                                {notification.title}
                            </MenuNotificationItem>
                        ))
                    }
                    {notifications.olderThanWeekUnread > 0 && 
                        <MenuNotificationItem>
                            <PageSelector page={KnownPages.Test} action={ () => { readNotifications(true) } } highlight>
                                <span className="NotificationOlderLink">There are <span style={{fontWeight:'bold'}}>
                                    {notifications.olderThanWeekUnread}
                                </span> unreaded notifications from dates previous to {notifications.dateFrom}, click here to check full unread list</span>
                            </PageSelector>
                        </MenuNotificationItem>}
                    <div className="NotificationViewAll">
                        <PageSelector className="NotificationViewAllLink" page={KnownPages.Test}  action={ () => { readNotifications(true) }} highlight >View All</PageSelector>
                    </div>
                </div>
            </>}
        </div>
    )
}

export default MenuNotification;