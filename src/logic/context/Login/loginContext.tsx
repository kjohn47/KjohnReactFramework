import { useState } from "react";
import { ILogin, LoginContextType, MakeUpdateLoginType, UpdateUserLanguageType, UpdateUserThemeType } from "./loginContextInterfaces";
import { updateUserSession } from "../../functions/sessionStorage";

export const useLogin: ( initialState: ILogin | undefined ) => LoginContextType = ( initialState ) => {
    const [ login, setLogin ] = useState( initialState );

    const MakeLogin: MakeUpdateLoginType = (userData) => {
        setLogin( userData );
    }

    const UpdateData: MakeUpdateLoginType = (userData) => {
        if(login)
        {
            const newData: ILogin = {
                ...login,
                name: userData.name,
                surname: userData.surname
            };

            updateUserSession( newData );
            setLogin( newData );
        }
    }

    const MakeLogout: () => void = () => {
        setLogin( undefined );
    }

    const UpdateUserLanguage: UpdateUserLanguageType = (userLanguage) => {
        if ( login ) {
            const newData: ILogin = {
                ...login,
                appLanguage: userLanguage
            };
            updateUserSession( newData );
            setLogin( newData );
        }
    }

    const UpdateUserTheme: UpdateUserThemeType = (userTheme) => {
        if ( login ) {
            const newData: ILogin = {
                ...login,
                appTheme: userTheme
            };
            updateUserSession( newData );
            setLogin( newData );
        }
    }

    return {
        Login: login,
        MakeLogin,
        UpdateData,
        MakeLogout,
        UpdateUserLanguage,
        UpdateUserTheme
    }
}

export const DefaultLoginContext: LoginContextType = {
    Login: undefined,
    MakeLogin: () => {},
    UpdateData: () => {},
    MakeLogout: () => {},
    UpdateUserLanguage: () => {},
    UpdateUserTheme: () => {}
}