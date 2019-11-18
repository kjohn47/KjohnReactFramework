import { AppLanguage } from "../appContextEnums";
import { ErrorCodes } from "../appErrorEnums";

export interface IErrorData {
    Title: string;
    Message: string;
}

interface IErrorTranstation {
    [AppLanguage.EN]: IErrorData;
    [AppLanguage.PT]: IErrorData;
}

//Add new errors here
export interface IPageErrors {
    [ErrorCodes.GenericError]: IErrorTranstation;
    [ErrorCodes.PageNotFound]: IErrorTranstation;
}

