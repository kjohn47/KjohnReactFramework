import { KnownPages } from "../context/appContextEnums";
import { withLogin } from "./checkLogin";
import Test from "../../components/pages/ComponentTest/Test";
import { IPageHandleProps } from "../../components/main/PageHandler";

const TestWithLogin = withLogin( Test );

export const pageRoutes: IPageHandleProps = {
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