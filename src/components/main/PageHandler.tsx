import React, { useContext, useEffect, useState } from "react";
import { AppContext, ErrorContext, LoadingContext, RouteContext } from "../../common/config/appConfig";
import { KnownPages } from "../../common/context/routeContextEnums";
import { ErrorCodes, ErrorActions } from "../../common/context/appErrorEnums";
import Loader from "../common/Loader";
import ErrorPage from "./ErrorPage";
import { injectProps, IDictionary, PageType } from "../../common/functions/misc";
import { withLogin } from "../../common/functions/checkLogin";
import { getRouteUrlAndQuery } from "../../common/functions/routeHandling";
import { RouteActions } from "../../common/context/routeContextEnums";
import UserMenu from "./UserMenu";
import AdminMenu from "./AdminMenu";

export interface IRoure<TRouteProps> {
    Route: PageType;
    Component: React.ComponentType<TRouteProps>;
    Props?: TRouteProps;
    NeedAuth?: boolean;
    AdminOnly?: boolean;
}

export interface IStaticRouteComponent<TProps> {
    Component: React.ComponentType<TProps>;
    Props?: TProps;
}

export interface IPageHandleProps {
    Routes: {
        Home: IStaticRouteComponent<any>;
        CustomUserMenu?: IStaticRouteComponent<any>;
        CustomAdminMenu?: IStaticRouteComponent<any>;
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
    const [ appContext ] = useContext( AppContext );
    const [ routeContext, setRouteContext ] = useContext( RouteContext );
    const [ errorContext, setErrorContext ] = useContext( ErrorContext );
    const isLoading = useContext( LoadingContext )[ 0 ];
    const [ output, setOutput ] = usePageSelector( undefined );
    const [ lastPage, setLastPage ] = useState<string>();
    const [ queryString, setQueryString ] = useState<IDictionary<string> | undefined>( undefined );

    const listenToPopstate = () => {
        const route = getRouteUrlAndQuery();
        setErrorContext({
            type: ErrorActions.RemoveError
        });
        setRouteContext( {
            type: RouteActions.ChangePage,
            payload: {
                selectedPage: route.selectedPage,
                queryString: route.queryString,
                forceReload: true
            }
        } );
      };

    useEffect( () => {
        window.addEventListener("popstate", listenToPopstate);
        return () => {
        window.removeEventListener("popstate", listenToPopstate);
        };
        // eslint-disable-next-line
    }, [])

    useEffect( () => {
        if( errorContext.hasError )
        {
            if( routeContext.forceReload || lastPage !== routeContext.selectedPage || queryString !== routeContext.queryString ) 
            {
                setErrorContext({
                    type: ErrorActions.RemoveError
                });
            }
            else
            {
                setOutput(undefined);
                setLastPage(KnownPages.ErrorPage);
            }
        }

        else if ( !routeContext.routeReady  || lastPage === KnownPages.ErrorPage ) {
            let selectedPage = routeContext.selectedPage;
            if ( lastPage !== selectedPage || queryString !== routeContext.queryString || routeContext.forceReload ) {
                let tempPromise: Promise<void>;
                if ( routeContext.forceReload || queryString !== routeContext.queryString ) {
                    tempPromise = setOutput( undefined )
                }
                else {
                    tempPromise = new Promise<void>( ( resolve ) => resolve() );
                }

                setLastPage( selectedPage );
                setQueryString( routeContext.queryString );
                let routeParams: IDictionary<string> | undefined = undefined;
                let withError: boolean = false;
                tempPromise.then( () => {
                    if ( selectedPage.toLowerCase() === KnownPages.Home.toLowerCase() ) {
                        setOutput( injectProps( Routes.Home.Component, Routes.Home.Props ) );
                    }
                    else if ( selectedPage.toLowerCase() === KnownPages.UserSettings.toLowerCase() ) {
                        setOutput( 
                            withLogin( ( Routes.CustomUserMenu ? 
                                injectProps( Routes.CustomUserMenu.Component, Routes.CustomUserMenu.Props ) : 
                                UserMenu ) ) 
                        );
                    }
                    else if ( appContext.adminOptions && selectedPage.toLowerCase() === KnownPages.Administration.toLowerCase() ) {
                        setOutput( 
                            withLogin( ( Routes.CustomAdminMenu ? 
                                injectProps( Routes.CustomAdminMenu.Component, Routes.CustomAdminMenu.Props ) :
                                AdminMenu ), true ) );
                    }
                    else {
                        const route = Routes.KnownRoutes && Routes.KnownRoutes.filter( r => {
                            if( r.Route.includes('/:') )
                            {
                                const paramsRoute = selectedPage.split('/');
                                const paramsComponent = r.Route.split('/');
                                if(paramsRoute.length === paramsComponent.length)
                                {
                                    let validResult: boolean = true;
                                    routeParams = {};
                                    paramsComponent.forEach( (param, i) => {
                                        if (param.startsWith(':') && paramsRoute[i] !== "")
                                        {
                                            routeParams = { ...routeParams, [param.substr(1)]: paramsRoute[i] };
                                        }
                                        else
                                        {
                                            validResult = (param.toLowerCase() === paramsRoute[i].toLowerCase());
                                            if (!validResult)
                                            {
                                                routeParams = undefined;
                                                return;
                                            }
                                        }
                                    });
                                    return validResult;
                                }
                                return false;
                            }
                            return selectedPage.toLowerCase() === r.Route.toLowerCase() || selectedPage.toLowerCase() === `${r.Route.toLowerCase()}/`;
                        })[ 0 ];
                        if ( route ) {
                            if(route.NeedAuth || route.AdminOnly)
                            {
                                if(route.AdminOnly)
                                {
                                    setOutput( withLogin( injectProps( route.Component, route.Props ), route.AdminOnly ) );
                                }
                                else
                                {
                                    setOutput( withLogin( injectProps( route.Component, route.Props ) ) );
                                }
                            }
                            else
                            {
                                setOutput( injectProps( route.Component, route.Props ) );
                            }
                        }
                        else {
                            withError = true;
                            setErrorContext( {
                                type: ErrorActions.ActivateError,
                                errorCode: ErrorCodes.PageNotFound,
                                errorDescription: "Not Found: 404"
                            } );
                        }
                    }
                } ).finally( () => {
                    if (!withError) {
                        if ( routeContext.forceReload ) {
                            setRouteContext( {
                                type: RouteActions.ForceReloadDisable,
                                payload: {
                                    routeParams: routeParams
                                }
                            } )
                        }
                        else {
                            setRouteContext( {
                                type: RouteActions.UpdateRouteParams,
                                payload: {
                                    routeParams: routeParams
                                }
                            } )
                        }
                    }
                } )
            }
        }
        // eslint-disable-next-line
    }, [
        routeContext,
        errorContext
    ] )
    return (
        <Loader isLoading={ isLoading || ( !routeContext.routeReady && !errorContext.hasError ) } bigLoader paddingTop >
            { !errorContext.hasError && output ? ( routeContext.routeReady ? output :  null ) : errorContext.hasError ? <ErrorPage /> : null }
        </Loader>
    );
}

export default PageHandler;