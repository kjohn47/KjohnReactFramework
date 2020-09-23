import { ServiceType, IServiceError } from "../../logic/services/serviceCallerInterfaces";
import { INotificationRequest
    , INotifications
    //, INotificationPostBody
} from "./NotificationInterfaces";
import { NotificationRequestType } from "./NotificationEnum";
import { 
    delayedPromise
    //, IDictionary 
} from "../../logic/functions/misc";
//import { useKnownServices } from "../../logic/context/App/knownServicesContextHandler";
//import { useMemo } from "react";
//import { AvailableActionsEnum, AvailableServicesEnum, NotificationRoutesEnum } from "../../logic/services/servicesEnums";
//import { useFetchGetHandler, useFetchPostHandler } from "../../logic/services/fetchHandler";

export const useNotificationHandler = ( IsMenu: boolean ) => {
    /*
    const {getKnownService, getKnownAction} = useKnownServices();    
    const GetData = useFetchGetHandler<INotifications>( { serviceUrl: AvailableServicesEnum.User } );
    const PostData = useFetchPostHandler<INotificationPostBody, INotifications>( { serviceUrl: AvailableServicesEnum.User } );
    const isMenuQuery = useMemo<IDictionary<string>|undefined>(() => {
        return IsMenu ? { "ismenu" : "true" } : undefined;
    }, [IsMenu]);
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
                    //return GetData.Get(AvailableActionsEnum.Notifications, NotificationRoutesEnum.GetData, isMenuQuery);
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
                    //return PostData.Post({IsMenu: IsMenu}, AvailableActionsEnum.Notifications, NotificationRoutesEnum.ReadCurrent);
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
                    //return PostData.Post({IsMenu: IsMenu}, AvailableActionsEnum.Notifications, NotificationRoutesEnum.ReadAll);
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
                    //return PostData.Post({ID: serviceRequest.ID, IsMenu: IsMenu}, AvailableActionsEnum.Notifications, NotificationRoutesEnum.Delete);
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