import React, { useContext } from "react";
import { KnownPages, RouteActions } from "../../../logic/context/Routes/routeContextEnums";
import { RouteContext } from "../../../logic/config/AppProvider";
import { IDictionary, PageType } from "../../../logic/functions/misc";

interface IPageSelector {
    page: PageType;
    queryParams?: IDictionary<string>;
    className?: string;
    highlight?: boolean;
    forceReload?: boolean;
    action?: () => void;
    disabled?: boolean;
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
        <span className={ ( props.disabled ? "" :  "pointer_cursor" + ( props.highlight ? " PageSelector_Highlight" : "" ) ) + ( props.className ? ( " " + props.className ) : "" ) } onClick={ () => !props.disabled ? setPage( props.page, props.queryParams ) : undefined } >{ props.children }</span>
    );
}

export default PageSelector;