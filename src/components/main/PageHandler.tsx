import React, { useContext, useEffect, useState } from "react";
import { AppContext, ErrorContext, LoadingContext } from "../../common/config/appConfig";
import { KnownPages, ContextActions } from "../../common/context/appContextEnums";
import { ErrorCodes, ErrorActions } from "../../common/context/appErrorEnums";
import Loader from "../common/Loader";
import ErrorPage from "./ErrorPage";
import { injectProps } from "../../common/functions/misc";
import { withLogin } from "../../common/functions/checkLogin";

interface IRoure<TRouteProps> {
    Route: string;
    Component: React.ComponentType;
    Props?: TRouteProps;
    NeedAuth?: boolean;
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

const usePageSelector: ( selectedComponent: React.ComponentType | undefined ) => [ React.ComponentType | undefined, ( newComponent: React.ComponentType | undefined ) => Promise<void> ] = ( selectedComponent ) => {
    const [ component, setComponent ] = useState<React.ComponentType | undefined>( selectedComponent );

    const setSelectedComponent =
        ( newComponent: React.ComponentType | undefined ) => new Promise<void>( ( resolve ) => {
            resolve( setComponent( newComponent ) );
        } )

    return [ component, setSelectedComponent ]
}

const PageHandler: React.FC<IPageHandleProps> = ( { Routes } ) => {
    const [ appContext, setAppContext ] = useContext( AppContext );
    const [ errorContext, setErrorContext ] = useContext( ErrorContext );
    const isLoading = useContext( LoadingContext )[ 0 ];
    const [ output, setOutput ] = usePageSelector( undefined );
    const [ lastPage, setLastPage ] = useState<string>();
    const [ queryString, setQueryString ] = useState<string | undefined>( undefined );

    useEffect( () => {
        if ( !errorContext.hasError ) {
            let selectedPage = appContext.selectedPage;
            if ( lastPage !== selectedPage || queryString !== appContext.queryString || appContext.forceReload ) {
                let tempPromise: Promise<void>;
                if ( appContext.forceReload || queryString !== appContext.queryString ) {
                    tempPromise = setOutput( undefined )
                }
                else {
                    tempPromise = new Promise<void>( ( resolve ) => resolve() );
                }

                setLastPage( selectedPage );
                setQueryString( appContext.queryString );

                tempPromise.then( () => {
                    if ( selectedPage.toLowerCase() === KnownPages.Home.toLowerCase() ) {
                        setOutput( injectProps( Routes.Home.Component, Routes.Home.Props ) );
                    }
                    else if ( selectedPage.toLowerCase() === KnownPages.UserSettings.toLowerCase() ) {
                        setOutput( withLogin( () => <></> ) ); //user menu component
                    }
                    else if ( appContext.adminOptions && selectedPage.toLowerCase() === KnownPages.Administration.toLowerCase() ) {
                        setOutput( withLogin( () => <></> ) ); //Administration component
                    }
                    else {
                        let route = Routes.KnownRoutes && Routes.KnownRoutes.filter( r => r.Route.toLowerCase() === selectedPage.toLowerCase() )[ 0 ];
                        if ( route ) {
                            if(route.NeedAuth)
                            {
                                setOutput( withLogin( injectProps( route.Component, route.Props ) ) );
                            }
                            else
                            {
                                setOutput( injectProps( route.Component, route.Props ) );
                            }
                        }
                        else {
                            setErrorContext( {
                                type: ErrorActions.ActivateError,
                                errorCode: ErrorCodes.PageNotFound,
                                errorDescription: "Not Found: 404"
                            } );
                        }
                    }
                } ).finally( () => {
                    if ( appContext.forceReload ) {
                        setAppContext( {
                            type: ContextActions.ForceReloadDisable,
                            payload: {}
                        } )
                    }
                } )
            }
        }
        // eslint-disable-next-line
    }, [
        appContext.selectedPage,
        appContext.queryString,
        setErrorContext,
        errorContext.hasError,
        appContext.forceReload,
        setAppContext
    ] )

    return (
        <Loader isLoading={ isLoading } bigLoader paddingTop >
            { !errorContext.hasError && output ? output : <ErrorPage /> }
        </Loader>
    );
}

export default PageHandler;