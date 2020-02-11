import React, { useContext, useEffect, useState } from "react";
import { AppContext, ErrorContext, LoadingContext } from "../../common/config/appConfig";
import { KnownPages } from "../../common/context/appContextEnums";
import { ErrorCodes, ErrorActions } from "../../common/context/appErrorEnums";
import Loader from "../common/Loader";
import ErrorPage from "./ErrorPage";
import { injectProps } from "../../common/functions/misc";

interface IRoure<TRouteProps> {
    Route: string;
    Component: React.ComponentType;
    Props?: TRouteProps;
}

export interface IPageHandleProps {
    Routes: {
        Home: {
            Component: React.ComponentType;
            Props?: any;
        };
        KnownRoutes?: IRoure<any>[];
    };
}

const PageHandler: React.FC<IPageHandleProps> = ( { Routes } ) => {
    const [ appContext ] = useContext( AppContext );
    const [ errorContext, setErrorContext ] = useContext( ErrorContext );
    const isLoading = useContext( LoadingContext )[ 0 ];
    const [ output, setOutput ] = useState<React.ComponentType>();

    useEffect( () => {
        if ( !errorContext.hasError ) {
            let selectedPage = appContext.selectedPage;
            if ( selectedPage.toLowerCase() === KnownPages.Home.toLowerCase() ) {
                setOutput( injectProps( Routes.Home.Component, Routes.Home.Props ) );
            }
            else {
                let route = Routes.KnownRoutes && Routes.KnownRoutes.filter( r => r.Route.toLowerCase() === selectedPage.toLowerCase() )[ 0 ];
                if ( route ) {
                    setOutput( injectProps( route.Component, route.Props ) );
                }
                else {
                    setErrorContext( {
                        type: ErrorActions.ActivateError,
                        errorCode: ErrorCodes.PageNotFound,
                        errorDescription: "Not Found: 404"
                    } );
                }
            }
        }
    }, [ appContext.selectedPage, appContext.queryString, Routes, setErrorContext, errorContext.hasError ] )

    return (
        <Loader isLoading={ isLoading } bigLoader paddingTop >
            { !errorContext.hasError && output ? output : <ErrorPage /> }
        </Loader>
    );
}

export default PageHandler;