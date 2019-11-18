import { AppLanguage } from "../appContextEnums";
import { ITranslations } from "../appContextInterfaces"

export const textTranslations: ITranslations = {
    [AppLanguage.PT]: {
        "_generic": {
            "#(loadingText)": "A Carregar!",
            "#(goBackToHome)": "Voltar para Homepage",
            "#(goBackToHomeToolTip)": "Carregue no botão para retomar para a homepage.",
            "#(cardDetails)": "Ver detalhes"
        },
        "_tableText": {
            "#(edit)": "Editar",
            "#(remove)": "Remover"
        },
        "_TestPage" : {
            "#(TestPage Title)": "Test page :)"
        }
    },
    [AppLanguage.EN]: {
        "_generic": {
            "#(loadingText)": "Loading!",
            "#(goBackToHome)": "Go back to Homepage",
            "#(goBackToHomeToolTip)": "Click at the button to return to homepage.",
            "#(cardDetails)": "View details"
        },
        "_tableText": {
            "#(edit)": "Edit",
            "#(remove)": "Remove"
        },
        "_TestPage" : {
            "#(TestPage Title)": "Test page :)"
        }
    }
}