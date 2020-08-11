import React, { useEffect } from "react";
import { ErrorCodes } from "../context/Error/appErrorEnums";
import useAppHandler from "../context/App/AppContextHandler";
import useLoginHandler from "../context/Login/LoginContextHandler";
import useErrorHandler from "../context/Error/ErrorContextHandler";

export const withLogin = ( Component: React.ComponentType, adminOnly: boolean = false): React.ComponentType => {
    const WithLogin: React.FC = () => {
        const appContext = useAppHandler().App;
        const loginContext = useLoginHandler().Login;
        const setError = useErrorHandler().ChangeError;

        useEffect( () => {
            if( loginContext !== undefined && adminOnly && !appContext.adminOptions )
            {
                setError( {
                    errorCode: ErrorCodes.AdminOnlyError,
                    errorDescription: "Error: Administrative Rights"
                } );
            }
        }, [loginContext, appContext.adminOptions, setError])

        return (
            loginContext === undefined ?
                <div>Please make login</div>
                : ( !adminOnly || ( adminOnly && appContext.adminOptions ) ) ? 
                <Component />
                : null
        );
    }

    return () => <WithLogin />;
}