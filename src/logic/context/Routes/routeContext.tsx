import { useState } from "react";
import { IRouteContext, RouteContextType, ChangeRouteAction, ChangeRouteParamsAction } from "./routeContextInterfaces";
import { initialRouteConfig } from "../../config/configuration";

export const useRouteContext: ( initialRoute: IRouteContext ) => RouteContextType = ( initialRoute ) => {
    const [ routeContext, setRouteContext ] = useState( initialRoute );

    const ChangeRoute: ChangeRouteAction = (params) => {
        let isReady: boolean = ( !params.forceReload && ( routeContext.queryString === params.queryString && routeContext.selectedPage === params.selectedPage ) );
        setRouteContext( {
            ...routeContext,
            selectedPage: params.selectedPage,
            queryString: params.queryString,
            forceReload: params.forceReload,
            routeParams: undefined,
            routeReady: isReady
        } );
    }

    const UpdateRouteParams: ChangeRouteParamsAction = (routeParams) => {
        setRouteContext({
            ...routeContext,
            routeParams: routeParams,
            routeReady: true
        })
    }

    const DisableForceReload: ChangeRouteParamsAction = (routeParams) => {
        setRouteContext({
            ...routeContext,
            forceReload: false,
            routeParams: routeParams,
            routeReady: true
        })
    }
    
    return {
        Route: routeContext,
        ChangeRoute,
        UpdateRouteParams,
        DisableForceReload
    };
}

export const DefaultRouteContext: RouteContextType = {
    Route: initialRouteConfig,
    ChangeRoute: () => {},
    UpdateRouteParams: () => {},
    DisableForceReload: () => {}
}