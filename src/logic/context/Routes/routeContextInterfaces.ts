import { RouteActions } from "./routeContextEnums";
import { IDictionary, PageType } from "../../functions/misc";

export interface IRouteAction {
    type: RouteActions;
    payload: IRoutePayload;
}

export interface IRoutePayload {
    selectedPage?: PageType;
    queryString?: IDictionary<string>;
    forceReload?: boolean;
    routeParams?: IDictionary<string>;
}

export interface IRouteContext {
    selectedPage: PageType;
    queryString?: IDictionary<string>;
    forceReload?: boolean;
    routeParams?: IDictionary<string>;
    routeReady: boolean;
}

export type RouteContextType = [ IRouteContext, ( ( action: IRouteAction ) => void ) ];