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

export type ServiceCallType<IServiceRequest, IServiceResponse> = { serviceResponse: IServiceResponse | undefined, serviceHandler: ( request?: IServiceRequest ) => Promise<void>, serviceLoading: boolean, serviceError: IServiceError | undefined, setServiceResponse: React.Dispatch<React.SetStateAction<IServiceResponse | undefined>> };

interface IServiceArgs<IServiceRequest, IServiceResponse> {
    context: IContext;
    serviceRequest?: IServiceRequest;
    serviceResponse?: IServiceResponse
}

export type ServiceType<IServiceRequest, IServiceResponse> = ( Args: IServiceArgs<IServiceRequest, IServiceResponse> ) => Promise<IServiceResponse | IServiceError>;