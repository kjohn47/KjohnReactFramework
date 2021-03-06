import { AppGlobalTheme } from "../App/appContextEnums";

export interface ILogin {
    userSessionToken: string;
    refreshToken?: string;
    name: string;
    surname: string;
    appLanguage: string;
    appTheme: AppGlobalTheme;
    allowCookies?: boolean;
}

export type MakeUpdateLoginType = (userData: ILogin) => void;
export type UpdateUserLanguageType = (userLanguage: string) => void;
export type UpdateUserThemeType = (userTheme: AppGlobalTheme) => void;
export type RefreshTokenType = (newAuthToken: string, newRefreshToken?: string) => void;

export type LoginContextType = { 
    Login: ILogin | undefined,
    MakeLogin: MakeUpdateLoginType,
    UpdateData: MakeUpdateLoginType,
    MakeLogout: () => void,
    UpdateUserLanguage: UpdateUserLanguageType,
    UpdateUserTheme: UpdateUserThemeType,
    UpdateUserAllowCookie: (allow: boolean) => void;
    RefreshToken: RefreshTokenType;
};