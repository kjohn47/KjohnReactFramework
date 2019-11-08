import { useContext, useState } from 'react';
import { AppContext, LoadingContext, ErrorContext, LoginContext } from '../config/appConfig';
import { IErrorData } from '../context/appErrorInterfaces';
import { ErrorActions, ErrorCodes } from "../context/appErrorEnums";
import { getTranslatedError } from "../context/pageErrors/pageErrors";
import { IContext, IServiceError, ServiceCallType, ServiceType } from "./serviceCallerInterfaces";

const delay = (t: number) => new Promise(resolve => setTimeout(resolve, t));

export function useServiceCaller<IServiceRequest,IServiceResponse>( service: ServiceType<IServiceRequest,IServiceResponse>, processError?: ErrorCodes, localLoading?: boolean ): ServiceCallType<IServiceRequest, IServiceResponse>
{
    const [ serviceResponse, setServiceResponse ] = useState<IServiceResponse>();    
    const [ loading, setloading ] = useContext( LoadingContext );
    const [ error, setError ] = useContext( ErrorContext );
    const [ appContext, setAppContext ] = useContext( AppContext );
    const [ login, setLogin ] = useContext( LoginContext );

    const serviceHandler = ( request?: IServiceRequest ) => new Promise<void>( ( resolve ) =>
    {
        if( !loading )
        {
            !localLoading && setloading( true);

            if( error.hasError )
                setError( { type: ErrorActions.RemoveError } ); //might not be necessary??
            //// remove the delay (only for testing async)
            resolve( delay(1000).then(
                async () => {
                    return await callService<IServiceRequest,IServiceResponse>( service, { appContext:{ Get: appContext, Set: setAppContext }, userContext: login ? { Get: login, Set: setLogin } : undefined }, request )
                    .then( ( response: IServiceResponse | IServiceError ) => {
                        let serviceError: IServiceError = response as IServiceError;
                        if( serviceError !== null && serviceError !== undefined && serviceError.hasError )
                        {
                            throw new Error( serviceError.caughtError );
                        }
                        setServiceResponse( response as IServiceResponse );
                    } )                    
                    .catch( (err: Error ) => {
                        let formattedError: IErrorData = processError !== undefined ? getTranslatedError( processError, appContext.globalLanguage ) : getTranslatedError( ErrorCodes.GenericError, appContext.globalLanguage );
                        formattedError.errorMessage = err.message;
                        setError( { type: ErrorActions.ActivateError, errorData: formattedError, errorCode: processError !== undefined ? processError : ErrorCodes.GenericError } );
                    } )
                    .finally( () => {
                        !localLoading && setloading( false );
                    });
                })
            );
        }
    })

    return [ serviceResponse, serviceHandler ];
}

const callService = async <IServiceRequest, IServiceResponse>( service: ServiceType<IServiceRequest,IServiceResponse>, context: IContext, request?: IServiceRequest ) => {
    return new Promise< IServiceResponse | IServiceError >( ( resolve ) => {
        let serverResponse: IServiceResponse | IServiceError = service( context, request );
        if( serverResponse === null || serverResponse === undefined )
        {
            throw new Error("Empty data from server");
        }
        resolve( serverResponse );
    }).then( ( response: IServiceResponse | IServiceError ) => {
        let serviceError: IServiceError = response as IServiceError;
        if( serviceError !== undefined && serviceError !== null && serviceError.hasError )
        {            
            throw new Error( serviceError.caughtError );
        }
        else
        {
            return response as IServiceResponse;
        }
    }).catch( ( err: Error ) => {
        let serviceError: IServiceError = {
            caughtError: err.toString(),
            hasError: true
        };

        return serviceError;
    } );
};