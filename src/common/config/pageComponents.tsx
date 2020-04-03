import { KnownPages } from "../context/routeContextEnums";
import Test from "../../components/pages/ComponentTest/Test";
import { IPageHandleProps } from "../../components/main/PageHandler";
import { IKRFProps } from "../../components/main/KRFApp";

//Insert your routes here:
const pageRoutes: IPageHandleProps<any> = {
    Routes: {
        Home: {
            Component: Test
        },
        KnownRoutes: [
            {
                Component: Test,
                Route: KnownPages.Test,
                AdminOnly: true
            }
        ]
    }
};

export const pageComponents: IKRFProps = {
    Routes: pageRoutes,
    MenuProps: {
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