import { ContextActions, AppLanguage, KnownPages, AppGlobalTheme } from "./appContextEnums";
import { ITranslation } from "./pageText/pageTranslationInterfaces";

export interface IContextAction {
    type: ContextActions;
    payload: IContextPayload;
}

export interface IContextPayload {
    globalLanguage?: AppLanguage;
    pageTheme?: AppGlobalTheme;
    selectedPage?: KnownPages;
    queryString?: string;
}

export interface ITranslations {
    [ AppLanguage.PT ]?: ITranslation;
    [ AppLanguage.EN ]?: ITranslation;
}

export interface IAppContext {
    selectedPage: KnownPages;
    queryString?: string;
    adminOptions: boolean;
    globalTheme: AppGlobalTheme;
    translations: ITranslations;
}

export type LoadingType = [ boolean, React.Dispatch<React.SetStateAction<boolean>> ];
export type AppLanguageType = [ AppLanguage, React.Dispatch<React.SetStateAction<AppLanguage>> ];
export type AppContextType = [ IAppContext, ( ( action: IContextAction ) => void ) ];