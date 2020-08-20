import { ErrorCodes } from "./appErrorEnums";

export interface IError {
    hasError: boolean;
    errorDescription?: string;
    errorCode?: ErrorCodes | string;
}

export interface IChangeError {
    errorCode: ErrorCodes | string;
    errorDescription: string;
}

export type ChangeErrorType = (newError: IChangeError) => void;
export type RemoveErrorType = () => void;

export type ErrorContextType = { 
    Error: IError;
    ChangeError: ChangeErrorType;
    RemoveError: RemoveErrorType;
};

export interface IErrorData {
    Title: string;
    Message: string;
}

export interface IErrorTranstation {
    [ key: string ]: IErrorData;    
}

//Add new errors here
export interface IPageErrors {
    [ ErrorCodes.GenericError ]: IErrorTranstation;
    [ ErrorCodes.PageNotFound ]: IErrorTranstation;
    [ ErrorCodes.AdminOnlyError ]: IErrorTranstation;
    [ ErrorCodes.AbortError ]: IErrorTranstation;
}