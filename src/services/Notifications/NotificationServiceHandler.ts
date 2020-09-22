import { ServiceType, IServiceError } from "../../logic/services/serviceCallerInterfaces";
import { INotificationRequest, INotifications } from "./NotificationInterfaces";
import { NotificationRequestType } from "./NotificationEnum";
import { 
    delayedPromise
    //, IDictionary 
} from "../../logic/functions/misc";
//import { useKnownServices } from "../../logic/context/App/knownServicesContextHandler";
//import { useMemo } from "react";
//import { AvailableActionsEnum, AvailableServicesEnum, NotificationRoutesEnum } from "../../logic/services/servicesEnums";

export const useNotificationHandler = ( IsMenu: boolean ) => {
    /*
    const {getKnownService, getKnownAction} = useKnownServices();
    
    const userService = useMemo<string>(() => {
        return getKnownService(AvailableServicesEnum.User)
    }, []);

    const isMenuQuery = useMemo<IDictionary<string>|undefined>(() => {
        return IsMenu ? { "ismenu" : "true" } : undefined;
    }, [IsMenu]);

    const getDataRoute = useMemo(() => {
        return getKnownAction(AvailableServicesEnum.User, AvailableActionsEnum.Notifications, NotificationRoutesEnum.GetData, false, isMenuQuery );
    }, [isMenuQuery]);

    const readCurrentRoute = useMemo(() => {
        return getKnownAction(AvailableServicesEnum.User, AvailableActionsEnum.Notifications, NotificationRoutesEnum.ReadCurrent, false, isMenuQuery );
    }, [isMenuQuery]);

    const readAllRoute = useMemo(() => {
        return getKnownAction(AvailableServicesEnum.User, AvailableActionsEnum.Notifications, NotificationRoutesEnum.ReadAll, false, isMenuQuery );
    }, [isMenuQuery]);

    const deleteRoute = useMemo(() => {
        return getKnownAction(AvailableServicesEnum.User, AvailableActionsEnum.Notifications, NotificationRoutesEnum.Delete, false, isMenuQuery );
    }, [isMenuQuery]);
    
    const GetData = useFetchGetHandler<INotifications>( { serviceUrl: userService } );
    const PostData = useFetchPostHandler<INotificationPostBody, INotifications>( { serviceUrl: userService } );
    */

    const NotificationHandler: ServiceType<INotificationRequest, INotifications> = async ( { serviceRequest, serviceResponse } ) => {
        const defaultResponse = serviceResponse ? serviceResponse : {
            From: "",
            To: "",
            OlderUnreadCount: 0,
            UnreadCount: 0,
            Notifications: []
        };
        
        if(serviceRequest) {
            switch(serviceRequest.Type) {
                case NotificationRequestType.Get: {
                    //return GetData.Get(getDataRoute);
                    const notDate = new Date();
                    notDate.setDate( notDate.getDate() - 7 );
                    return delayedPromise(1000).then(() => {
                        return { ...defaultResponse, 
                            From: notDate.toLocaleDateString(),
                            To: new Date().toLocaleDateString(),
                            UnreadCount: defaultResponse.UnreadCount + 2,
                            OlderUnreadCount: 100,
                            Notifications: [ ...defaultResponse.Notifications, 
                                {
                                    ID: '1' + new Date().toString(),
                                    IsViewed: false,
                                    Text: {
                                        PT: "Teste 1",
                                        EN: "Test 1"
                                    }
                                },
                                {
                                    ID: '2' + new Date().toString(),
                                    IsViewed: false,
                                    Text: {
                                        PT: "Teste 2",
                                        EN: "Test 2"
                                    }
                                },
                                {
                                    ID: '3' + new Date().toString(),
                                    IsViewed: true,
                                    Text: {
                                        PT: "Teste 3",
                                        EN: "Test 3"
                                    }
                                },
                                {
                                    ID: '4' + new Date().toString(),
                                    IsViewed: true,
                                    Text: {
                                        PT: "Teste 4",
                                        EN: "Test 4"
                                    }
                                }
                            ]
                        } as INotifications | IServiceError;
                    })
                }
                case NotificationRequestType.ReadCurrent: {
                    //return PostData.Post({IsMenu: IsMenu}, readCurrentRoute);
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
                    //return PostData.Post({IsMenu: IsMenu}, readAllRoute);
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
                    //return PostData.Post({ID: request.ID, IsMenu: IsMenu}, deleteRoute);
                    return delayedPromise(1000).then(() => {
                        return {...defaultResponse,
                            UnreadCount: defaultResponse.Notifications.find( n => serviceRequest.ID && ( n.ID === serviceRequest.ID && !n.IsViewed )) ? defaultResponse.UnreadCount - 1 : defaultResponse.UnreadCount,
                            Notifications: [
                                ...defaultResponse.Notifications.filter( (n) => n.ID !== serviceRequest.ID )
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