import { ErrorActions, ErrorCodes } from "./appErrorEnums";

export interface IError {
    hasError: boolean;
    errorData?: IErrorData;
    errorCode?: ErrorCodes;
}

export interface IErrorData {    
    errorTitle: string;
    errorMessage: string;
    errorDescription: string;
}

export interface IErrorAction {
    type: ErrorActions;
    errorCode?: ErrorCodes;
    errorData?: IErrorData;    
}

export type ErrorContextType = [ IError , ( ( action: IErrorAction ) => void ) ];