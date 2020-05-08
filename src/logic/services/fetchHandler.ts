import { IServiceError, IdownloadDocument } from "./serviceCallerInterfaces";
import { useContext, useState, useEffect, useRef } from "react";
import { LoginContext, AppLanguageContext } from "../config/AppProvider";
import { apiServerUrl } from "../config/configuration";
import { AppLanguage } from "../context/App/appContextEnums";
import { getFileFromBase64 } from "../functions/misc";

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
    customHeaders?: Headers | [string, string][];
}

export interface IdownloadArgs extends IfetchArgs {
    documentPath: string;
    loadProgress?: boolean;
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

export const useDocumentDownloader = ( { serviceUrl, documentPath, timeOut, externalService, customHeaders, loadProgress } : IdownloadArgs ) => {
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
            if(abortControllerRef.current.signal.aborted)
            {
                abortControllerRef.current = new AbortController();
            }
            
            setIsDownloading(true);
            let timeout: NodeJS.Timeout | undefined = undefined;
            if( timeOut && timeOut > 0 ) {
                timeout = setTimeout( () => { abortControllerRef.current.abort() }, timeOut);
            }

            return await fetch( ( externalService ? "" : apiServerUrl ) + serviceUrl + documentPath, {
                method: 'GET',
                headers: header,
                mode: 'cors',
                cache: 'no-cache',
                signal: abortControllerRef.current.signal
            } )
            .then( handleErrors )
            .then( ( r: Response ) => {
                if( loadProgress && r !== null && r.headers !== null && r.body !== null )
                {
                    let length = `${r.headers.get('content-length')}`;
                    if( length && length !== null && length !== "" )
                    {
                        const contentLength: number = parseInt(length);
                        const reader = r.body.getReader();
                        let receivedLength = 0;
                        let chunks: number[] = [];

                        return reader.read().then( function process( { done, value } ): Promise<IdownloadDocument> | IdownloadDocument {
                            if( !done )
                            {
                                if( value )
                                {
                                    chunks = [ ...chunks, ...Array.from<number>(value) ];
                                    receivedLength += value.length;
                                    setDownloadProgress( receivedLength < contentLength ? Math.floor( ( receivedLength * 100 ) / contentLength ) : 99 );
                                }
                                return reader.read().then(process);
                            }
                            else
                            {
                                let chunksAll = new Uint8Array(chunks.length);
                                chunksAll.set( chunks );
                                chunks = [];
        
                                setDownloadProgress(100);
                                if (!("TextDecoder" in window))
                                {
                                    let data: string = "";
        
                                    chunksAll.forEach( c => {
                                        data += String.fromCharCode( c );
                                    } );
        
                                    return JSON.parse(data) as IdownloadDocument;
                                }
                                else
                                {
                                    return JSON.parse(new TextDecoder("utf-8").decode(chunksAll)) as IdownloadDocument;
                                }
                            }
                        } )
                    }
                }
                return r.json();
            } )
            .then( ( data: IdownloadDocument ) => {
                getFileFromBase64( data);
                return data;
            } )
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
        }
    }

    const abort = () => {
        abortControllerRef.current.abort();
    }

    return { download, abort, isDownloading, downloadProgress }
}