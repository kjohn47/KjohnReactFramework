import { ILoginAction, ILogin } from '../context/loginContextInterfaces';
import { IAppContext, IContextAction } from '../context/appContextInterfaces';
import { AppLanguage } from '../context/appContextEnums';

export interface IContext {
    appContext: IAppContextObject;
    appLanguage: AppLanguage;
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

export type ServiceCallType<IServiceRequest, IServiceResponse> = [ IServiceResponse | undefined, ( request?: IServiceRequest ) => Promise<void>, React.Dispatch<React.SetStateAction<IServiceResponse | undefined>> ];

export type ServiceType<IServiceRequest, IServiceResponse> = ( context: IContext, request?: IServiceRequest, response?: IServiceResponse) => Promise<IServiceResponse | IServiceError>;