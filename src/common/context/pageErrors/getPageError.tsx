import { AppContext } from "../../config/appConfig";
import { useContext } from "react";
import { IErrorData } from "./pageErrorsInterfaces";
import { ErrorCodes } from "../appErrorEnums";
import pageErrors from "./pageErrorsTranslation";

const useErrorTranslation: () => { getErrorData: ( errorCode?: ErrorCodes ) => IErrorData } = () => {
    const currentLanguage = useContext( AppContext )[ 0 ].globalLanguage;
    const getErrorData: ( errorCode?: ErrorCodes ) => IErrorData = ( errorCode ) => {

        return pageErrors[ errorCode || ErrorCodes.GenericError ][ currentLanguage ];
    }
    return { getErrorData };
};

export default useErrorTranslation;