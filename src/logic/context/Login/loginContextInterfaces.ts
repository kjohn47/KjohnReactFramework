import { LoginActions } from "./loginContextEnums";
import { AppLanguage, AppGlobalTheme } from "../App/appContextEnums";

export interface ILogin {
    userSessionToken: string;
    authTokenHash: string;
    name: string;
    surname: string;
    appLanguage: AppLanguage;
    appTheme: AppGlobalTheme;
}

export interface ILoginAction {
    type: LoginActions;
    userData?: ILogin;
    userLanguage?: AppLanguage;
    userTheme?: AppGlobalTheme;
}

export type LoginContextType = [ ILogin | undefined, ( ( action: ILoginAction ) => void ) ];