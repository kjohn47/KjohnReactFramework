import React, { useContext } from "react";
import { KnownPages, RouteActions } from "../../common/context/routeContextEnums";
import { RouteContext } from "../../common/config/appConfig";

interface IPageSelector {
    page: KnownPages;
    queryParams?: object;
    className?: string;
    highlight?: boolean;
    forceReload?: boolean;
    action?: () => void;
}

const PageSelector: React.FC<IPageSelector> = ( props ) => {
    const setRoute = useContext( RouteContext )[ 1 ];
    const setPage = ( page: KnownPages, queryParams?: any ) => {

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
                queryString: JSON.stringify( queryParams ),
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