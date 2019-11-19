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
    globalLanguage: AppLanguage;
    selectedPage: KnownPages;
    queryString?: string;
    adminOptions: boolean;
    globalTheme: AppGlobalTheme;
    translations: ITranslations;
}

export type LoadingType = [ boolean, React.Dispatch<React.SetStateAction<boolean>> ];

export type AppContextType = [ IAppContext, ( ( action: IContextAction ) => void ) ];