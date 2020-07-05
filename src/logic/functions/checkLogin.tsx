import React, { useContext, useEffect } from "react";
import { LoginContext, AppContext, ErrorContext } from "../config/AppProvider";
import { ErrorCodes } from "../context/Error/appErrorEnums";

export const withLogin = ( Component: React.ComponentType, adminOnly: boolean = false): React.ComponentType => {
    const WithLogin: React.FC = () => {
        const appContext = useContext( AppContext ).App;
        const loginContext = useContext( LoginContext ).Login;
        const setError = useContext( ErrorContext ).ChangeError;

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