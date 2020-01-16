import { IServiceError } from "./serviceCallerInterfaces";
import { useContext, useState, useEffect } from "react";
import { LoginContext, AppLanguageContext } from "../config/appConfig";

const handleErrors = ( response: Response ) => {
    if ( !response.ok ) {
        throw Error( `[${ response.status }] - ${ response.statusText }` );
    }
    return response;
}

export const useFetchGetHandler = <FetchDataType> ( serviceUrl: string ) =>
{
    const [login] = useContext( LoginContext );
    const [appLanguage] = useContext( AppLanguageContext );
    const [authToken, setAuthToken] = useState<string | undefined>(undefined);
    const [header, setHeader] = useState<Headers>();
    useEffect( () => {
        if( login )
        {
            setAuthToken(login.userSessionToken);
        }
    
        let headers = new Headers();
        headers.append( 'Accept', 'application/json' );
        headers.append( 'Access-Control-Allow-Headers', 'AppLanguage' );
        headers.append( 'AppLanguage', appLanguage );
        if ( authToken ) {
            headers.append( 'Access-Control-Allow-Headers', 'Authorization' );
            headers.append( 'Authorization', `Bearer ${ authToken }` );
        }
        setHeader(headers);
        // eslint-disable-next-line
    }, [appLanguage,login]);

    const Get = ( query: string = "" ) => new Promise<FetchDataType | IServiceError>( ( resolve ) => {
                resolve(
                    fetch( serviceUrl + query, {
                        method: 'GET',
                        headers: header,
                        mode: 'cors',
                        cache: 'default'
                    } )
                        .then( handleErrors )
                        .then( ( r: Response ) => r.json() )
                        .then( ( data: FetchDataType | IServiceError ) => data )
                );
            });
    return Get;
}

export const useFetchPostHandler = <FetchDataIn, FetchDataOut> ( serviceUrl: string ) =>
{
    const [login] = useContext( LoginContext );
    const [appLanguage] = useContext( AppLanguageContext );
    const [authToken, setAuthToken] = useState<string | undefined>(undefined);
    const [header, setHeader] = useState<Headers>();
    useEffect( () => {
        if( login )
        {
            setAuthToken(login.userSessionToken);
        }
    
        let headers = new Headers();
        headers.append( 'Accept', 'application/json' );
        headers.append( 'Access-Control-Allow-Headers', 'Content-Type' );
        headers.append( 'Content-Type', 'application/json' );
        headers.append( 'Access-Control-Allow-Headers', 'AppLanguage' );
        headers.append( 'AppLanguage', appLanguage );
        if ( authToken ) {
            headers.append( 'Access-Control-Allow-Headers', 'Authorization' );
            headers.append( 'Authorization', `Bearer ${ authToken }` );
        }
        setHeader(headers);
        // eslint-disable-next-line
    }, [appLanguage,login]);

        const Post = ( request: FetchDataIn, query: string = "" ) => new Promise<FetchDataOut | IServiceError>( ( resolve ) => {
                resolve(
                    fetch( serviceUrl + query, {
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
            });

        const Put = ( request: FetchDataIn, query: string = "" ) => new Promise<FetchDataOut | IServiceError>( ( resolve ) => {
                resolve(
                    fetch( serviceUrl + query, {
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
            });

        const Delete = ( request: FetchDataIn, query: string = "" ) => new Promise<FetchDataOut | IServiceError>( ( resolve ) => {
                resolve(
                    fetch( serviceUrl + query, {
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
            });

    return {Post, Put, Delete};
}
