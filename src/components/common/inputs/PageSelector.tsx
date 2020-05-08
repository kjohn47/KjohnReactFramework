import React, { useContext } from "react";
import { KnownPages, RouteActions } from "../../../logic/context/routeContextEnums";
import { RouteContext } from "../../../logic/config/AppProvider";
import { IDictionary, PageType } from "../../../logic/functions/misc";

interface IPageSelector {
    page: PageType;
    queryParams?: IDictionary<string>;
    className?: string;
    highlight?: boolean;
    forceReload?: boolean;
    action?: () => void;
}

const PageSelector: React.FC<IPageSelector> = ( props ) => {
    const setRoute = useContext( RouteContext )[ 1 ];
    const setPage = ( page: PageType, queryParams?: IDictionary<string> ) => {
        let queryString = queryParams === undefined ? "" : "?" + new URLSearchParams( queryParams ).toString();
        if ( page === KnownPages.Home || page.toString() === "" || page.toString() === "/" ) {
            page = KnownPages.Home;
            window.history.pushState( {}, "", "/" + ( queryString !== "" ? page.toString() + queryString : "" ) );
        }
        else {
            window.history.pushState( {}, "", "/" + page.toString() + queryString );
        }

        setRoute( {
            type: RouteActions.ChangePage,
            payload: {
                selectedPage: page,
                queryString: queryParams,
                forceReload: props.forceReload
            }
        } );

        if(props.action)
        {
            props.action();
        }
    }

    return (
        <span className={ "pointer_cursor" + ( props.highlight ? " PageSelector_Highlight" : "" ) + ( props.className ? ( " " + props.className ) : "" ) } onClick={ () => setPage( props.page, props.queryParams ) } >{ props.children }</span>
    );
}

export default PageSelector;