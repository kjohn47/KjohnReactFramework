import React, { createContext, useState } from "react"
import { useError } from "../context/appError";
import { ErrorContextType } from "../context/appErrorInterfaces";
import { useAppContext } from "../context/appContext";
import { LoadingType, AppContextType } from "../context/appContextInterfaces";
import { useLogin } from "../context/loginContext";
import { LoginContextType } from "../context/loginContextInterfaces";
import { initialAppConfig, initialLogin, initialError } from "./configuration";

export const ErrorContext = createContext<ErrorContextType>( [ initialError, () => {} ] );
export const LoadingContext = createContext<LoadingType>( [ false, () => {} ] );
export const AppContext = createContext<AppContextType>( [ initialAppConfig, () => {} ] );
export const LoginContext = createContext<LoginContextType>( [ undefined, () => {} ] );

export const AppProvider: React.FC = ({ children }) => {
    const [login, setLogin] = useLogin( initialLogin );
    const [appContext, setAppContext] = useAppContext( initialAppConfig );
    const [error, setError] = useError( initialError );
    const [loading, setLoading] = useState( false );
    
    return (
        <LoginContext.Provider value = { [login, setLogin] } >
            <AppContext.Provider value = { [ appContext, setAppContext ] } >
                <ErrorContext.Provider value = { [error, setError] }>
                    <LoadingContext.Provider value = { [ loading, setLoading ] }>
                        {children}
                    </LoadingContext.Provider>
                </ErrorContext.Provider>
            </AppContext.Provider>
        </LoginContext.Provider>
    )
}