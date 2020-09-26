import { IErrorData } from "../context/Error/appErrorInterfaces";
import { ErrorCodes } from "../context/Error/appErrorEnums";
import useAppLanguageHandler from "../context/App/AppLanguageContextHandler";
import useAppHandler from "../context/App/AppContextHandler";
import { useCallback } from "react";

const useErrorTranslation = (): { getErrorData: ( errorCode?: ErrorCodes | string ) => IErrorData } => {
    const { appLanguage } = useAppLanguageHandler();
    const { App } = useAppHandler();

    const getErrorData = useCallback(( errorCode?: ErrorCodes | string ): IErrorData => {
        const errorTranslation = App.errorTranslations[appLanguage];
        const errorData: IErrorData | undefined = errorTranslation ? ( errorCode ? errorTranslation[errorCode] : errorTranslation[ErrorCodes.GenericError] ) : undefined;

        return errorData ? errorData : {
            Title: "Inexistent error translation",
            Message: "It was not possible to get error translation for the selected language"
        };
    }, [appLanguage, App.errorTranslations, ]);
    return { getErrorData };
};

export default useErrorTranslation;