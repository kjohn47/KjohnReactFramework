import { useContext, useState } from 'react';
import { AppContext, LoadingContext, ErrorContext, LoginContext, AppLanguageContext } from '../config/appConfig';
import { ErrorActions, ErrorCodes } from "../context/appErrorEnums";
import { IContext, IServiceError, ServiceCallType, ServiceType } from "./serviceCallerInterfaces";

export function useServiceCaller<IServiceRequest, IServiceResponse> ( service: ServiceType<IServiceRequest, IServiceResponse>, processError?: ErrorCodes, localLoading?: boolean ): ServiceCallType<IServiceRequest, IServiceResponse> {
    const [ serviceResponse, setServiceResponse ] = useState<IServiceResponse>();
    const [ appLanguage ] = useContext( AppLanguageContext );
    const [ loading, setloading ] = useContext( LoadingContext );
    const [ error, setError ] = useContext( ErrorContext );
    const [ appContext, setAppContext ] = useContext( AppContext );
    const [ login, setLogin ] = useContext( LoginContext );

    const serviceHandler = ( request?: IServiceRequest ) => new Promise<void>( ( resolve ) => {
        if ( !loading ) {
            !localLoading && setloading( true );

            if ( error.hasError )
                setError( { type: ErrorActions.RemoveError } ); //might not be necessary??            
            resolve( callService<IServiceRequest, IServiceResponse>( service, { appLanguage: appLanguage,  appContext: { Get: appContext, Set: setAppContext }, userContext: login ? { Get: login, Set: setLogin } : undefined }, request, serviceResponse )
                .then( ( response: IServiceResponse | IServiceError ) => {
                    let serviceError: IServiceError = response as IServiceError;
                    if ( serviceError !== null && serviceError !== undefined && serviceError.hasError ) {
                        throw new Error( serviceError.caughtError );
                    }
                    setServiceResponse( response as IServiceResponse );
                } )
                .catch( ( err: Error ) => {
                    setError( { type: ErrorActions.ActivateError, errorDescription: err.message, errorCode: processError !== undefined ? processError : ErrorCodes.GenericError } );
                } )
                .finally( () => {
                    !localLoading && setloading( false );
                } )
            );
        }
    } )

    return [ serviceResponse, serviceHandler ];
}

const callService = async <IServiceRequest, IServiceResponse> ( service: ServiceType<IServiceRequest, IServiceResponse>, context: IContext, serviceRequest?: IServiceRequest, serviceResponse?: IServiceResponse ) => {
    return new Promise<IServiceResponse | IServiceError>( ( resolve ) => {
        resolve( service( context, serviceRequest, serviceResponse ) );
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
            hasError: true
        };

        return serviceError;
    } );
};