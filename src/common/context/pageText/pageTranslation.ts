import { AppLanguage } from "../appContextEnums";
import { ITranslations } from "../appContextInterfaces"

export const textTranslations: ITranslations = {
    [AppLanguage.PT]: {
        "generic": {
            "loadingText": "A Carregar!",
            "goBackToHome": "Voltar para Homepage",
            "goBackToHomeToolTip": "Carregue no botão para retomar para a homepage.",
            "cardDetails": "Ver detalhes"
        },
        "tableText": {
            "edit": "Editar",
            "remove": "Remover"
        }
    },
    [AppLanguage.EN]: {
        "generic": {
            "loadingText": "Loading!",
            "goBackToHome": "Go back to Homepage",
            "goBackToHomeToolTip": "Click at the button to return to homepage.",
            "cardDetails": "View details"
        },
        "tableText": {
            "edit": "Edit",
            "remove": "Remove"
        }
    }
}