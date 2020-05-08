import { AppLanguageContext } from "../config/AppProvider";
import { useContext } from "react";
import { IErrorData } from "../context/Error/appErrorInterfaces";
import { ErrorCodes } from "../context/Error/appErrorEnums";
import pageErrors from "../context/Error/appErrorTranslation";

const useErrorTranslation: () => { getErrorData: ( errorCode?: ErrorCodes ) => IErrorData } = () => {
    const [ appLanguage ] = useContext( AppLanguageContext );
    const getErrorData: ( errorCode?: ErrorCodes ) => IErrorData = ( errorCode ) => {

        return pageErrors[ errorCode || ErrorCodes.GenericError ][ appLanguage ];
    }
    return { getErrorData };
};

export default useErrorTranslation;