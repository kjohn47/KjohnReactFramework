import { LoginActions } from "./loginContextEnums";

export interface ILogin {        
    userSessionToken: string;    
    authTokenHash: string;
    name: string;
    surname: string;
}

export interface ILoginAction {
    type: LoginActions;
    userData?: ILogin;
}

export type LoginContextType = [ ILogin | undefined, ( (action: ILoginAction) => void ) ];