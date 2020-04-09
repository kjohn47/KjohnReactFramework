import { ContextActions, AppLanguage, AppGlobalTheme } from "./appContextEnums";
import { ITranslation } from "./pageText/pageTranslationInterfaces";

export interface IContextAction {
    type: ContextActions;
    payload: IContextPayload;
}

export interface IContextPayload {
    globalLanguage?: AppLanguage;
    pageTheme?: AppGlobalTheme;
}

export interface ITranslations {    
    [ key: string ]: ITranslation;
}

export interface IAppContext {
    adminOptions: boolean;
    globalTheme: AppGlobalTheme;
    translations: ITranslations;
    loadingTranslation?: boolean;
}

export type LoadingType = [ boolean, React.Dispatch<React.SetStateAction<boolean>> ];
export type AppLanguageType = [ AppLanguage, React.Dispatch<React.SetStateAction<AppLanguage>> ];
export type AppContextType = [ IAppContext, ( ( action: IContextAction ) => void ) ];