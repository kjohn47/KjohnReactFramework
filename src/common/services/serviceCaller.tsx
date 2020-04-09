import { useContext, useState, useRef, useEffect } from 'react';
import { AppContext, LoadingContext, ErrorContext, LoginContext, AppLanguageContext } from '../config/appConfig';
import { ErrorActions, ErrorCodes } from "../context/appErrorEnums";
import { IContext, IServiceError, ServiceCallType, ServiceType } from "./serviceCallerInterfaces";

interface IServiceCallerArgs<IServiceRequest, IServiceResponse> {
    service: ServiceType<IServiceRequest, IServiceResponse>;
    processError?: ErrorCodes;
    localLoading?: boolean;
    preventErrorCatch?: boolean;
    ignoreAbortError?: boolean;
}


export const useServiceCaller = <IServiceRequest, IServiceResponse>( { 
    service,
    localLoading,
    preventErrorCatch,
    processError,
    ignoreAbortError
} : IServiceCallerArgs<IServiceRequest, IServiceResponse> ): ServiceCallType<IServiceRequest, IServiceResponse> => {
    const [ serviceResponse, setServiceResponse ] = useState<IServiceResponse>();
    const [ serviceError, setServiceError ] = useState<IServiceError | undefined>();
    const [ serviceLoading, setServiceLoading ] = useState<boolean>(false);
    const [ appLanguage ] = useContext( AppLanguageContext );
    const [ loading, setloading ] = useContext( LoadingContext );
    const [ error, setError ] = useContext( ErrorContext );
    const [ appContext, setAppContext ] = useContext( AppContext );
    const [ login, setLogin ] = useContext( LoginContext );
    const loadingRef = useRef(loading);
    const abort = useRef(false);
    const hasAbortError = useRef(false);

    useEffect( () => {
        loadingRef.current = loading;
    }, [loading])

    useEffect(() => {
        abort.current = false;
        hasAbortError.current = false;
        return () => {
            abort.current = true }
    }, [])

    const serviceHandler = ( request?: IServiceRequest ) => new Promise<void>( ( resolve ) => {
        if ( !serviceLoading ) 
        {
            setServiceLoading(true);
            if( !localLoading )
            {
                setloading( true );
            }

            if( !localLoading && loadingRef.current )
            {
                setTimeout(() => {
                    serviceHandler(request)
                }, 250);
            }
            else
            {
                if ( error.hasError && !localLoading ) {
                    setError( { type: ErrorActions.RemoveError } ); //might not be necessary??
                }

                resolve( callService<IServiceRequest, IServiceResponse>( service, { appLanguage: appLanguage,  appContext: { Get: appContext, Set: setAppContext }, userContext: login ? { Get: login, Set: setLogin } : undefined }, request, serviceResponse )
                    .then( ( response: IServiceResponse | IServiceError ) => {
                        let serviceCallError: IServiceError = response as IServiceError;
                        if ( serviceCallError !== null && serviceCallError !== undefined && serviceCallError.hasError ) {
                            if(!abort.current)
                            {
                                setServiceError( serviceCallError );
                                hasAbortError.current = serviceCallError.isAbortError || false;
                            }
                            if( !serviceCallError.isAbortError || ( serviceCallError.isAbortError && !ignoreAbortError ) )
                                throw new Error( serviceCallError.caughtError );
                        }
                        if (!abort.current ) {
                            setServiceResponse( response as IServiceResponse );
                            setServiceLoading(false);
                        }  
                    } )
                    .catch( ( err: Error ) => {
                        if(!abort.current) {
                            setServiceLoading(false);
                            if(!preventErrorCatch)
                                setError( { type: ErrorActions.ActivateError, 
                                            errorDescription: err.message, 
                                            errorCode: processError !== undefined ? processError : ( ( hasAbortError.current ) ? ErrorCodes.AbortError : ErrorCodes.GenericError ) 
                                        } );
                        }
                    } )
                    .finally( () => {
                        !localLoading && setloading( false );
                    } )
                );
            }
        }
    } )

    return { serviceResponse, serviceHandler, serviceLoading, serviceError, setServiceResponse };
}

const callService = async <IServiceRequest, IServiceResponse> ( service: ServiceType<IServiceRequest, IServiceResponse>, context: IContext, serviceRequest?: IServiceRequest, serviceResponse?: IServiceResponse ) => {
    return new Promise<IServiceResponse | IServiceError>( ( resolve ) => {
        resolve( service( { context, serviceRequest, serviceResponse } ) );
    } ).then( ( response: IServiceResponse | IServiceError ) => {
        if ( response === null || response === undefined ) {
            throw new Error( "Empty data from server" );
        }
        let serviceError: IServiceError = response as IServiceError;
        if ( serviceError !== undefined && serviceError !== null && serviceError.hasError ) {
            throw new Error( serviceError.caughtError );
        }
        else {
            return response as IServiceResponse;
        }
    } ).catch( ( err: Error ) => {
        let serviceError: IServiceError = {
            caughtError: err.message,
            hasError: true,
            isAbortError: err.name === 'AbortError'
        };

        return serviceError;
    } );
};