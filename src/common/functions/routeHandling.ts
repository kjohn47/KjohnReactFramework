import { KnownPages } from "../context/appContextEnums";

export const getQueryStringParams = <IQueryType> ( queryString: string ): IQueryType => {
    let queryParams: URLSearchParams = new URLSearchParams( queryString );
    let result: { [ key: string ]: any } = {}

    queryParams.forEach( ( val, key ) => {
        result[ key ] = val;
    } );

    return result as IQueryType;
}


export const getRouteUrlAndQuery = () => {
    if ( window.location.pathname.substring( 1 ) === "" ) {
        return {
            selectedPage: KnownPages.Home,
            queryString: undefined
        };
    }
    return {
        selectedPage: window.location.pathname.substring( 1 ) as KnownPages,
        queryString: JSON.stringify( getQueryStringParams<any>( window.location.search.substring( 1 ) ) )
    }
}
