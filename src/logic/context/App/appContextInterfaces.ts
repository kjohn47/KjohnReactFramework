import { AppLanguage, AppGlobalTheme } from "./appContextEnums";
import { ITranslation } from "../../functions/getTranslation";
import { IServiceError } from "../../services/serviceCallerInterfaces";

export interface ITranslations {    
    [ key: string ]: ITranslation;
}

export interface IAppContext {
    adminOptions: boolean;
    globalTheme: AppGlobalTheme;
    translations: ITranslations;
    loadingTranslation?: boolean;
    showCookieModal?: boolean;
}

export type ChangeAppLanguage = (appLanguage: AppLanguage) => Promise<void | IServiceError>;
export type ChangeAppTheme = (appTheme: AppGlobalTheme) => void;

export type LoadingType = [ boolean, React.Dispatch<React.SetStateAction<boolean>> ];
export type AppLanguageType = [ AppLanguage, React.Dispatch<React.SetStateAction<AppLanguage>> ];
export type AppContextType = { 
    App: IAppContext;
    ChangeLanguage: ChangeAppLanguage;
    ChangeTheme: ChangeAppTheme; 
};