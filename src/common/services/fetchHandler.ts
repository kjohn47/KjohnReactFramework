import { IServiceError } from "./serviceCallerInterfaces";
import { useContext, useState, useEffect, useRef } from "react";
import { LoginContext, AppLanguageContext } from "../config/appConfig";
import { apiServerUrl } from "../config/configuration";

const handleErrors = ( response: Response ) => {
    if ( !response.ok ) {
        throw Error( `[${ response.status }] - ${ response.statusText }` );
    }
    return response;
}

export const useFetchGetHandler = <FetchDataType> ( serviceUrl: string, timeOut?: number ) =>
{
    const [login] = useContext( LoginContext );
    const [appLanguage] = useContext( AppLanguageContext );
    const [authToken, setAuthToken] = useState<string | undefined>(undefined);
    const [header, setHeader] = useState<Headers>();
    const abortControllerRef = useRef(new AbortController());

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

    useEffect( () => {
        abortControllerRef.current = new AbortController();
        return () => {
            abortControllerRef.current.abort();
        }
        // eslint-disable-next-line
    }, [])

    const Get = ( query: string = "" ) => new Promise<FetchDataType | IServiceError>( ( resolve ) => {
        abortControllerRef.current = new AbortController();
        if( timeOut && timeOut > 0 )
        {
            setTimeout( () => { abortControllerRef.current.abort() }, timeOut);
        }

        resolve(
            fetch( apiServerUrl + serviceUrl + query, {
                method: 'GET',
                headers: header,
                mode: 'cors',
                cache: 'default',
                signal: abortControllerRef.current.signal
            } )
                .then( handleErrors )
                .then( ( r: Response ) => r.json() )
                .then( ( data: FetchDataType | IServiceError ) => data )
        );
    });

    const Abort = () => {
        abortControllerRef.current.abort();
    }

    return {Get, Abort};
}

export const useFetchPostHandler = <FetchDataIn, FetchDataOut> ( serviceUrl: string, timeOut?: number ) =>
{
    const [login] = useContext( LoginContext );
    const [appLanguage] = useContext( AppLanguageContext );
    const [authToken, setAuthToken] = useState<string | undefined>(undefined);
    const [header, setHeader] = useState<Headers>();
    const abortControllerRef = useRef(new AbortController());

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

    useEffect( () => {
        abortControllerRef.current = new AbortController();
        return () => {
            abortControllerRef.current.abort();
        }
        // eslint-disable-next-line
    }, [])

        const Post = ( request: FetchDataIn, query: string = "" ) => new Promise<FetchDataOut | IServiceError>( ( resolve ) => {
            abortControllerRef.current = new AbortController();
            if( timeOut && timeOut > 0 )
            {
                setTimeout( () => { abortControllerRef.current.abort() }, timeOut);
            }
            resolve(
                fetch( apiServerUrl + serviceUrl + query, {
                    method: 'POST',
                    headers: header,
                    mode: 'cors',
                    cache: 'no-cache',
                    body: JSON.stringify( request ),
                    signal: abortControllerRef.current.signal
                } )
                    .then( handleErrors )
                    .then( ( r: Response ) => r.json() )
                    .then( ( data: FetchDataOut | IServiceError ) => data )
            );
        });

        const Put = ( request: FetchDataIn, query: string = "" ) => new Promise<FetchDataOut | IServiceError>( ( resolve ) => {
            abortControllerRef.current = new AbortController();
            if( timeOut && timeOut > 0 )
            {
                setTimeout( () => { abortControllerRef.current.abort() }, timeOut);
            }
            resolve(
                fetch( apiServerUrl + serviceUrl + query, {
                    method: 'PUT',
                    headers: header,
                    mode: 'cors',
                    cache: 'no-cache',
                    body: JSON.stringify( request ),
                    signal: abortControllerRef.current.signal
                })
                    .then( handleErrors )
                    .then( ( r: Response ) => r.json() )
                    .then( ( data: FetchDataOut | IServiceError ) => data )
            );
        });

        const Delete = ( request: FetchDataIn, query: string = "" ) => new Promise<FetchDataOut | IServiceError>( ( resolve ) => {
            abortControllerRef.current = new AbortController();
            if( timeOut && timeOut > 0 )
            {
                setTimeout( () => { abortControllerRef.current.abort() }, timeOut);
            }
            resolve(
                fetch( apiServerUrl + serviceUrl + query, {
                    method: 'DELETE',
                    headers: header,
                    mode: 'cors',
                    cache: 'no-cache',
                    body: JSON.stringify( request ),
                    signal: abortControllerRef.current.signal
                } )
                    .then( handleErrors )
                    .then( ( r: Response ) => r.json() )
                    .then( ( data: FetchDataOut | IServiceError ) => data )
            );
        });
        
        const Abort = () => {
                abortControllerRef.current.abort();
            }

    return {Post, Put, Delete, Abort};
}
