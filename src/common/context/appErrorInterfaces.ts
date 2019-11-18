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

export type ErrorContextType = [ IError , ( ( action: IErrorAction ) => void ) ];