import { AppGlobalTheme } from "./appContextEnums";
import { ITranslation } from "../../functions/getTranslation";
import { IServiceError } from "../../services/serviceCallerInterfaces";

export interface ITranslations {    
    [ key: string ]: ITranslation;
}

export interface ITranslationServiceResponse {
    Translation: ITranslation;
    LanguageCodes?: string[];
}

export interface IAppContext {
    adminOptions: boolean;
    globalTheme: AppGlobalTheme;
    translations: ITranslations;
    loadingTranslation?: boolean;
    allowCookies?: boolean;
    languageCodes: string[];
}

export type ChangeAppLanguage = (appLanguage: string, getLangKeys?: boolean) => Promise<void | IServiceError>;
export type ChangeAppTheme = (appTheme: AppGlobalTheme) => void;

export type LoadingType = [ boolean, React.Dispatch<React.SetStateAction<boolean>> ];
export type AppLanguageType = [ string, React.Dispatch<React.SetStateAction<string>> ];
export type AppContextType = { 
    App: IAppContext;
    ChangeLanguage: ChangeAppLanguage;
    ChangeTheme: ChangeAppTheme; 
    AllowCookies: (allow: boolean) => void;
};