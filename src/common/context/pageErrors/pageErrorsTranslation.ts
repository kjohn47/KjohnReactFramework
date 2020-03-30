import { IPageErrors } from "./pageErrorsInterfaces";
import { AppLanguage } from "../appContextEnums";
import { ErrorCodes } from "../appErrorEnums";

//Add new errors here
const pageErrors: IPageErrors =
{
    [ ErrorCodes.GenericError ]: {
        [ AppLanguage.EN ]: {
            Message: "Generic Error",
            Title: "Generic Error"
        },
        [ AppLanguage.PT ]: {
            Message: "Erro Genérico",
            Title: "Erro Genérico"
        },
    },
    [ ErrorCodes.PageNotFound ]: {
        [ AppLanguage.EN ]: {
            Message: "Page not found",
            Title: "Page not found"
        },
        [ AppLanguage.PT ]: {
            Message: "Página não encontrada",
            Title: "Página não encontrada"
        }
    },
    [ ErrorCodes.AdminOnlyError ]: {
        [ AppLanguage.EN ]: {
            Message: "This page is only available for administration!",
            Title: "Administrator Only"
        },
        [ AppLanguage.PT ]: {
            Message: "Página só se encontrada disponível para administração!",
            Title: "Apenas Administrador"
        }
    }
};

export default pageErrors;