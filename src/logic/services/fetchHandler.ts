import { IServiceError, IdownloadDocument, IKRFApiError, IKRFRefreshTokenFetch } from "./serviceCallerInterfaces";
import { useState, useEffect, useRef, useMemo } from "react";
import { getFileFromBase64, IDictionary, downloadFile, decodeUnit8Blob } from "../functions/misc";
import useLoginHandler from "../context/Login/LoginContextHandler";
import useAppLanguageHandler from "../context/App/AppLanguageContextHandler";
import { useKnownServices } from "../context/App/knownServicesContextHandler";
import { getQueryStringFromDictionary } from "../functions/routeHandling";
import { krfRefreshToken } from "../config/configuration";
import { RefreshTokenType } from "../context/Login/loginContextInterfaces";

interface IfetchArgs {
    serviceUrl: string;
    timeOut?: number;
    customHeaders?: Headers | [string, string][];
}

interface IFetchRoute {
    action?: string; 
    route?: string;
    query?: IDictionary<string>;
}

export interface IFileMetadata {
    fileName: string;
    fileExtension: string;
}

export interface IdownloadArgs extends IfetchArgs {
    documentPath: string;
    documentId?: string;
    loadProgress?: boolean;
    fileMetadata?: IFileMetadata;
    rawDownload?: boolean;
    returnResultAfterDownloaded?: boolean;
}

const getHeaders = ( isExternal? : boolean, language?: string, token?: string, isPost?: boolean, rawResponse?: boolean ) => {
    let headers = new Headers();
    
    headers.append( 'Accept', `application/${(rawResponse ? 'octet-stream' : 'json')}` );
    
    if(!isExternal && language)
    {
        headers.append( 'Access-Control-Allow-Headers', 'AppLanguage' );
        headers.append( 'AppLanguage', language );
    }

    if ( !isExternal && token ) {
        //change authorization to env variable
        headers.append( 'Access-Control-Allow-Headers', 'Authorization' );
        headers.append( 'Authorization', `Bearer ${ token }` );
    }

    if( isPost )
    {
        headers.append( 'Access-Control-Allow-Headers', 'Content-Type' );
        headers.append( 'Content-Type', 'application/json' );
    }

    return headers;
}

const isRefreshTokenError = ( r: Response ): boolean =>  krfRefreshToken.isEnabled && r.status === 401 && r.headers.get(krfRefreshToken.header) === krfRefreshToken.header_Code;

const fetchRefreshToken = async ( 
    authToken: string, 
    refreshToken: string,
    language: string,
    isPost: boolean,
    fetchHandler: (headers?: HeadersInit) => Promise<Response>,
    updateUserToken: RefreshTokenType,
    forceUserLogout: () => void,
    abortSignal: AbortSignal) => {

    return await fetch( krfRefreshToken.url, {
        method: 'POST',
        headers: getHeaders(false, language, authToken, true),
        mode: 'cors',
        cache: 'default',
        signal: abortSignal,
        body: JSON.stringify( ( {
            authToken,
            refreshToken
        } ) as IKRFRefreshTokenFetch )
    } ).then( async r => {
        if( r.ok )
        {
            let newAuthToken = await r.json() as IKRFRefreshTokenFetch;
            if( newAuthToken != null && newAuthToken.authToken !== "" )
            {
                updateUserToken( newAuthToken.authToken, newAuthToken.refreshToken );
                return await fetchHandler(getHeaders(false, language, newAuthToken.authToken, isPost))
            }
        }

        forceUserLogout();
        return r;
    });
}

const parseKrfApiError = async ( r: Response ): Promise<IServiceError> => {
    let err: IKRFApiError = await r.json();// as apiErr;
    return ({
        hasError: true,
        caughtError: `[${ r.status }] - ${ r.statusText }`,
        krfApiError: err
    }) as IServiceError;
}

const getRouteUrl = ( url: string, action: string | undefined, route: string | undefined, query: IDictionary<string> | undefined): string => {
    const queryStr = getQueryStringFromDictionary(query);
    return `${url}${action ? `/${action}` : ""}${route ? `/${route}` : ""}${queryStr}`;
}

const checkErternalUrl = (url: string) => {
    const urlLowerCase = url.toLocaleLowerCase();
    return urlLowerCase.startsWith("http://") || urlLowerCase.startsWith("https://"); 
}

export const useFetchHandler = ( { serviceUrl, timeOut, customHeaders }: IfetchArgs ) =>
{
    const { Login: login, MakeLogout, RefreshToken } = useLoginHandler();
    const {appLanguage} = useAppLanguageHandler();
    const {getKnownService, getKnownAction} = useKnownServices();

    const service = useMemo(() => getKnownService(serviceUrl), [getKnownService, serviceUrl]);

    const externalService = useMemo(() => checkErternalUrl(serviceUrl), [serviceUrl]);

    const authToken = useMemo<string | undefined>(() => {
        return ( !externalService && login && login.userSessionToken ) || undefined;
    }, [login, externalService]);

    const header = useMemo<Headers | [string, string][]>(() => {
        return (customHeaders && customHeaders) || getHeaders(externalService, appLanguage, authToken);
    }, [customHeaders, authToken, appLanguage, externalService]);

    const abortControllerRef = useRef(new AbortController());
    const componentUnmountedRef = useRef(false);

    useEffect( () => {
        abortControllerRef.current = new AbortController();
        componentUnmountedRef.current = false;
        return () => {
            componentUnmountedRef.current = true;
            abortControllerRef.current.abort();
        }
        // eslint-disable-next-line
    }, [])

    const ExecuteFetch = <TRequest, TResponse> ( method: string, { action, route, query}: IFetchRoute, request? : TRequest ) => new Promise<TResponse | IServiceError>((resolve) => {
        let timeOutAbortController = new AbortController();
        let timeout: NodeJS.Timeout | undefined = undefined;
        let unmountListener: NodeJS.Timeout | undefined = undefined;
        if( timeOut && timeOut > 0 ) {
            timeout = setTimeout( () => { timeOutAbortController.abort() }, timeOut);
            unmountListener = setInterval( () => {
                if( abortControllerRef.current.signal.aborted && !timeOutAbortController.signal.aborted)
                {
                    timeOutAbortController.abort();
                }
            }, 200 );
        }
        
        const isPost = method === 'POST' || method === 'PUT';
        if(isPost && customHeaders === undefined)
        {
            //In case of error, copy the header to temp variable
            (header as Headers).append( 'Access-Control-Allow-Headers', 'Content-Type' );
            (header as Headers).append( 'Content-Type', 'application/json' );
        }

        const fetchAbortSignal = timeOut && timeOut > 0 ? timeOutAbortController.signal : abortControllerRef.current.signal;

        const fetchHandler = (headers?: HeadersInit) => fetch( `${externalService ? getRouteUrl(serviceUrl, action, route, query) : getKnownAction(service, action, route, query)}`, {
            method: method,
            headers: headers,
            mode: 'cors',
            cache: 'default',
            signal: fetchAbortSignal,
            body: isPost && request !== undefined ? JSON.stringify( request ) : undefined
        } );

        resolve(
            fetchHandler(header)
            .then( async ( r: Response ) => {
                if(r.ok) {
                    return await r.json() as TResponse;
                }
                if(!externalService)
                {

                    if( login &&
                        authToken !== undefined && 
                        login.refreshToken !== undefined &&
                        isRefreshTokenError(r) )
                    {
                        return await fetchRefreshToken(
                            authToken, 
                            login.refreshToken,
                            appLanguage, 
                            isPost, 
                            fetchHandler, 
                            RefreshToken,                            
                            MakeLogout, 
                            fetchAbortSignal )
                            .then( async (response) => {                            
                                if( response.ok )
                                {
                                    return await response.json() as TResponse;
                                }
            
                            return await parseKrfApiError( response );
                            });
                    }
            
                    return await parseKrfApiError( r );
                }

                throw Error(`[${ r.status }] - ${ r.statusText }`);
            } )
            .catch( ( err: Error ) => ( {
                hasError: true,
                caughtError: err.message,
                isAbortError: err.name === 'AbortError'
            } ) as IServiceError )
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
    })

    const Get = <TFetchDataOut> ( { action, route, query}: IFetchRoute ) => ExecuteFetch<undefined, TFetchDataOut>('GET', { action, route, query } );
    const Post = <TFetchDataIn, TFetchDataOut>( request: TFetchDataIn, { action, route, query}: IFetchRoute) => ExecuteFetch<TFetchDataIn, TFetchDataOut>( 'POST', { action, route, query }, request );
    const Put = <TFetchDataIn, TFetchDataOut>( request: TFetchDataIn, { action, route, query}: IFetchRoute) => ExecuteFetch<TFetchDataIn, TFetchDataOut>( 'PUT', { action, route, query }, request );
    const Delete = <TFetchDataOut> ( { action, route, query}: IFetchRoute ) => ExecuteFetch<undefined, TFetchDataOut>('DELETE', { action, route, query } );

    const Abort = () => {
        abortControllerRef.current.abort();
    }

    return {Get, Post, Put, Delete, Abort};
}

export const useDocumentDownloader = ( { 
                                        serviceUrl,
                                        documentPath,
                                        documentId,
                                        timeOut,
                                        customHeaders,
                                        loadProgress,
                                        fileMetadata,
                                        rawDownload,
                                        returnResultAfterDownloaded
                                    } : IdownloadArgs ) => {
    const { Login: login, MakeLogout, RefreshToken } = useLoginHandler();
    const {appLanguage} = useAppLanguageHandler();
    const {getKnownService, getKnownAction} = useKnownServices();
    const [isDownloading, setIsDownloading] = useState<boolean>(false);
    const [downloadProgress, setDownloadProgress] = useState<number>(0);
    const externalService = useMemo(() => checkErternalUrl(serviceUrl), [serviceUrl]);
    const downloadUrl = useMemo(() => {
        if(externalService)
        {
            return `${serviceUrl}/${documentPath}${documentId ? `/${documentId}` : ""}`;
        }
        return `${getKnownAction(getKnownService(serviceUrl), documentPath, documentId)}`;
    }, [getKnownService, getKnownAction, externalService, serviceUrl, documentPath, documentId]);

    const authToken = useMemo<string | undefined>(() => {
        return ( !externalService && login && login.userSessionToken ) || undefined;
    }, [login, externalService]);

    const header = useMemo<Headers | [string, string][]>(() => {
        return (customHeaders && customHeaders) || getHeaders(externalService, appLanguage, authToken, false, (externalService || rawDownload));
    }, [customHeaders, authToken, appLanguage, externalService, rawDownload]);

    const abortControllerRef = useRef(new AbortController());
    const componentUnmountedRef = useRef(false);

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

            const downloadFetch = (headers?: HeadersInit) => fetch( downloadUrl, {
                method: 'GET',
                headers: headers,
                mode: 'cors',
                cache: 'no-cache',
                signal: abortControllerRef.current.signal
            } )

            return await downloadFetch(header)
            .then( async (r: Response) => {
                if( r.ok )
                {
                    return r;
                }

                if( !externalService )
                {

                    if( login &&
                        authToken !== undefined && 
                        login.refreshToken !== undefined && 
                        isRefreshTokenError(r) )
                    {
                        return await fetchRefreshToken(
                            authToken, 
                            login.refreshToken, 
                            appLanguage, 
                            false, 
                            downloadFetch, 
                            RefreshToken,
                            MakeLogout, 
                            abortControllerRef.current.signal
                        ).then( async (response) => {            
                            if(response.ok)
                            {
                                return response;
                            }
                
                            let err = await response.text();
                            throw new Error(`${ response.status };;${ response.statusText };;${err}`);
                        } );
                    }
            
                    let err = await r.text();
                    throw new Error(`${ r.status };;${ r.statusText };;${err}`);
                }

                throw new Error(`[${ r.status }] - ${ r.statusText }`);
            } )
            .then( async ( r: Response ) => {
                if( loadProgress && r !== null && r.headers !== null && r.body !== null )
                {
                    let length = `${r.headers.get('content-length')}`;
                    if( length && length !== null && length !== "" )
                    {
                        const contentLength: number = parseInt(length);
                        const reader = r.body.getReader();
                        let receivedLength = 0;
                        let chunks: number[] = [];

                        return reader.read().then( function process( { done, value } ): Promise<IdownloadDocument | Uint8Array> | IdownloadDocument | Uint8Array {
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
                                
                                if(externalService || rawDownload)
                                {
                                    return chunksAll;
                                }

                                return JSON.parse(decodeUnit8Blob(chunksAll)) as IdownloadDocument
                            }
                        } )
                    }
                }
                if(externalService || rawDownload)
                {
                    return r.blob();
                }

                return r.json();
            } )
            .then( ( data: IdownloadDocument & Uint8Array ) => {
                if(externalService || rawDownload)
                {
                    const name = fileMetadata? fileMetadata.fileName : (documentId ? documentId.split('.')[0] : documentPath.split('.')[0]);
                    const extension = fileMetadata ? fileMetadata.fileExtension : (documentId ? documentId.split('.')[1] : documentPath.split('.')[1]);
                    downloadFile(data, name, extension);
                    if(returnResultAfterDownloaded)
                        return {
                            name: name,
                            extension: extension,
                            dataBytes: data
                        } as IdownloadDocument;
                }
                else
                {
                    const dataOut = data as IdownloadDocument;
                    if(dataOut.dataBytes)
                    {
                        downloadFile(dataOut.dataBytes, 
                                    fileMetadata ? fileMetadata.fileName : dataOut.name, 
                                    fileMetadata ? fileMetadata.fileExtension : dataOut.extension);
                    }
                    else if(dataOut.dataBase64)
                    {
                        downloadFile(getFileFromBase64(dataOut.dataBase64),
                                    fileMetadata ? fileMetadata.fileName : dataOut.name, 
                                    fileMetadata ? fileMetadata.fileExtension : dataOut.extension);
                    }
                    if(returnResultAfterDownloaded)
                        return data;
                }
                return undefined;
            } )
            .catch( ( err: Error ) => {
                let splitErr = err.message.split(';;');
                if(splitErr.length === 3)
                {
                    return (
                        {
                            hasError: true,
                            isAbortError: err.name === 'AbortError',
                            caughtError: `${splitErr[0]} - ${splitErr[1]}`,
                            krfApiError: JSON.parse(splitErr[2])
                        } ) as IdownloadDocument 
                }

                return (
                {
                    hasError: true,
                    isAbortError: err.name === 'AbortError',
                    caughtError: `${err.name} - ${err.message}`
                } ) as IdownloadDocument })
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