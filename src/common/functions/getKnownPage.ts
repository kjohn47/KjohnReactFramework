import React from "react";
import { KnownPages } from "../context/appContextEnums";
import { withLogin } from "./checkLogin";
import ErrorPage from "../../components/main/ErrorPage";
import Test from "../../components/pages/ComponentTest/Test";

const TestWithLogin = withLogin( Test );

export const getKnownPage: ( page: KnownPages ) => React.ComponentType | undefined = ( page ) => {
    switch ( page ) {
        case ( KnownPages.Error ): {
            return ErrorPage;
        }
        case ( KnownPages.Home ): {
            return Test;
        }
        case ( KnownPages.Test ): {
            return TestWithLogin;
        }
        default: {
            return undefined;
        }
    }
}