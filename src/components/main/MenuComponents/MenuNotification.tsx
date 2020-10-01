import React, { useState, useEffect, useRef, useCallback } from 'react';
import Badge from '../../common/presentation/display/Badge';
import MenuNotificationItem from './MenuNotificationItem';
import PageSelector from '../../common/inputs/PageSelector';
import { ToolTipPosition, ToolTipColor } from '../../common/presentation/wrapper/WithTooltip';
import { AppGlobalTheme } from '../../../logic/context/App/appContextEnums';
import useTranslation from '../../../logic/functions/getTranslation';
import { useNotificationService } from '../../../services/Notifications/NotificationServices';
import DotsLoader, { DotsLoaderNrBall, DotsLoaderSize, DotsLoaderColor } from '../../common/presentation/loading/DotsLoader';
import useAppHandler from '../../../logic/context/App/AppContextHandler';
import useAppLanguageHandler from '../../../logic/context/App/AppLanguageContextHandler';
import { handleClickOutDiv } from '../../../logic/functions/misc';

const MenuNotification: React.FC<{reference: any, Route: string; RefreshTime?: number}> = ({reference, Route, RefreshTime}) => {
    const appContext = useAppHandler().App;
    const {appLanguage}= useAppLanguageHandler();
    const {getTranslation} = useTranslation();
    const [open, setOpen] = useState<boolean>(false);
    const refreshTimerId = useRef<NodeJS.Timeout | undefined>(undefined);
    const NotificationsService = useNotificationService(true);
    const NotificationsServiceRef = useRef(NotificationsService);

    const readNotifications = ( updateOld: boolean = false) => {
        if(open) {
            if( !NotificationsService.Loading )
                updateOld ? NotificationsService.ReadAll() : NotificationsService.ReadCurrent();
            setOpen( false );
        }
        else 
        {
            if( !NotificationsService.Loading )
                setOpen( true );
        }
    }

    const removeNotification: ( id: string ) => void = (id) => {
        if( !NotificationsService.Loading )
            NotificationsService.DeleteNotification(id);
    }

    const handleClickOutNotifMenu = useCallback( (event: any) => 
        handleClickOutDiv(event, reference, open, () => readNotifications() 
        //eslint-disable-next-line
        ), [open, NotificationsService]);

    useEffect( () => {
        return () => {
            if ( refreshTimerId.current !== undefined )
            {
                clearInterval(refreshTimerId.current);
                refreshTimerId.current = undefined;
            }
        };
    }, [])

    useEffect( () => {
        NotificationsServiceRef.current = NotificationsService;
    }, [NotificationsService, NotificationsServiceRef])

    useEffect( () => {
        // add when mounted
        document.addEventListener( "mousedown", handleClickOutNotifMenu );
        // return function to be called when unmounted
        return () => {
            document.removeEventListener( "mousedown", handleClickOutNotifMenu );
        };
    }, [ handleClickOutNotifMenu ] )

    useEffect( () => {
        if( RefreshTime && RefreshTime > 0 )
        {
            if( !open && refreshTimerId.current === undefined )
            {
                refreshTimerId.current = setInterval( () => {
                    if( !NotificationsServiceRef.current.Loading ) {
                        NotificationsServiceRef.current.GetNotifications();
                    }
                }, RefreshTime );
            }
            else if( open && refreshTimerId.current !== undefined )
            {
                clearInterval(refreshTimerId.current);
                refreshTimerId.current = undefined;
            }
        }
    }, [ RefreshTime, open, refreshTimerId, NotificationsServiceRef ] )

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
                { (NotificationsService.Loading || !NotificationsService.Notifications ) ?
                        <div style={{paddingLeft: "6px"}}>
                            <DotsLoader DotsNumber={DotsLoaderNrBall.Two} Size={DotsLoaderSize.Small} Color={DotsLoaderColor.White}/>
                        </div>
                        : NotificationsService.Notifications.UnreadCount}
            </Badge>
            {open && <>
                <div className="NotificationsDropArrow"/>
                <div className="NotificationsDrop KRFScroll">
                    <div className="NotificationHeader">
                        <div>
                            {getTranslation("_notificationMenu", "#(NotificationHeader)")}
                        </div>
                        <div style={{fontSize: 'smaller', fontWeight: 'normal'}}>
                            {getTranslation("_notificationMenu", "#(FromDateToDate)", NotificationsService.Notifications ? [ NotificationsService.Notifications.From, NotificationsService.Notifications.To ] : ["", ""])}
                        </div>
                    </div>
                    {
                        NotificationsService.Notifications && NotificationsService.Notifications.Notifications.map( (notification, i) => (
                            <MenuNotificationItem 
                                key={i + "#" + notification.ID} 
                                IsViewed = {notification.IsViewed} 
                                DeleteItem = {() => {removeNotification(notification.ID)}}
                                Loading = {NotificationsService.Loading}
                            >
                                {notification.Text[appLanguage] !== undefined ? notification.Text[appLanguage] : ""}
                            </MenuNotificationItem>
                        ))
                    }
                    {NotificationsService.Notifications && NotificationsService.Notifications.OlderUnreadCount > 0 && 
                        <MenuNotificationItem>
                            <PageSelector page={`${Route}?unreadOnly=true`} action={ () => { readNotifications(true) } } highlight>
                                <span className="NotificationOlderLink">
                                    {getTranslation("_notificationMenu", "#(OldUnreadedNotification)",[NotificationsService.Notifications.OlderUnreadCount.toString(), NotificationsService.Notifications.From])}
                                </span>
                            </PageSelector>
                        </MenuNotificationItem>}
                    <div className="NotificationViewAll">
                        <PageSelector className="NotificationViewAllLink" page={Route}  action={ () => { readNotifications(true) }} highlight >
                            {getTranslation("_notificationMenu", "#(ViewAll)")}
                        </PageSelector>
                    </div>
                </div>
            </>}
        </div>
    )
}

export default MenuNotification;