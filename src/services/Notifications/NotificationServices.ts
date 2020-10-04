import { useState, useEffect } from 'react';
import { useServiceCaller } from '../../logic/services/serviceCaller';
import { IuseNotificationReturn, INotificationRequest, INotifications } from './NotificationInterfaces';
import { NotificationRequestType } from './NotificationEnum';
import { useNotificationHandler } from './NotificationServiceHandler';

export const useNotificationService: ( IsMenu: boolean ) => IuseNotificationReturn = ( IsMenu = false) => {
    const {NotificationHandler} = useNotificationHandler(IsMenu);
    const {serviceResponse, serviceHandler, serviceLoading} = useServiceCaller<INotificationRequest, INotifications>({
        service: NotificationHandler, 
        localLoading: true, 
        ignoreAbortError: true 
    } );
    const [started, setStarted] = useState<boolean>(false);

    const ReadCurrent = (Id?: string, callback?: () => void): void => {
        serviceHandler({
            Type: NotificationRequestType.ReadCurrent,
            ID: Id
        }).finally(() => {
            callback && callback();
        })
    };

    const ReadAll = (callback?: () => void): void => {
        serviceHandler({
            Type: NotificationRequestType.ReadAll
        }).finally(() => {
            callback && callback();
        })
    };

    const GetNotifications = (callback?: () => void): void => {
        serviceHandler({
            Type: NotificationRequestType.Get
        }).finally(() => {
            callback && callback();
        })
    };

    const DeleteNotification = (id: string, callback?: () => void): void => {
        serviceHandler({
            Type: NotificationRequestType.Delete,
            ID: id
        }).finally(() => {
            callback && callback();            
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