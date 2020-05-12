import {lazy} from 'react';
import { KnownPages } from "../context/Routes/routeContextEnums";
//import Test from "../../components/pages/ComponentTest/Test";
import { IPageHandleProps } from "../../components/main/PageHandler";
import { IKRFProps } from "../../components/main/KRFApp";
const Test = lazy(() => import("../../components/pages/ComponentTest/Test") );


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

export const pageComponents: IKRFProps = {
    Routes: pageRoutes,
    MenuProps: {
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
    },
    FooterProps: {}
}