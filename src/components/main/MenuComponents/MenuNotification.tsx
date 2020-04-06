import React, { useState, useEffect, useContext } from 'react';
import Badge from '../../common/Badge';
import MenuNotificationItem from './MenuNotificationItem';
import PageSelector from '../../common/PageSelector';
import { KnownPages } from '../../../common/context/routeContextEnums';
import { ToolTipPosition, ToolTipColor } from '../../common/WithTooltip';
import { AppContext, AppLanguageContext } from '../../../common/config/appConfig';
import { AppGlobalTheme, AppLanguage } from '../../../common/context/appContextEnums';
import useTranslation from '../../../common/context/pageText/getTranslation';

//Fake date, should come from service
const notDate = new Date();
notDate.setDate( notDate.getDate() - 7 );
//---------------------------------------

const MenuNotification: React.FC<{reference: any}> = ({reference}) => {
    const [appContext] = useContext(AppContext);
    const [appLanguage] = useContext(AppLanguageContext);
    const {getTranslation} = useTranslation();
    const [open, setOpen] = useState<boolean>(false);
    //mock notification list
    const [notifications, setNotifications] = useState( {
        dateFrom: notDate.toLocaleDateString(),
        unRead: 2,
        olderThanWeekUnread: 100,
        notificationList: [
            {
                id: 1,
                title: {
                    [AppLanguage.PT]: "Teste 1",
                    [AppLanguage.EN]: "Test 1"
                },
                isViewed: false
            },
            {
                id: 2,
                title: {
                    [AppLanguage.PT]: "Teste 2",
                    [AppLanguage.EN]: "Test 2"
                },
                isViewed: false
            },
            {
                id: 3,
                title: {
                    [AppLanguage.PT]: "Teste 3",
                    [AppLanguage.EN]: "Test 3"
                },
                isViewed: true
            },
            {
                id: 4, 
                title: {
                    [AppLanguage.PT]: "Teste 4",
                    [AppLanguage.EN]: "Test 4"
                },
                isViewed: true
            }
        ]
    })

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
                    TooltipText: getTranslation("_notificationMenu", "#(Tooltip)"),
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
                        <div>
                            {getTranslation("_notificationMenu", "#(NotificationHeader)")}
                        </div>
                        <div style={{fontSize: 'smaller', fontWeight: 'normal'}}>
                            {getTranslation("_notificationMenu", "#(FromDateToDate)", [notifications.dateFrom, new Date().toLocaleDateString()])}
                        </div>
                    </div>
                    {
                        notifications.notificationList.map( (notification, i) => (
                            <MenuNotificationItem key={i} IsViewed = {notification.isViewed} DeleteItem = {() => {removeNotification(notification.id)}}>
                                {notification.title[appLanguage] !== undefined ? notification.title[appLanguage] : notification.title[AppLanguage.PT]}
                            </MenuNotificationItem>
                        ))
                    }
                    {notifications.olderThanWeekUnread > 0 && 
                        <MenuNotificationItem>
                            <PageSelector page={KnownPages.Test} action={ () => { readNotifications(true) } } highlight>
                                <span className="NotificationOlderLink">
                                    {getTranslation("_notificationMenu", "#(OldUnreadedNotification)",[notifications.olderThanWeekUnread.toString(), notifications.dateFrom])}
                                </span>
                            </PageSelector>
                        </MenuNotificationItem>}
                    <div className="NotificationViewAll">
                        <PageSelector className="NotificationViewAllLink" page={KnownPages.Test}  action={ () => { readNotifications(true) }} highlight >
                            {getTranslation("_notificationMenu", "#(ViewAll)")}
                        </PageSelector>
                    </div>
                </div>
            </>}
        </div>
    )
}

export default MenuNotification;