import { IServiceError, IdownloadDocument } from "./serviceCallerInterfaces";
import { useState, useEffect, useRef, useMemo } from "react";
import { apiServerUrl } from "../config/configuration";
import { getFileFromBase64, IDictionary, downloadFile, decodeUnit8Blob } from "../functions/misc";
import useLoginHandler from "../context/Login/LoginContextHandler";
import useAppLanguageHandler from "../context/App/AppLanguageContextHandler";
import { useKnownServices } from "../context/App/knownServicesContextHandler";
import { getQueryStringFromDictionary } from "../functions/routeHandling";

const handleErrors = ( response: Response ) => {
    if ( !response.ok ) {
        throw Error( `[${ response.status }] - ${ response.statusText }` );
    }
    return response;
}

const getRouteUrl = ( action: string, route: string | undefined, query: IDictionary<string> | undefined): string => {
    const queryStr = getQueryStringFromDictionary(query);
    return `${action !== "" ? `/${action}` : ""}${route ? `/${route}` : ""}${queryStr}`;
}

interface IfetchArgs {
    serviceUrl: string;
    timeOut?: number;
    externalService?: boolean;
    customHeaders?: Headers | [string, string][];
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

const getHeaders = ( isExternal? : boolean, language?: string, token?: string, isPost?: boolean ) => {
    let headers = new Headers();
    headers.append( 'Accept', 'application/json' );
    
    if(!isExternal && language)
    {
        headers.append( 'Access-Control-Allow-Headers', 'AppLanguage' );
        headers.append( 'AppLanguage', language );
    }
    
    if( isPost )
    {
        headers.append( 'Access-Control-Allow-Headers', 'Content-Type' );
        headers.append( 'Content-Type', 'application/json' );
    }

    if ( !isExternal && token ) {
        headers.append( 'Access-Control-Allow-Headers', 'Authorization' );
        headers.append( 'Authorization', `Bearer ${ token }` );
    }
    return headers;
}

export const useFetchGetHandler = <FetchDataType> ( { serviceUrl, timeOut, externalService, customHeaders }: IfetchArgs ) =>
{
    const login = useLoginHandler().Login;
    const {appLanguage} = useAppLanguageHandler();
    const {getKnownService, getKnownAction} = useKnownServices();
    const [authToken, setAuthToken] = useState<string | undefined>( ( !externalService && login && login.userSessionToken ) || undefined);
    const [header, setHeader] = useState<Headers | [string, string][]>((customHeaders && customHeaders) || getHeaders(externalService, appLanguage, authToken));
    const service = useMemo(() => {
        if(externalService)
        {
            return serviceUrl;
        }
        return `${apiServerUrl}${getKnownService(serviceUrl)}`;
    }, [getKnownService, externalService, serviceUrl]);

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
            setHeader(getHeaders(externalService, appLanguage,authToken));
        }
        // eslint-disable-next-line
    }, [externalService, appLanguage, login, authToken]);

    useEffect( () => {
        abortControllerRef.current = new AbortController();
        componentUnmountedRef.current = false;
        return () => {
            componentUnmountedRef.current = true;
            abortControllerRef.current.abort();
        }
        // eslint-disable-next-line
    }, [])

    const Get = ( action: string = "", 
            route: string | undefined = undefined,
            query: IDictionary<string> | undefined = undefined ) => new Promise<FetchDataType | IServiceError>( ( resolve ) => {
        
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
        resolve(
            fetch( `${service}${externalService ? getRouteUrl(action, route, query) : getKnownAction(serviceUrl, action, route, query)}`, {
                method: 'GET',
                headers: header,
                mode: 'cors',
                cache: 'default',
                signal: timeOut && timeOut > 0 ? timeOutAbortController.signal : abortControllerRef.current.signal
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
    const login = useLoginHandler().Login;
    const {appLanguage} = useAppLanguageHandler();
    const {getKnownService, getKnownAction} = useKnownServices();
    const [authToken, setAuthToken] = useState<string | undefined>( ( !externalService && login && login.userSessionToken ) || undefined );
    const [header, setHeader] = useState<Headers | [string, string][]>( ( customHeaders && customHeaders ) || getHeaders(externalService, appLanguage, authToken, true) 
    );
    const service = useMemo(() => {
        if(externalService)
        {
            return serviceUrl;
        }
        return `${apiServerUrl}${getKnownService(serviceUrl)}`;
    }, [getKnownService, externalService, serviceUrl]);

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
            setHeader(getHeaders(externalService, appLanguage, authToken, true));
        }
        // eslint-disable-next-line
    }, [externalService, appLanguage, login, authToken]);

    useEffect( () => {
        abortControllerRef.current = new AbortController();
        componentUnmountedRef.current = false;
        return () => {
            componentUnmountedRef.current = true;
            abortControllerRef.current.abort();
        }
        // eslint-disable-next-line
    }, [])

    const ExecuteFetch = ( method: string, 
        request: FetchDataIn, 
        action: string = "", 
        route: string | undefined = undefined,
        query: IDictionary<string> | undefined = undefined ) => new Promise<FetchDataOut | IServiceError>( ( resolve ) => {

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
        resolve(
            fetch( `${service}${externalService ? getRouteUrl(action, route, query) : getKnownAction(serviceUrl, action, route, query)}`, {
                method: method,
                headers: header,
                mode: 'cors',
                cache: 'no-cache',
                body: JSON.stringify( request ),
                signal: timeOut && timeOut > 0 ? timeOutAbortController.signal : abortControllerRef.current.signal
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

    const Post = ( request: FetchDataIn,
        action: string = "", 
        route: string | undefined = undefined,
        query: IDictionary<string> | undefined = undefined  ) => ExecuteFetch( 'POST', request, action, route, query );

    const Put = ( request: FetchDataIn,
        action: string = "", 
        route: string | undefined = undefined,
        query: IDictionary<string> | undefined = undefined  ) => ExecuteFetch( 'PUT', request, action, route, query );

    const Delete = ( request: FetchDataIn,
        action: string = "", 
        route: string | undefined = undefined,
        query: IDictionary<string> | undefined = undefined  ) => ExecuteFetch( 'DELETE', request, action, route, query );
        
    const Abort = () => {
            abortControllerRef.current.abort();
    }

    return {Post, Put, Delete, Abort};
}

export const useDocumentDownloader = ( { 
                                        serviceUrl,
                                        documentPath,
                                        documentId,
                                        timeOut,
                                        externalService,
                                        customHeaders,
                                        loadProgress,
                                        fileMetadata,
                                        rawDownload,
                                        returnResultAfterDownloaded
                                    } : IdownloadArgs ) => {
    const login = useLoginHandler().Login;
    const {appLanguage} = useAppLanguageHandler();
    const {getKnownService, getKnownAction} = useKnownServices();
    const [authToken, setAuthToken] = useState<string | undefined>( ( !externalService && login && login.userSessionToken ) || undefined );
    const [header, setHeader] = useState<Headers | [string,string][]>((customHeaders && customHeaders) || getHeaders(externalService, appLanguage, authToken) 
    );
    const [isDownloading, setIsDownloading] = useState<boolean>(false);
    const [downloadProgress, setDownloadProgress] = useState<number>(0);
    const downloadUrl = useMemo(() => {
        if(externalService)
        {
            return `${serviceUrl}/${documentPath}${documentId ? `/${documentId}` : ""}`;
        }
        return `${apiServerUrl}${getKnownService(serviceUrl)}${getKnownAction(serviceUrl, documentPath, documentId)}`;
    }, [getKnownService, getKnownAction, externalService, serviceUrl, documentPath, documentId]);

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
            setHeader(getHeaders(externalService, appLanguage, authToken));
        }
        // eslint-disable-next-line
    }, [externalService, appLanguage, login, authToken]);

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

            return await fetch( downloadUrl, {
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