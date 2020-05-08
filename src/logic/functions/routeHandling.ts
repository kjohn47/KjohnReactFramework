import { KnownPages } from "../context/Routes/routeContextEnums";
import { IDictionary } from "./misc";

export const getQueryStringParams = ( queryString: string ) => {
    if(queryString.length > 0)
    {
        let queryParams: URLSearchParams = new URLSearchParams( queryString );
        let result: IDictionary<string> = {};

        
        queryParams.forEach( ( val, key ) => {
            result[ key ] = val;
        } );

        return result;
    }
    return undefined;
}


export const getRouteUrlAndQuery = () => {
    if ( window.location.pathname.substring( 1 ) === "" ) {
        return {
            selectedPage: KnownPages.Home,
            queryString: getQueryStringParams( window.location.search.substring( 1 ) )
        };
    }
    return {
        selectedPage: window.location.pathname.substring( 1 ),
        queryString:  getQueryStringParams( window.location.search.substring( 1 ) )
    }
}
