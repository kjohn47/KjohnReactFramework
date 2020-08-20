import { IPageErrors } from "./appErrorInterfaces";
import { ErrorCodes } from "./appErrorEnums";

//Add new errors here
const pageErrors: IPageErrors =
{
    [ ErrorCodes.GenericError ]: {
        EN: {
            Message: "Generic Error",
            Title: "Generic Error"
        },
        PT: {
            Message: "Erro Genérico",
            Title: "Erro Genérico"
        },
    },
    [ ErrorCodes.PageNotFound ]: {
        EN: {
            Message: "Page not found",
            Title: "Page not found"
        },
        PT: {
            Message: "Página não encontrada",
            Title: "Página não encontrada"
        }
    },
    [ ErrorCodes.AdminOnlyError ]: {
        EN: {
            Message: "This page is only available for administration!",
            Title: "Administrator Only"
        },
        PT: {
            Message: "Página só se encontrada disponível para administração!",
            Title: "Apenas Administrador"
        }
    },
    [ ErrorCodes.AbortError ]: {
        EN: {
            Message: "The call to service was aborted or service Timed Out ",
            Title: "Aborted service call"
        },
        PT: {
            Message: "A chamada ao serviço foi abortada ou terminou o tempo de espera",
            Title: "Chamada a serviço abortada"
        }
    }
};

export default pageErrors;