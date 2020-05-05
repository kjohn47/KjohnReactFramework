import { IServiceError } from "./serviceCallerInterfaces";
import { useContext, useState, useEffect, useRef } from "react";
import { LoginContext, AppLanguageContext } from "../config/appConfig";
import { apiServerUrl } from "../config/configuration";
import { AppLanguage } from "../context/appContextEnums";
import { HexBase64BinaryEncoding } from "crypto";

const handleErrors = ( response: Response ) => {
    if ( !response.ok ) {
        throw Error( `[${ response.status }] - ${ response.statusText }` );
    }
    return response;
}

const handleLoader = async <TOutput>( r: Response, setLoadState: React.Dispatch<React.SetStateAction<number>> ) => {
    if( r !== null && r.headers !== null && r.body !== null )
    {
        let length = `${r.headers.get('content-length')}`;
        if( length && length !== null && length !== "" )
        {
            const contentLength: number = parseInt(length);
            const reader = r.body.getReader();
            let receivedLength = 0;
            let chunks = [];
            while(true) {
                const {done, value} = await reader.read();
                if (done) {
                    break;
                }

                chunks.push(value);
                if( value )
                {
                    receivedLength += value.length;
                    setLoadState( receivedLength < contentLength ? Math.floor( ( receivedLength * 100 ) / contentLength ) : 99 );
                }
            }
            let chunksAll = new Uint8Array(receivedLength);
            let position = 0;
            if(chunks !== undefined)
            {
                for(let chunk of chunks as Uint8Array[]) {
                    chunksAll.set(chunk, position);
                    position += chunk.length;
                }
            }
            setLoadState(100);
            return JSON.parse(new TextDecoder("utf-8").decode(chunksAll)) as TOutput;
        }
    }
    return await r.json() as TOutput;
}

interface IfetchArgs {
    serviceUrl: string;
    timeOut?: number;
    externalService?: boolean;
    customHeaders?: Headers | [string, string][];
}

interface IdownloadArgs extends IfetchArgs {
    documentPath: string;
}

export interface IdownloadDocument extends IServiceError {
    name: string;
    extension: string;
    data: HexBase64BinaryEncoding[];
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
    const [header, setHeader] = useState<Headers | [string, string][]>( ( customHeaders && customHeaders ) || getHeaders( appLanguage, authToken ) );
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
    const [header, setHeader] = useState<Headers | [string, string][]>( ( customHeaders && customHeaders ) || getHeaders( appLanguage, authToken, true ) );
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

export const useDocumentDownloader = ( { serviceUrl, documentPath, timeOut, externalService, customHeaders } : IdownloadArgs ) => {
    const [login] = useContext( LoginContext );
    const [appLanguage] = useContext( AppLanguageContext );
    const [authToken, setAuthToken] = useState<string | undefined>( ( login && login.userSessionToken ) || undefined );
    const [header, setHeader] = useState<Headers | [string,string][]>( ( customHeaders && customHeaders ) || getHeaders( appLanguage, authToken, true ) );
    const [isDownloading, setIsDownloading] = useState<boolean>(false);
    const [downloadProgress, setDownloadProgress] = useState<number>(0);
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

    const download = async (): Promise<IdownloadDocument | undefined> => {
        if(!isDownloading)
        {
            setIsDownloading(true);
            let timeout: NodeJS.Timeout | undefined = undefined;
            if( timeOut && timeOut > 0 ) {
                timeout = setTimeout( () => { abortControllerRef.current.abort() }, timeOut);
            }

            const response = fetch( ( externalService ? "" : apiServerUrl ) + serviceUrl + documentPath, {
                method: 'GET',
                headers: header,
                mode: 'cors',
                cache: 'no-cache',
                signal: abortControllerRef.current.signal
            } )
            .then( handleErrors )
            .then( async ( r: Response ) => handleLoader<IdownloadDocument>( r, setDownloadProgress ) )
            .then( ( data: IdownloadDocument ) => data )
            .catch( ( err: Error ) => (
            {
                hasError: true,
                isAbortError: err.name === 'AbortError',
                caughtError: `${err.name} - ${err.message}`
            } ) as IdownloadDocument )
            .finally( () => {
                if( timeout !== undefined ) {
                    clearTimeout(timeout);
                    timeout = undefined;
                }
                if(!componentUnmountedRef.current)
                {
                    setIsDownloading(false);
                    setDownloadProgress(0);
                    abortControllerRef.current = new AbortController();
                }
            })

            return await response;
        }
        return undefined;
    }

    const abort = () => {
        abortControllerRef.current.abort();
    }

    return { download, abort, isDownloading, downloadProgress }
}