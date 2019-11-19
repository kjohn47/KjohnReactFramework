import { ILoginAction, ILogin } from '../context/loginContextInterfaces';
import { IAppContext, IContextAction } from '../context/appContextInterfaces';

export interface IContext {
    appContext: IAppContextObject;
    userContext?: IAppUserObject;
}

interface IAppContextObject {
    Get: IAppContext;
    Set: ( action: IContextAction ) => void;
}

interface IAppUserObject {
    Get: ILogin;
    Set: ( action: ILoginAction ) => void;
}

export interface IServiceError {
    hasError?: boolean;
    caughtError?: string;
}

export type ServiceCallType<IServiceRequest, IServiceResponse> = [ IServiceResponse | undefined, ( request?: IServiceRequest ) => Promise<void> ];

export type ServiceType<IServiceRequest, IServiceResponse> = ( context: IContext, request?: IServiceRequest ) => Promise<IServiceResponse | IServiceError>;