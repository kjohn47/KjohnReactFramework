import { ErrorActions, ErrorCodes } from "./appErrorEnums";

export interface IError {
    hasError: boolean;
    errorDescription?: string;
    errorCode?: ErrorCodes;
}

export interface IErrorAction {
    type: ErrorActions;
    errorCode?: ErrorCodes;
    errorDescription?: string;
}

export type ErrorContextType = [ IError, ( ( action: IErrorAction ) => void ) ];

export interface IErrorData {
    Title: string;
    Message: string;
}

interface IErrorTranstation {
    [ key: string ]: IErrorData;    
}

//Add new errors here
export interface IPageErrors {
    [ ErrorCodes.GenericError ]: IErrorTranstation;
    [ ErrorCodes.PageNotFound ]: IErrorTranstation;
    [ ErrorCodes.AdminOnlyError ]: IErrorTranstation;
    [ ErrorCodes.AbortError ]: IErrorTranstation;
}