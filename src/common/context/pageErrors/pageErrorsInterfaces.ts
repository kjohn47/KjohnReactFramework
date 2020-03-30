import { ErrorCodes } from "../appErrorEnums";

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
}