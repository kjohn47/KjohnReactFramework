import { AppLanguage } from "../appContextEnums";
import { ErrorCodes } from "../appErrorEnums";
import { IErrorData } from "../appErrorInterfaces";
import { IPageErrors } from "./pageErrorsInterfaces";
import { genericError, pageNotFoundError } from "../pageText/pageErrorsTranslation";

export function getTranslatedError( errorCode: ErrorCodes, language: AppLanguage ): IErrorData
{
    return pageErrors[errorCode][language];
};

//Add new errors here
const pageErrors: IPageErrors = 
{
    [ErrorCodes.GenericError] : genericError,
    [ErrorCodes.PageNotFound] : pageNotFoundError
};