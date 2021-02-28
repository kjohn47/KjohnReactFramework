import { LoginContextType } from '../context/Login/loginContextInterfaces';
import { AppContextType } from '../context/App/appContextInterfaces';

export interface IContext {
    appContext: AppContextType;
    appLanguage: string;
    userContext?: LoginContextType;
}

export interface IServiceError {
    hasError?: boolean;
    isAbortError?: boolean;
    caughtError?: string;
    krfApiError?: IKRFApiError;
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
    dataBase64?: string;
    dataBytes?: Uint8Array;
}

export type ServiceType<IServiceRequest, IServiceResponse> = ( Args: IServiceArgs<IServiceRequest, IServiceResponse> ) => Promise<IServiceResponse | IServiceError>;

export interface IKnownAction {
        Name: string,
        Routes?: {
            [route: string]: IServiceRoute
        },
        GWRoute?: string
}

export interface IKnownServices {
    [service: string] : IKnownService
}

export interface IKnownService {
    Name: string,
    Actions?: {
        [action: string] : IKnownAction
    },
    GWRoute?: string
}


export interface IServiceRoute {
    GWRoute?: string,
    Name: string
}

export interface IKRFApiError {
    withErrors: boolean,
    errorStatusCode: number,
    errorMessage: string,
    errorProperty: string,
    errorType: string,
    errorCode: string,
    validationError: boolean
}

export interface IKRFRefreshTokenSettings {
    isEnabled: boolean;
    header: string;
    header_Code: string;
    url: string;
}

export interface IKRFRefreshTokenFetch {
    authToken: string,
    refreshToken?: string
}