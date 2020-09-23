import {lazy} from 'react';
import { KnownPages } from "../context/Routes/routeContextEnums";
//import Test from "../../components/pages/ComponentTest/Test";
import { IPageHandleProps } from "../../components/main/PageHandler";
import { IKRFProps } from "../../components/main/KRFApp";
import { IKnownServices } from '../services/serviceCallerInterfaces';
import { INeededCookieModal } from '../../components/main/CookieModal';
import { IMenuProps } from '../../components/main/Menu';
const Test = lazy(() => import("../../components/pages/ComponentTest/Test") );

//Document download service enum - makes it easier to remember keys
export enum DocumentsDownloadSrvEnum {
    Service = "Documents",
    Action = "Download",
    File  ="pdfFile"
}

//Insert your routes here:
const pageRoutes: IPageHandleProps = {
    Routes: {
        Home: {
            Component: Test
        },
        KnownRoutes: [
            {
                Component: Test,
                Route: KnownPages.Test,
                AdminOnly: true
            },
            {
                Component: Test,
                Route: `TestRouteId/:id`,
                AdminOnly: true
            },
            {
                Component: Test,
                Route: `TestRouteComplex/:id/Add/:uuid`,
                AdminOnly: true
            }
        ]
    }
};

//Known services add or override
const knownServices: IKnownServices = {
    [DocumentsDownloadSrvEnum.Service]: {
        Name: "documents",
        Actions: {
            [DocumentsDownloadSrvEnum.Action]: {
                Name: "download"
            }
        }
    }
}

//cookie modal settings
const cookieModal: INeededCookieModal = {
    Description: "#(CookiesModalDescription)",
    Cookies: [
        {
            CookieDescription: "#(CookieAnalyticDescription)",
            CookieKey: "CookieAnalytic"
        }
    ]
}

//Menu settings
const menuSettings: IMenuProps = {
    EnableNotifications: true,
    NotificationsRoute: KnownPages.Notifications,
    NotificationRefreshTime: 60000,
    Brand: "#(krf)",
    MenuNav: [
        {
            Title: "#(Test1)",
            SubMenus: [
                {
                    Title: "#(SubTest1)",
                    Link: KnownPages.Home
                },
                {
                    
                },
                {
                    Title: "#(SubTest2)",
                    Link: KnownPages.Test,
                    Reloadable: true
                }
            ]
        },
        {
            Title: "#(Test2)",
            SubMenus: [
                {
                    Title: "#(SubTest1)",
                    Link: KnownPages.Home,
                    Reloadable: true
                },
                {
                    
                },
                {
                    Title: "#(SubTest2)",
                    Link: KnownPages.Test
                }
            ]
        }
    ]
}

//Initial props for KRFApp
export const pageComponents: IKRFProps = {
    Routes: pageRoutes,
    MenuProps: menuSettings,
    FooterProps: {},
    CookieModalSettings: cookieModal,
    KnownServices: knownServices
}