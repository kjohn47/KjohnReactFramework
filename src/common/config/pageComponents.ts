import { KnownPages } from "../context/appContextEnums";
import { withLogin } from "../functions/checkLogin";
import Test from "../../components/pages/ComponentTest/Test";
import { IPageHandleProps } from "../../components/main/PageHandler";
import { IKRFProps } from "../../components/main/KRFApp";
import Menu from "../../components/main/Menu";
import Footer from "../../components/main/Footer";

//To be moved

const TestWithLogin = withLogin( Test );
//Insert your routes here:
const pageRoutes: IPageHandleProps = {
    Routes: {
        Home: {
            Component: Test
        },
        KnownRoutes: [
            {
                Component: TestWithLogin,
                Route: KnownPages.Test
            }
        ]
    }
};

export const pageComponents: IKRFProps = {
    Routes: pageRoutes,
    Menu: Menu,
    Footer: Footer
}