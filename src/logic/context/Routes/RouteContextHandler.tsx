import { useContext, useCallback } from 'react';
import { RouteContext } from '../../config/AppProvider';
import { RouteContextType } from './routeContextInterfaces';
import { PageType, IDictionary } from '../../functions/misc';
import { KnownPages } from './routeContextEnums';

interface ISetPageParams {
    page: PageType;
    queryParams?: IDictionary<string>;
    forceReload?: boolean;
}

interface IRouteHandler extends RouteContextType {
    SetPage: ( params: ISetPageParams ) => void;
}

const useRouteHandler = (): IRouteHandler => {
    const routeContext = useContext(RouteContext);
    
    const SetPage = useCallback(( {page, queryParams, forceReload}: ISetPageParams ): void => {
        let queryString = queryParams === undefined ? "" : "?" + new URLSearchParams( queryParams ).toString();
        if ( page === KnownPages.Home || page.toString() === "" || page.toString() === "/" ) {
            page = KnownPages.Home;
            window.history.pushState( {}, "", "/" + ( queryString !== "" ? page.toString() + queryString : "" ) );
        }
        else {
            window.history.pushState( {}, "", "/" + page.toString() + queryString );
        }

        routeContext.ChangeRoute({
            selectedPage: page,
            queryString: queryParams,
            forceReload: forceReload
        });
    }, [routeContext]);

    return {...routeContext, SetPage}
}

export default useRouteHandler;