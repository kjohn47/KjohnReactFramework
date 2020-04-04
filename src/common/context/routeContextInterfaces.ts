import { RouteActions, KnownPages } from "./routeContextEnums";

export interface IRouteAction {
    type: RouteActions;
    payload: IRoutePayload;
}

export interface IRoutePayload {
    selectedPage?: KnownPages | string;
    queryString?: string;
    forceReload?: boolean;
}

export interface IRouteContext {
    selectedPage: KnownPages | string;
    queryString?: string;
    forceReload?: boolean;
}

export type RouteContextType = [ IRouteContext, ( ( action: IRouteAction ) => void ) ];