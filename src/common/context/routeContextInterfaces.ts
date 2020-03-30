import { RouteActions, KnownPages } from "./routeContextEnums";

export interface IRouteAction {
    type: RouteActions;
    payload: IRoutePayload;
}

export interface IRoutePayload {
    selectedPage?: KnownPages;
    queryString?: string;
    forceReload?: boolean;
}

export interface IRouteContext {
    selectedPage: KnownPages;
    queryString?: string;
    forceReload?: boolean;
}

export type RouteContextType = [ IRouteContext, ( ( action: IRouteAction ) => void ) ];