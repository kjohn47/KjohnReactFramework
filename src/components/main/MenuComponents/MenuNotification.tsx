import React, { useState, useEffect, useContext } from 'react';
import Badge from '../../common/Badge';
import MenuNotificationItem from './MenuNotificationItem';
import PageSelector from '../../common/PageSelector';
import { KnownPages } from '../../../common/context/routeContextEnums';
import { ToolTipPosition, ToolTipColor } from '../../common/WithTooltip';
import { AppContext, AppLanguageContext } from '../../../common/config/appConfig';
import { AppGlobalTheme, AppLanguage } from '../../../common/context/appContextEnums';
import useTranslation from '../../../common/context/pageText/getTranslation';
import { useNotificationService } from '../../../Services/NotificationServices';
import DotsLoader, { DotsLoaderNrBall, DotsLoaderSize, DotsLoaderColor } from '../../common/DotsLoader';

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
    const NotificationsService = useNotificationService(true);

    const readNotifications = ( updateOld: boolean = false) => {
        if(open) {
            if( !NotificationsService.Loading )
                updateOld ? NotificationsService.ReadAll() : NotificationsService.ReadCurrent();
            setOpen( false );
        }
        else 
        {
            setOpen( true );
        }
    }

    const removeNotification: ( id: string ) => void = (id) => {
        if( !NotificationsService.Loading )
            NotificationsService.DeleteNotification(id);
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
    }, [ open, NotificationsService ] )

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
                        <div style={{paddingLeft: "5px"}}>
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
                                key={i} 
                                IsViewed = {notification.IsViewed} 
                                DeleteItem = {() => {removeNotification(notification.ID)}}
                                Loading = {NotificationsService.Loading}
                            >
                                {notification.Text[appLanguage] !== undefined ? notification.Text[appLanguage] : notification.Text[AppLanguage.PT]}
                            </MenuNotificationItem>
                        ))
                    }
                    {NotificationsService.Notifications && NotificationsService.Notifications.OlderUnreadCount > 0 && 
                        <MenuNotificationItem>
                            <PageSelector page={KnownPages.Test} action={ () => { readNotifications(true) } } highlight>
                                <span className="NotificationOlderLink">
                                    {getTranslation("_notificationMenu", "#(OldUnreadedNotification)",[NotificationsService.Notifications.OlderUnreadCount.toString(), NotificationsService.Notifications.From])}
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