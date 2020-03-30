import React, { createContext, useState, useEffect } from "react"
import { useError } from "../context/appError";
import { ErrorContextType } from "../context/appErrorInterfaces";
import { useAppContext } from "../context/appContext";
import { LoadingType, AppContextType, AppLanguageType } from "../context/appContextInterfaces";
import { useLogin } from "../context/loginContext";
import { LoginContextType } from "../context/loginContextInterfaces";
import { initialAppConfig, initialLogin, initialError, initialLanguage, initialRouteConfig } from "./configuration";
import { ContextActions, AppLanguage } from "../context/appContextEnums";
import { RouteContextType } from "../context/routeContextInterfaces";
import { useRouteContext } from "../context/routeContext";

export const AppLanguageContext = createContext<AppLanguageType>( [ initialLanguage, () => {} ] );
export const ErrorContext = createContext<ErrorContextType>( [ initialError, () => { } ] );
export const LoadingContext = createContext<LoadingType>( [ false, () => { } ] );
export const AppContext = createContext<AppContextType>( [ initialAppConfig, () => { } ] );
export const RouteContext = createContext<RouteContextType>( [ initialRouteConfig, () => { } ] );
export const LoginContext = createContext<LoginContextType>( [ undefined, () => { } ] );

export const AppProvider: React.FC = ( { children } ) => {
    const [ firstLoad, setFirstLoad ] = useState<boolean>( false );
    const [ appLanguage, setAppLanguage ] = useState( initialLanguage );
    const [ login, setLogin ] = useLogin( initialLogin );
    return (
            <AppLanguageContext.Provider value = { [ appLanguage, setAppLanguage ] }>
                <LoginContext.Provider value={ [ login, setLogin ] } >
                    <InitializeAppContext 
                        appLanguage = {appLanguage}
                        firstLoad = {firstLoad}
                        setFirstLoad = {setFirstLoad}
                    >
                        { children }
                    </InitializeAppContext>
                </LoginContext.Provider>
            </AppLanguageContext.Provider>
    )
}

const InitializeAppContext: React.FC<{appLanguage: AppLanguage, firstLoad: boolean, setFirstLoad: React.Dispatch<React.SetStateAction<boolean>>}> = ( props ) => {    
    const [ appContext, setAppContext ] = useAppContext( initialAppConfig );
    const [ routeContext, setRouteContext ] = useRouteContext( initialRouteConfig );
    const [ error, setError ] = useError( initialError );
    const [ loading, setLoading ] = useState( false );

    useEffect( () => {
        if ( !props.firstLoad ) {
            //// load loken data for first selected language
            Promise.resolve(
                setAppContext( { type: ContextActions.ChangeLanguage, payload: { globalLanguage: props.appLanguage } } )
            ).finally(
                () => props.setFirstLoad( true )
            )
        }
    }, [ props, appContext, setAppContext ] );
    return (
        props.firstLoad ?
                <AppContext.Provider value={ [ appContext, setAppContext ] } >
                    <RouteContext.Provider value = { [ routeContext, setRouteContext ] }>
                        <ErrorContext.Provider value={ [ error, setError ] }>
                            <LoadingContext.Provider value={ [ loading, setLoading ] }>
                                { props.children }
                            </LoadingContext.Provider>
                        </ErrorContext.Provider>
                    </RouteContext.Provider >
                </AppContext.Provider>
            :
                <div className={ "LoadingDiv LoadingPadding" }>
                    <div 
                        className={ "LoaderSpinner BigSpinner" } 
                        style={{
                            borderTopColor: "gray",
                            borderBottomColor: "gray",
                            borderLeftColor: "black",
                            borderRightColor: "black"
                        }} 
                    />
                </div>
    )
}