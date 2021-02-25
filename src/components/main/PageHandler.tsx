import React, { useEffect, useState, Suspense } from "react";
import { KnownPages } from "../../logic/context/Routes/routeContextEnums";
import { ErrorCodes } from "../../logic/context/Error/appErrorEnums";
import Loader from "../common/presentation/loading/Loader";
import ErrorPage from "./ErrorPage";
import { injectProps, IDictionary, PageType } from "../../logic/functions/misc";
import { withLogin } from "../../logic/functions/checkLogin";
import { getRouteUrlAndQuery } from "../../logic/functions/routeHandling";
import UserMenu from "./UserMenu";
import AdminMenu from "./AdminMenu";
import useAppHandler from "../../logic/context/App/AppContextHandler";
import useRouteHandler from "../../logic/context/Routes/RouteContextHandler";
import useErrorHandler from "../../logic/context/Error/ErrorContextHandler";
import useLoadingHandler from "../../logic/context/App/LoadingContextHandler";

export interface IRoute<TRouteProps> {
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
        KnownRoutes?: IRoute<any>[];
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
    const appContext = useAppHandler().App;
    const routeContext = useRouteHandler();
    const errorContext = useErrorHandler();
    const isLoading = useLoadingHandler().loading;
    const [ output, setOutput ] = usePageSelector( undefined );
    const [ lastPage, setLastPage ] = useState<string>();
    const [ queryString, setQueryString ] = useState<IDictionary<string> | undefined>( undefined );

    const listenToPopstate = () => {
        const route = getRouteUrlAndQuery();
        errorContext.RemoveError();
        routeContext.ChangeRoute({
                selectedPage: route.selectedPage,
                queryString: route.queryString,
                forceReload: true
            });
      };

    useEffect( () => {
        window.addEventListener("popstate", listenToPopstate);
        return () => {
        window.removeEventListener("popstate", listenToPopstate);
        };
        // eslint-disable-next-line
    }, [])

    useEffect( () => {
        if( errorContext.Error.hasError )
        {
            if( lastPage !== routeContext.Route.selectedPage || queryString !== routeContext.Route.queryString ) 
            {
                errorContext.RemoveError();
            }
            else
            {
                setOutput(undefined);
                setLastPage(KnownPages.ErrorPage);
            }
        }

        else if ( !routeContext.Route.routeReady  || lastPage === KnownPages.ErrorPage ) {
            let selectedPage = routeContext.Route.selectedPage;
            if ( lastPage !== selectedPage || queryString !== routeContext.Route.queryString || routeContext.Route.forceReload ) {
                let tempPromise: Promise<void>;
                if ( routeContext.Route.forceReload || queryString !== routeContext.Route.queryString ) {
                    tempPromise = setOutput( undefined )
                }
                else {
                    tempPromise = new Promise<void>( ( resolve ) => resolve() );
                }

                setLastPage( selectedPage );
                setQueryString( routeContext.Route.queryString );
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
                                setOutput( withLogin( injectProps( route.Component, route.Props ), route.AdminOnly ) );
                            }
                            else
                            {
                                setOutput( injectProps( route.Component, route.Props ) );
                            }
                        }
                        else {
                            withError = true;
                            errorContext.ChangeError( {
                                errorCode: ErrorCodes.PageNotFound,
                                errorDescription: "Not Found: 404"
                            } );
                        }
                    }
                } ).finally( () => {
                    if (!withError) {
                        if ( routeContext.Route.forceReload ) {
                            routeContext.DisableForceReload(routeParams);
                        }
                        else {
                            routeContext.UpdateRouteParams(routeParams);
                        }
                    }
                } )
            }
        }
        // eslint-disable-next-line
    }, [
        routeContext.Route,
        errorContext.Error
    ] )
    return (
        <Suspense fallback = {<Loader isLoading={ true } bigLoader paddingTop withoutText/> } >
            <Loader className = "ContentLoader" isLoading={ isLoading || ( !routeContext.Route.routeReady && !errorContext.Error.hasError ) } bigLoader paddingTop withoutText = { !routeContext.Route.routeReady } >
                { !errorContext.Error.hasError && output ? ( routeContext.Route.routeReady ? output :  null ) : errorContext.Error.hasError ? <ErrorPage /> : null }
            </Loader>
        </Suspense>
    );
}

export default PageHandler;