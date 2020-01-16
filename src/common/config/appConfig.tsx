import React, { createContext, useState, useEffect } from "react"
import { useError } from "../context/appError";
import { ErrorContextType } from "../context/appErrorInterfaces";
import { useAppContext } from "../context/appContext";
import { LoadingType, AppContextType, AppLanguageType } from "../context/appContextInterfaces";
import { useLogin } from "../context/loginContext";
import { LoginContextType } from "../context/loginContextInterfaces";
import { initialAppConfig, initialLogin, initialError, initialLanguage } from "./configuration";
import { ContextActions, AppLanguage } from "../context/appContextEnums";

export const AppLanguageContext = createContext<AppLanguageType>( [ initialLanguage, () => {} ] );
export const ErrorContext = createContext<ErrorContextType>( [ initialError, () => { } ] );
export const LoadingContext = createContext<LoadingType>( [ false, () => { } ] );
export const AppContext = createContext<AppContextType>( [ initialAppConfig, () => { } ] );
export const LoginContext = createContext<LoginContextType>( [ undefined, () => { } ] );

export const AppProvider: React.FC = ( { children } ) => {
    const [ appLanguage, setAppLanguage ] = useState( initialLanguage );
    const [ login, setLogin ] = useLogin( initialLogin );
    return (
            <AppLanguageContext.Provider value = { [ appLanguage, setAppLanguage ] }>
                <LoginContext.Provider value={ [ login, setLogin ] } >
                    <InitializeAppContext appLanguage = {appLanguage}>
                        { children }
                    </InitializeAppContext>
                </LoginContext.Provider>
            </AppLanguageContext.Provider>
    )
}

const InitializeAppContext: React.FC<{appLanguage: AppLanguage}> = ( props ) => {
    const [ firstLoad, setFirstLoad ] = useState<boolean>( false );
    const [ appContext, setAppContext ] = useAppContext( initialAppConfig );
    const [ error, setError ] = useError( initialError );
    const [ loading, setLoading ] = useState( false );

    useEffect( () => {
        if ( !firstLoad ) {
            //// load loken data for first selected language
            Promise.resolve(
                setAppContext( { type: ContextActions.ChangeLanguage, payload: { globalLanguage: props.appLanguage } } )
            ).then( () =>
                setFirstLoad( true )
            )
        }
    }, [ firstLoad, appContext, setAppContext, props.appLanguage ] );
    return (
        firstLoad ?
                <AppContext.Provider value={ [ appContext, setAppContext ] } >
                    <ErrorContext.Provider value={ [ error, setError ] }>
                        <LoadingContext.Provider value={ [ loading, setLoading ] }>
                            { props.children }
                        </LoadingContext.Provider>
                    </ErrorContext.Provider>
                </AppContext.Provider>
            :
            <></>
    )
}