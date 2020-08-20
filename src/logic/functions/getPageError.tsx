import { IErrorData } from "../context/Error/appErrorInterfaces";
import { ErrorCodes } from "../context/Error/appErrorEnums";
import useAppLanguageHandler from "../context/App/AppLanguageContextHandler";
import useAppHandler from "../context/App/AppContextHandler";

const useErrorTranslation: () => { getErrorData: ( errorCode?: ErrorCodes ) => IErrorData } = () => {
    const { appLanguage } = useAppLanguageHandler();
    const { App } = useAppHandler();

    const getErrorData: ( errorCode?: ErrorCodes | string ) => IErrorData = ( errorCode ) => {
        const errorTranslation = App.errorTranslations[appLanguage];
        const errorData: IErrorData | undefined = errorTranslation ? ( errorCode ? errorTranslation[errorCode] : errorTranslation[ErrorCodes.GenericError] ) : undefined;

        return errorData ? errorData : {
            Title: "Inexistent error translation",
            Message: "It was not possible to get error translation for the selected language"
        };
    }
    return { getErrorData };
};

export default useErrorTranslation;