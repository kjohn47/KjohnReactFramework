import { IErrorData } from "../context/Error/appErrorInterfaces";
import { ErrorCodes } from "../context/Error/appErrorEnums";
import pageErrors from "../context/Error/appErrorTranslation";
import useAppLanguageHandler from "../context/App/AppLanguageContextHandler";

const useErrorTranslation: () => { getErrorData: ( errorCode?: ErrorCodes ) => IErrorData } = () => {
    const { appLanguage } = useAppLanguageHandler();
    const getErrorData: ( errorCode?: ErrorCodes ) => IErrorData = ( errorCode ) => {

        return pageErrors[ errorCode || ErrorCodes.GenericError ][ appLanguage ];
    }
    return { getErrorData };
};

export default useErrorTranslation;