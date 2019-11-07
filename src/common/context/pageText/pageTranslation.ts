import { AppLanguage } from "../appContextEnums";
import { ITranslations } from "../appContextInterfaces"

export const textTranslations: ITranslations = {
    [AppLanguage.PT]: {
        loadingText: "A Carregar!",
        goBackToHome: "Voltar para Homepage",
        goBackToHomeToolTip: "Carregue no botão para retomar para a homepage.",
        tableText: {
            edit: "Editar",
            remove: "Remover"
        },
        testPage: {
            langButton: "Lingua",
            searchBox: "Procurar: ",
            loadButton: "Carregar",
            text: "Texto",
            serviceCallButton1: "Chamar serviço 1",
            serviceCallTooltip1: "Clique aqui para chamar serviço 1",
            serviceCallButton2: "Chamar serviço 2",
            serviceCallTooltip2: "Clique aqui para chamar serviço 2",
            serviceCallButton3: "Chamar serviço 3",
            serviceCallTooltip3: "Clique aqui para chamar serviço 3"
        }
    },
    [AppLanguage.EN]: {
        loadingText: "Loading!",
        goBackToHome: "Go back to Homepage",
        goBackToHomeToolTip: "Click at the button to return to homepage.",
        tableText: {
            edit: "Edit",
            remove: "Remove"
        },
        testPage: {
            langButton: "Language",
            searchBox: "Search: ",
            loadButton: "Loading",
            text: "Text",
            serviceCallButton1: "Call Service 1",
            serviceCallTooltip1: "Click here to call service 1",
            serviceCallButton2: "Call Service 2",
            serviceCallTooltip2: "Click here to call service 2",
            serviceCallButton3: "Call Service 3",
            serviceCallTooltip3: "Click here to call service 3"
        }        
    }
}