import { IServiceError } from "./serviceCallerInterfaces";
import { useContext, useState, useEffect, useRef } from "react";
import { LoginContext, AppLanguageContext } from "../config/appConfig";
import { apiServerUrl } from "../config/configuration";
import { AppLanguage } from "../context/appContextEnums";

const handleErrors = ( response: Response ) => {
    if ( !response.ok ) {
        throw Error( `[${ response.status }] - ${ response.statusText }` );
    }
    return response;
}

interface IfetchArgs {
    serviceUrl: string;
    timeOut?: number;
    externalService?: boolean;
    customHeaders?: Headers;
}

const getHeaders = ( language: AppLanguage, token?: string, isPost?: boolean ) => {
    let headers = new Headers();
    headers.append( 'Accept', 'application/json' );
    headers.append( 'Access-Control-Allow-Headers', 'AppLanguage' );
    headers.append( 'AppLanguage', language );
    
    if( isPost )
    {
        headers.append( 'Access-Control-Allow-Headers', 'Content-Type' );
        headers.append( 'Content-Type', 'application/json' );
    }

    if ( token ) {
        headers.append( 'Access-Control-Allow-Headers', 'Authorization' );
        headers.append( 'Authorization', `Bearer ${ token }` );
    }
    return headers;
}

export const useFetchGetHandler = <FetchDataType> ( { serviceUrl, timeOut, externalService, customHeaders }: IfetchArgs ) =>
{
    const [login] = useContext( LoginContext );
    const [appLanguage] = useContext( AppLanguageContext );
    const [authToken, setAuthToken] = useState<string | undefined>( ( !externalService && login && login.userSessionToken ) || undefined );
    const [header, setHeader] = useState<Headers>( ( customHeaders && customHeaders ) || getHeaders( appLanguage, authToken ) );
    const abortControllerRef = useRef(new AbortController());
    const componentUnmountedRef = useRef(false);

    useEffect( () => {
        if( login && !externalService )
        {
            setAuthToken(login.userSessionToken);
        }
        if( customHeaders ) {
            setHeader(customHeaders);
        }
        else
        {
            setHeader(getHeaders(appLanguage, authToken));
        }
        // eslint-disable-next-line
    }, [appLanguage, login, authToken]);

    useEffect( () => {
        abortControllerRef.current = new AbortController();
        componentUnmountedRef.current = false;
        return () => {
            componentUnmountedRef.current = true;
            abortControllerRef.current.abort();
        }
        // eslint-disable-next-line
    }, [])

    const Get = ( query: string = "" ) => new Promise<FetchDataType | IServiceError>( ( resolve ) => {
        let timeOutabortController = new AbortController();
        let timeout: NodeJS.Timeout | undefined = undefined;
        let unmountListener: NodeJS.Timeout | undefined = undefined;
        if( timeOut && timeOut > 0 ) {
            timeout = setTimeout( () => { timeOutabortController.abort() }, timeOut);
            unmountListener = setInterval( () => {
                if( abortControllerRef.current.signal.aborted && !timeOutabortController.signal.aborted)
                {
                    timeOutabortController.abort();
                }
            }, 200 );
        }
        resolve(
            fetch( ( externalService ? "" : apiServerUrl ) + serviceUrl + query, {
                method: 'GET',
                headers: header,
                mode: 'cors',
                cache: 'default',
                signal: timeOut && timeOut > 0 ? timeOutabortController.signal : abortControllerRef.current.signal
            } )
            .then( handleErrors )
            .then( ( r: Response ) => r.json() )
            .then( ( data: FetchDataType | IServiceError ) => data )
            .finally( () => {
                if(abortControllerRef.current.signal.aborted && !componentUnmountedRef.current)
                {
                    abortControllerRef.current = new AbortController();
                }
                if( timeout !== undefined ) {
                    clearTimeout(timeout);
                    timeout = undefined;
                }
                if( unmountListener !== undefined )
                {
                    clearInterval(unmountListener);
                    unmountListener = undefined;
                }
            })
        );
    });

    const Abort = () => {
        abortControllerRef.current.abort();
    }

    return {Get, Abort};
}

export const useFetchPostHandler = <FetchDataIn, FetchDataOut> ( { serviceUrl, timeOut, externalService, customHeaders }: IfetchArgs  ) =>
{
    const [login] = useContext( LoginContext );
    const [appLanguage] = useContext( AppLanguageContext );
    const [authToken, setAuthToken] = useState<string | undefined>( ( login && login.userSessionToken ) || undefined );
    const [header, setHeader] = useState<Headers>( ( customHeaders && customHeaders ) || getHeaders( appLanguage, authToken, true ) );
    const abortControllerRef = useRef(new AbortController());
    const componentUnmountedRef = useRef(false);

    useEffect( () => {
        if( login && !externalService )
        {
            setAuthToken(login.userSessionToken);
        }

        if(customHeaders)
        {
            setHeader(customHeaders);
        }
        else
        {
            setHeader( getHeaders( appLanguage, authToken, true ) );
        }
        // eslint-disable-next-line
    }, [appLanguage,login, authToken]);

    useEffect( () => {
        abortControllerRef.current = new AbortController();
        componentUnmountedRef.current = false;
        return () => {
            componentUnmountedRef.current = true;
            abortControllerRef.current.abort();
        }
        // eslint-disable-next-line
    }, [])

    const ExecuteFetch = ( method: string, request: FetchDataIn, query: string ) => new Promise<FetchDataOut | IServiceError>( ( resolve ) => {
        let timeOutabortController = new AbortController();
        let timeout: NodeJS.Timeout | undefined = undefined;
        let unmountListener: NodeJS.Timeout | undefined = undefined;
        if( timeOut && timeOut > 0 ) {
            timeout = setTimeout( () => { timeOutabortController.abort() }, timeOut);
            unmountListener = setInterval( () => {
                if( abortControllerRef.current.signal.aborted && !timeOutabortController.signal.aborted)
                {
                    timeOutabortController.abort();
                }
            }, 200 );
        }
        resolve(
            fetch( ( externalService ? "" : apiServerUrl ) + serviceUrl + query, {
                method: method,
                headers: header,
                mode: 'cors',
                cache: 'no-cache',
                body: JSON.stringify( request ),
                signal: timeOut && timeOut > 0 ? timeOutabortController.signal : abortControllerRef.current.signal
            } )
            .then( handleErrors )
            .then( ( r: Response ) => r.json() )
            .then( ( data: FetchDataOut | IServiceError ) => data )
            .finally( () => {
                if(abortControllerRef.current.signal.aborted && !componentUnmountedRef.current)
                {
                    abortControllerRef.current = new AbortController();
                }
                if( timeout !== undefined ) {
                    clearTimeout(timeout);
                    timeout = undefined;
                }
                if( unmountListener !== undefined )
                {
                    clearInterval(unmountListener);
                    unmountListener = undefined;
                }
            })
        );
    });

    const Post = ( request: FetchDataIn, query: string = "" ) => ExecuteFetch( 'POST', request, query );

    const Put = ( request: FetchDataIn, query: string = "" ) => ExecuteFetch( 'PUT', request, query );

    const Delete = ( request: FetchDataIn, query: string = "" ) => ExecuteFetch( 'DELETE', request, query );
        
    const Abort = () => {
            abortControllerRef.current.abort();
    }

    return {Post, Put, Delete, Abort};
}
