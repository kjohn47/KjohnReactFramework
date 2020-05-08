import { useState, useEffect } from 'react';
import { useServiceCaller } from '../../logic/services/serviceCaller';
import { IuseNotificationReturn, INotificationRequest, INotifications } from './NotificationInterfaces';
import { NotificationRequestType } from './NotificationEnum';
import { useNotificationHandler } from './NotificationServiceHandler';

export const useNotificationService: ( IsMenu: boolean ) => IuseNotificationReturn = ( IsMenu = false) => {
    const {NotificationHandler} = useNotificationHandler(IsMenu);
    const {serviceResponse, serviceHandler, serviceLoading} = useServiceCaller<INotificationRequest, INotifications>( {service: NotificationHandler, localLoading: true, ignoreAbortError: true } );
    const [started, setStarted] = useState<boolean>(false);

    const ReadCurrent: () => void = () => {
        serviceHandler({
            Type: NotificationRequestType.ReadCurrent
        })
    };

    const ReadAll: () => void = () => {
        serviceHandler({
            Type: NotificationRequestType.ReadAll
        })
    };

    const GetNotifications: () => void = () => {
        serviceHandler({
            Type: NotificationRequestType.Get
        })
    };

    const DeleteNotification: (id: string) => void = ( id ) => {
        serviceHandler({
            Type: NotificationRequestType.Delete,
            ID: id
        })
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
        Notifications: serviceResponse,
        Loading: serviceLoading,
        ReadCurrent,
        ReadAll,
        GetNotifications,
        DeleteNotification
    }
}