import { IPageErrors } from "./appErrorInterfaces";
import { AppLanguage } from "../App/appContextEnums";
import { ErrorCodes } from "./appErrorEnums";

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
    },
    [ ErrorCodes.AbortError ]: {
        [ AppLanguage.EN ]: {
            Message: "The call to service was aborted or service Timed Out ",
            Title: "Aborted service call"
        },
        [ AppLanguage.PT ]: {
            Message: "A chamada ao serviço foi abortada ou terminou o tempo de espera",
            Title: "Chamada a serviço abortada"
        }
    }
};

export default pageErrors;