import { IServiceError } from "./serviceCallerInterfaces";

const handleErrors = ( response: Response ) => {
    if ( !response.ok ) {
        throw Error( `[${ response.status }] - ${ response.statusText }` );
    }
    return response;
}

export const fetchGetHandler = <FetchDataType> ( url: string, authToken?: string ) => new Promise<FetchDataType | IServiceError>( ( resolve ) => {
    let header = new Headers();
    header.append( 'Accept', 'application/json' );
    if ( authToken )
        header.append( 'Authorization', authToken );
    resolve(
        fetch( url, {
            method: 'GET',
            headers: header,
            mode: 'cors',
            cache: 'default'
        } )
            .then( handleErrors )
            .then( ( r: Response ) => r.json() )
            .then( ( data: FetchDataType | IServiceError ) => data )
    );
} );

export const fetchPostHandler = <FetchDataIn, FetchDataOut> ( url: string, request: FetchDataIn, authToken?: string ) => new Promise<FetchDataOut | IServiceError>( ( resolve ) => {
    let header = new Headers();
    header.append( 'Accept', 'application/json' );
    header.append( 'Content-Type', 'application/json' );
    if ( authToken )
        header.append( 'Authorization', authToken );

    resolve(
        fetch( url, {
            method: 'POST',
            headers: header,
            mode: 'cors',
            cache: 'no-cache',
            body: JSON.stringify( request )
        } )
            .then( handleErrors )
            .then( ( r: Response ) => r.json() )
            .then( ( data: FetchDataOut | IServiceError ) => data )
    );
} );

export const fetchPutHandler = <FetchDataIn, FetchDataOut> ( url: string, request: FetchDataIn, authToken: string ) => new Promise<FetchDataOut | IServiceError>( ( resolve ) => {
    let header = new Headers();
    header.append( 'Accept', 'application/json' );
    header.append( 'Content-Type', 'application/json' );
    header.append( 'Authorization', authToken );

    resolve(
        fetch( url, {
            method: 'PUT',
            headers: header,
            mode: 'cors',
            cache: 'no-cache',
            body: JSON.stringify( request )
        } )
            .then( handleErrors )
            .then( ( r: Response ) => r.json() )
            .then( ( data: FetchDataOut | IServiceError ) => data )
    );
} );

export const fetchDeleteHandler = <FetchDataIn, FetchDataOut> ( url: string, request: FetchDataIn, authToken: string ) => new Promise<FetchDataOut | IServiceError>( ( resolve ) => {
    let header = new Headers();
    header.append( 'Accept', 'application/json' );
    header.append( 'Content-Type', 'application/json' );
    header.append( 'Authorization', authToken );

    resolve(
        fetch( url, {
            method: 'DELETE',
            headers: header,
            mode: 'cors',
            cache: 'no-cache',
            body: JSON.stringify( request )
        } )
            .then( handleErrors )
            .then( ( r: Response ) => r.json() )
            .then( ( data: FetchDataOut | IServiceError ) => data )
    );
} );