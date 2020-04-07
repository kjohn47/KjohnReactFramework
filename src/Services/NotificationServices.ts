import { useState, useEffect } from 'react';
import { IDictionary, delayedPromise } from '../common/functions/misc';
import { ServiceType, IServiceError } from '../common/services/serviceCallerInterfaces';
import { useServiceCaller } from '../common/services/serviceCaller';
//import { useFetchGetHandler, useFetchPostHandler } from '../common/services/fetchHandler';
import { AppLanguage } from '../common/context/appContextEnums';

export interface INotificationItem {
    ID: string;
    Text: IDictionary<string>;
    IsViewed: boolean
}

export interface INotifications {
    From: string;
    To: string;
    UnreadCount: number;
    OlderUnreadCount: number;
    Notifications: INotificationItem[];
}

enum NotificationRequestType {
    Get,
    ReadCurrent,
    ReadAll,
    Delete
}

interface INotificationRequest {
    Type: NotificationRequestType;
    ID?: string;
}

interface INotificationPostBody {
    ID?: string;
}

interface IuseNotificationReturn {
    Notifications?: INotifications,
    Loading: boolean;
    ReadCurrent: () => void;
    ReadAll: () => void;
    GetNotifications: () => void;
    DeleteNotification: (id: string) => void;
}

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

const useNotificationHandler = ( IsMenu: boolean ) => {
    //const [isMenuQuery] = useState<string>(IsMenu ? "?ismenu=true" : "?ismenu=false");
    //const GetData = useFetchGetHandler<INotifications>("/Notifications");
    //const PostData = useFetchPostHandler<INotificationPostBody, INotifications>("/Notifications");

    const NotificationHandler: ServiceType<INotificationRequest, INotifications> = async ( context, request, response ) => {
        const defaultResponse = response ? response : {
            From: "",
            To: "",
            OlderUnreadCount: 0,
            UnreadCount: 0,
            Notifications: []
        };

        if(request) {
            switch(request.Type) {
                case NotificationRequestType.Get: {
                    //return GetData(`/Get${isMenuQuery}`);
                    const notDate = new Date();
                    notDate.setDate( notDate.getDate() - 7 );
                    return delayedPromise(1000).then(() => {
                        return { ...defaultResponse, 
                            From: notDate.toLocaleDateString(),
                            To: new Date().toLocaleDateString(),
                            UnreadCount: 2,
                            OlderUnreadCount: 100,
                            Notifications: [
                                {
                                    ID: '1',
                                    IsViewed: false,
                                    Text: {
                                        [AppLanguage.PT]: "Teste 1",
                                        [AppLanguage.EN]: "Test 1"
                                    }
                                },
                                {
                                    ID: '2',
                                    IsViewed: false,
                                    Text: {
                                        [AppLanguage.PT]: "Teste 2",
                                        [AppLanguage.EN]: "Test 2"
                                    }
                                },
                                {
                                    ID: '3',
                                    IsViewed: true,
                                    Text: {
                                        [AppLanguage.PT]: "Teste 3",
                                        [AppLanguage.EN]: "Test 3"
                                    }
                                },
                                {
                                    ID: '4',
                                    IsViewed: true,
                                    Text: {
                                        [AppLanguage.PT]: "Teste 4",
                                        [AppLanguage.EN]: "Test 4"
                                    }
                                }
                            ]
                        } as INotifications | IServiceError;
                    })
                }
                case NotificationRequestType.ReadCurrent: {
                    //return PostData.Post({}, `/ReadCurrent${isMenuQuery}`);
                    return delayedPromise(1000).then(() => {
                        return {...defaultResponse,
                            UnreadCount: 0,
                            Notifications: [
                                ...defaultResponse.Notifications.map( (n) => {
                                    n.IsViewed = true;
                                    return n;
                                })
                            ]
                        };
                    })
                }
                case NotificationRequestType.ReadAll: {
                    //return PostData.Post({}, `/ReadAll${isMenuQuery}`);
                    return delayedPromise(1000).then(() => {
                        return {...defaultResponse,
                            UnreadCount: 0,
                            OlderUnreadCount: 0,
                            Notifications: [
                                ...defaultResponse.Notifications.map( (n) => {
                                    n.IsViewed = true;
                                    return n;
                                })
                            ]
                        };
                    })
                }
                case NotificationRequestType.Delete: {
                    //return PostData.Post({ID: request.ID}, `/Delete${isMenuQuery}`);
                    return delayedPromise(1000).then(() => {
                        return {...defaultResponse,
                            UnreadCount: defaultResponse.Notifications.find( n => request.ID && ( n.ID === request.ID && !n.IsViewed )) ? defaultResponse.UnreadCount - 1 : defaultResponse.UnreadCount,
                            Notifications: [
                                ...defaultResponse.Notifications.filter( (n) => n.ID !== request.ID )
                            ]
                        };
                    })
                }
            }
        }

        return defaultResponse;
    }

    return {
        NotificationHandler
    }
}