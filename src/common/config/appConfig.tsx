import React, { createContext, useState } from "react"
import { useError } from "../context/appError";
import { ErrorContextType } from "../context/appErrorInterfaces";
import { useAppContext } from "../context/appContext";
import { LoadingType, AppContextType } from "../context/appContextInterfaces";
import { useLogin } from "../context/loginContext";
import { LoginContextType } from "../context/loginContextInterfaces";
import { initialAppConfig, initialLogin, initialError } from "./configuration";

export const ErrorContext = createContext<ErrorContextType>( [] as unknown as ErrorContextType );
export const LoadingContext = createContext<LoadingType>( [] as unknown as LoadingType );
export const AppContext = createContext<AppContextType>( [] as unknown as AppContextType );
export const LoginContext = createContext<LoginContextType>( [] as unknown as LoginContextType );

export const AppProvider: React.FC = ({ children }) => {
    const [login, setLogin] = useLogin( initialLogin );
    const [appContext, setAppContext] = useAppContext( initialAppConfig );
    const [error, setError] = useError( initialError );
    const [loading, setLoading] = useState( false );
    
    return (
        <LoginContext.Provider value = {[login, setLogin] as LoginContextType } >
            <AppContext.Provider value = {[ appContext, setAppContext ] as AppContextType } >
                <ErrorContext.Provider value = {[error, setError] as ErrorContextType }>
                    <LoadingContext.Provider value = {[loading, setLoading] as LoadingType }>
                        {children}
                    </LoadingContext.Provider>
                </ErrorContext.Provider>
            </AppContext.Provider>
        </LoginContext.Provider>
    )
}