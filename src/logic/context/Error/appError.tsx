import { useState } from "react";
import { IError, ErrorContextType, ChangeErrorType, RemoveErrorType } from "./appErrorInterfaces";
import { initialError } from "../../config/configuration";

export const useError: ( initialState: IError ) => ErrorContextType = ( initialState ) => {
    const [ error, setError ] = useState( initialState );

    const ChangeError: ChangeErrorType = (newError) => {
        setError( prevErr => ( {
            ...prevErr,
            hasError: true,
            errorDescription: newError.errorDescription,
            errorCode: newError.errorCode
        } ) );
    }

    const RemoveError: RemoveErrorType = () => {
        setError( {
            hasError: false,
            errorDescription: undefined,
            errorCode: undefined
        } );
    }
    
    return {
       Error: error,
       ChangeError,
       RemoveError
    }
}

export const DefaultErrorContext = {
    Error: initialError,
    ChangeError: () => {},
    RemoveError: () => {}
}