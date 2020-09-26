import React, { useCallback, useMemo } from "react";
import { KnownPages } from "../../../logic/context/Routes/routeContextEnums";
import { IDictionary, PageType } from "../../../logic/functions/misc";
import useRouteHandler from "../../../logic/context/Routes/RouteContextHandler";

interface IPageSelector {
    page: PageType;
    queryParams?: IDictionary<string>;
    className?: string;
    highlight?: boolean;
    forceReload?: boolean;
    action?: () => void;
    disabled?: boolean;
}

const PageSelector: React.FC<IPageSelector> = ( { page,
                                                  action,
                                                  className,
                                                  disabled,
                                                  forceReload,
                                                  highlight,
                                                  queryParams,
                                                  children
                                                } ) => {
    const {ChangeRoute} = useRouteHandler();
    const css = useMemo(() => ( disabled ? 
                                "" 
                                :  "pointer_cursor" +
                                ( highlight ? 
                                    " PageSelector_Highlight" 
                                    : "" ) ) + 
                                    ( className ? 
                                        ( " " + className ) 
                                        : "" ),
                         [disabled, highlight, className]);

    const setPage = useCallback(( page: PageType, queryParams?: IDictionary<string> ): void => {
        if(disabled)
            return;

        let queryString = queryParams === undefined ? "" : "?" + new URLSearchParams( queryParams ).toString();
        if ( page === KnownPages.Home || page.toString() === "" || page.toString() === "/" ) {
            page = KnownPages.Home;
            window.history.pushState( {}, "", "/" + ( queryString !== "" ? page.toString() + queryString : "" ) );
        }
        else {
            window.history.pushState( {}, "", "/" + page.toString() + queryString );
        }

        ChangeRoute({
            selectedPage: page,
            queryString: queryParams,
            forceReload: forceReload
        });

        if(action)
        {
            action();
        }
    }, [action, forceReload, ChangeRoute, disabled]);

    return (
        <span 
            className={ css } 
            onClick={ () => setPage( page, queryParams ) } 
        >
            { children }
        </span>
    );
}

export default PageSelector;