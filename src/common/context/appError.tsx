import { useState } from "react";
import { IError, IErrorAction } from "./appErrorInterfaces";
import { ErrorActions } from "./appErrorEnums";

export function useError( initialState: IError )
{
    const [error, setError] = useState( initialState );

    function changeError( action: IErrorAction )
    {    
        switch( action.type ) {
            case ErrorActions.ActivateError: {
                setError( { ...error,
                    hasError: true,
                    errorData: action.errorData,
                    errorCode: action.errorCode
                } );
                break;
            }
            case ErrorActions.RemoveError: {
                setError( { ...error,                    
                    hasError: false,
                    errorData: undefined,
                    errorCode: undefined
                } );
                break;
            }
            case ErrorActions.ChangeErrorLanguage: {
                setError( { ...error,
                    errorData: action.errorData
                });            
                break;
            }
        }
    }
    return [ error, changeError ];
}