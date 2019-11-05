import { AppLanguage } from "../appContextEnums";
import { ErrorCodes } from "../appErrorEnums";
import { IErrorData } from "../appErrorInterfaces";

export interface IErrorTranstation {
    [AppLanguage.EN]: IErrorData;
    [AppLanguage.PT]: IErrorData;
}

//Add new errors here
export interface IPageErrors {
    [ErrorCodes.GenericError]: IErrorTranstation;
    [ErrorCodes.PageNotFound]: IErrorTranstation;
}