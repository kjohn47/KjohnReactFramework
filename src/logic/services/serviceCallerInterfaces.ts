import { ILoginAction, ILogin } from '../context/Login/loginContextInterfaces';
import { AppContextType } from '../context/App/appContextInterfaces';
import { AppLanguage } from '../context/App/appContextEnums';

export interface IContext {
    appContext: AppContextType;
    appLanguage: AppLanguage;
    userContext?: IAppUserObject;
}

interface IAppUserObject {
    Get: ILogin;
    Set: ( action: ILoginAction ) => void;
}

export interface IServiceError {
    hasError?: boolean;
    isAbortError?: boolean;
    caughtError?: string;
}

export type ServiceCallType<IServiceRequest, IServiceResponse> = { serviceResponse: IServiceResponse | undefined, serviceHandler: ( request?: IServiceRequest ) => Promise<void>, serviceLoading: boolean, serviceError: IServiceError | undefined, setServiceResponse: React.Dispatch<React.SetStateAction<IServiceResponse | undefined>> };

interface IServiceArgs<IServiceRequest, IServiceResponse> {
    context: IContext;
    serviceRequest?: IServiceRequest;
    serviceResponse?: IServiceResponse
}

export interface IdownloadDocument extends IServiceError {
    name: string;
    extension: string;
    data: string;
}

export type ServiceType<IServiceRequest, IServiceResponse> = ( Args: IServiceArgs<IServiceRequest, IServiceResponse> ) => Promise<IServiceResponse | IServiceError>;