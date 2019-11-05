import { IErrorTranstation } from "../pageErrors/pageErrorsInterfaces";
import { AppLanguage } from "../appContextEnums";

//Add new error data here

export const genericError: IErrorTranstation = {
    [AppLanguage.EN]: {        
        errorDescription: "Generic Error",
        errorMessage: "",
        errorTitle: "Generic Error"
    },
    [AppLanguage.PT]: {        
        errorDescription: "Erro Genérico",
        errorMessage: "",
        errorTitle: "Erro Genérico"        
    }
}

export const pageNotFoundError: IErrorTranstation = {
    [AppLanguage.EN]: {        
        errorDescription: "Page not found",
        errorMessage: "App 404",
        errorTitle: "Page not found"
    },
    [AppLanguage.PT]: {        
        errorDescription: "Página não encontrada",
        errorMessage: "App 404",
        errorTitle: "Página não encontrada"        
    }
}