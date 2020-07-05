import { IDictionary, PageType } from "../../functions/misc";

export interface IRouteParams {
    selectedPage: PageType;
    queryString?: IDictionary<string>;
    forceReload?: boolean;
}

export interface IRouteContext {
    selectedPage: PageType;
    queryString?: IDictionary<string>;
    forceReload?: boolean;
    routeParams?: IDictionary<string>;
    routeReady: boolean;
}

export type ChangeRouteAction = (params: IRouteParams) => void;
export type ChangeRouteParamsAction = (routeParams?: IDictionary<string>) => void;

export type RouteContextType = { 
    Route: IRouteContext, 
    ChangeRoute: ChangeRouteAction,
    UpdateRouteParams: ChangeRouteParamsAction,
    DisableForceReload: ChangeRouteParamsAction 
};