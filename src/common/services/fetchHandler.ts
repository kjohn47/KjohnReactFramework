import { IServiceError } from "./serviceCallerInterfaces";

const handleErrors = ( response: Response ) => {
    if ( !response.ok ) {
        throw Error( `[${response.status}] - ${response.statusText}` );
    }
    return response;
}

export const fetchGetHandler = <FetchDataType, FetchDataOut> ( url: string, method?: ( data: FetchDataType | IServiceError ) => FetchDataOut | IServiceError ) => new Promise<FetchDataOut | IServiceError>( ( resolve ) => {
    resolve(
        fetch( url )
            .then( handleErrors )
            .then( ( r ) => r.json() )
            .then( ( data: FetchDataType | IServiceError ) => method ? method( data ) : data )
    );
} );