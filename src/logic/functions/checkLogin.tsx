import React, { useContext, useEffect } from "react";
import { LoginContext, AppContext, ErrorContext } from "../config/AppProvider";
import { ErrorActions, ErrorCodes } from "../context/Error/appErrorEnums";

export const withLogin = ( Component: React.ComponentType, adminOnly: boolean = false): React.ComponentType => {
    const WithLogin: React.FC = () => {
        const [ appContext ] = useContext( AppContext );
        const [ loginContext ] = useContext( LoginContext );
        const setError = useContext( ErrorContext )[1];

        useEffect( () => {
            if( loginContext !== undefined && adminOnly && !appContext.adminOptions )
            {
                setError( {
                    type: ErrorActions.ActivateError,
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