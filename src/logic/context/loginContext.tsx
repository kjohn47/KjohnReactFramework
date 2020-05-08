import { useState } from "react";
import { LoginActions } from "./loginContextEnums";
import { ILogin, ILoginAction, LoginContextType } from "./loginContextInterfaces";
import { updateUserSession } from "../functions/sessionStorage";

export const useLogin: ( initialState: ILogin | undefined ) => LoginContextType = ( initialState ) => {
    const [ login, setLogin ] = useState( initialState );

    function changeLogin ( action: ILoginAction ) {
        switch ( action.type ) {
            case LoginActions.MakeLogin: {
                setLogin( action.userData );
                break;
            }
            case LoginActions.UpdateData: {
                if ( action.userData !== undefined && login !== undefined ) {
                    let newData: ILogin = {
                        ...login,
                        name: action.userData.name,
                        surname: action.userData.surname
                    };
                    updateUserSession( newData );
                    setLogin( newData );
                }
                break;
            }
            case LoginActions.MakeLogout: {
                setLogin( undefined );
                break;
            }
            case LoginActions.UpdateUserLanguage: {
                if ( action.userLanguage && login ) {
                    let newData: ILogin = {
                        ...login,
                        appLanguage: action.userLanguage
                    };
                    updateUserSession( newData );
                    setLogin( newData );
                }
                break;
            }
            case LoginActions.UpdateUserTheme: {
                if ( action.userTheme && login ) {
                    let newData: ILogin = {
                        ...login,
                        appTheme: action.userTheme
                    };
                    updateUserSession( newData );
                    setLogin( newData );
                }
                break;
            }
        }
    }
    return [ login, changeLogin ];
}