import { ServiceType, IServiceError } from "../../common/services/serviceCallerInterfaces";
import { INotificationRequest, INotifications } from "./NotificationInterfaces";
import { NotificationRequestType } from "./NotificationEnum";
import { delayedPromise } from "../../common/functions/misc";
import { AppLanguage } from "../../common/context/appContextEnums";

export const useNotificationHandler = ( IsMenu: boolean ) => {
    //const [isMenuQuery] = useState<string>(IsMenu ? "?ismenu=true" : "");
    //const GetData = useFetchGetHandler<INotifications>( { serviceUrl: AvailableServices.Notifications } );
    //const PostData = useFetchPostHandler<INotificationPostBody, INotifications>( { serviceUrl: AvailableServices.Notifications } );

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
                    //return GetData.Get(`${NotificationEndpoints.GetData}${isMenuQuery}`);
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
                    //return PostData.Post({IsMenu: IsMenu}, `${NotificationEndpoints.ReadCurrent}`);
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
                    //return PostData.Post({IsMenu: IsMenu}, `${NotificationEndpoints.ReadAll}`);
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
                    //return PostData.Post({ID: request.ID, IsMenu: IsMenu}, `${NotificationEndpoints.Delete}`);
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