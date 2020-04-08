import { useState, useEffect } from 'react';
import { useServiceCaller } from '../../common/services/serviceCaller';
import { IuseNotificationReturn, INotificationRequest, INotifications } from './NotificationInterfaces';
import { NotificationRequestType } from './NotificationEnum';
import { useNotificationHandler } from './NotificationServiceHandler';

export const useNotificationService: ( IsMenu: boolean ) => IuseNotificationReturn = ( IsMenu = false) => {
    const {NotificationHandler} = useNotificationHandler(IsMenu);
    const [Notifications, Service] = useServiceCaller<INotificationRequest, INotifications>(NotificationHandler, undefined, true);
    const [started, setStarted] = useState<boolean>(false);
    const [Loading, setLoading] = useState<boolean>(false);

    const ReadCurrent: () => void = () => {
        setLoading(true);
        Service({
            Type: NotificationRequestType.ReadCurrent
        }).then(() => setLoading(false))
    };

    const ReadAll: () => void = () => {
        setLoading(true);
        Service({
            Type: NotificationRequestType.ReadAll
        }).then(() => setLoading(false))
    };

    const GetNotifications: () => void = () => {
        setLoading(true);
        Service({
            Type: NotificationRequestType.Get
        }).then(() => setLoading(false))
    };

    const DeleteNotification: (id: string) => void = ( id ) => {
        setLoading(true);
        Service({
            Type: NotificationRequestType.Delete,
            ID: id
        }).then(() => setLoading(false))
    };

    useEffect( () => {
        if(!started)
        {
            GetNotifications();
            setStarted(true);
        }
        //eslint-disable-next-line
    }, [started])
    
    return {
        Notifications,
        Loading,
        ReadCurrent,
        ReadAll,
        GetNotifications,
        DeleteNotification
    }
}