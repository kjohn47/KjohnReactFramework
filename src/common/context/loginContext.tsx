import { useState } from "react";
import { LoginActions } from "./loginContextEnums";
import { ILogin, ILoginAction } from "./loginContextInterfaces";

export function useLogin( initialState: ILogin | undefined )
{
    const [login, setLogin] = useState( initialState );

    function changeLogin( action: ILoginAction )
    {    
        switch( action.type ) {
            case LoginActions.MakeLogin: {
                setLogin( action.userData );
                break;
            }
            case LoginActions.UpdateData: {
                if( action.userData !== undefined && login !== undefined )
                {
                    setLogin( { ...login,
                        name: action.userData.name,
                        surname: action.userData.surname
                    } );
                }
                break;
            }
            case LoginActions.MakeLogout: {
                setLogin( undefined );
                break;
            }
        }
    }
    return [ login, changeLogin ];
}