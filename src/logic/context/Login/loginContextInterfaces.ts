import { AppLanguage, AppGlobalTheme } from "../App/appContextEnums";

export interface ILogin {
    userSessionToken: string;
    authTokenHash: string;
    name: string;
    surname: string;
    appLanguage: AppLanguage;
    appTheme: AppGlobalTheme;
}

export type MakeUpdateLoginType = (userData: ILogin) => void;
export type UpdateUserLanguageType = (userLanguage: AppLanguage) => void;
export type UpdateUserThemeType = (userTheme: AppGlobalTheme) => void;

export type LoginContextType = { 
    Login: ILogin | undefined,
    MakeLogin: MakeUpdateLoginType,
    UpdateData: MakeUpdateLoginType,
    MakeLogout: () => void,
    UpdateUserLanguage: UpdateUserLanguageType,
    UpdateUserTheme: UpdateUserThemeType
};