import React, { useContext } from "react";
import { KnownPages, ContextActions } from "../../common/context/appContextEnums";
import { AppContext, ErrorContext } from "../../common/config/appConfig";
import { ErrorActions } from "../../common/context/appErrorEnums";

interface IPageSelector {
    page: KnownPages;
    queryParams?: object;
    className?: string;
    highlight?: boolean;
    forceReload?: boolean;
    action?: () => void;
}

const PageSelector: React.FC<IPageSelector> = ( props ) => {
    const setAppContext = useContext( AppContext )[ 1 ];
    const setErrorContext = useContext( ErrorContext )[ 1 ];
    const setPage = ( page: KnownPages, queryParams?: any ) => {

        setErrorContext( {
            type: ErrorActions.RemoveError
        } );

        let queryString = queryParams === undefined ? "" : "?" + new URLSearchParams( queryParams ).toString();

        if ( page === KnownPages.Home || page.toString() === "" || page.toString() === "/" ) {
            page = KnownPages.Home;
            window.history.pushState( {}, "", "/" + ( queryString !== "" ? page.toString() + queryString : "" ) );
        }
        else {
            window.history.pushState( {}, "", "/" + page.toString() + queryString );
        }

        setAppContext( {
            type: ContextActions.ChangePage,
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