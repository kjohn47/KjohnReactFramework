import { AppLanguageContext } from "../../config/AppProvider";
import { useContext } from "react";
import { IErrorData } from "./pageErrorsInterfaces";
import { ErrorCodes } from "../appErrorEnums";
import pageErrors from "./pageErrorsTranslation";

const useErrorTranslation: () => { getErrorData: ( errorCode?: ErrorCodes ) => IErrorData } = () => {
    const [ appLanguage ] = useContext( AppLanguageContext );
    const getErrorData: ( errorCode?: ErrorCodes ) => IErrorData = ( errorCode ) => {

        return pageErrors[ errorCode || ErrorCodes.GenericError ][ appLanguage ];
    }
    return { getErrorData };
};

export default useErrorTranslation;