import React, { createContext, useState, useEffect } from "react"
import { useError } from "../context/Error/appError";
import { ErrorContextType } from "../context/Error/appErrorInterfaces";
import { useAppContext } from "../context/App/appContext";
import { LoadingType, AppContextType, AppLanguageType } from "../context/App/appContextInterfaces";
import { useLogin } from "../context/Login/loginContext";
import { LoginContextType } from "../context/Login/loginContextInterfaces";
import { initialAppConfig, initialLogin, initialError, initialLanguage, initialRouteConfig } from "./configuration";
import { ContextActions, AppLanguage } from "../context/App/appContextEnums";
import { RouteContextType } from "../context/Routes/routeContextInterfaces";
import { useRouteContext } from "../context/Routes/routeContext";
import DotsLoader, { DotsLoaderNrBall, DotsLoaderColor, DotsLoaderSize } from "../../components/common/presentation/loading/DotsLoader";
import Column from "../../components/common/structure/Column";
import Row from "../../components/common/structure/Row";

export const AppLanguageContext = createContext<AppLanguageType>( [ initialLanguage, () => {} ] );
export const ErrorContext = createContext<ErrorContextType>( [ initialError, () => { } ] );
export const LoadingContext = createContext<LoadingType>( [ false, () => { } ] );
export const AppContext = createContext<AppContextType>( [ initialAppConfig, () => { } ] );
export const RouteContext = createContext<RouteContextType>( [ initialRouteConfig, () => { } ] );
export const LoginContext = createContext<LoginContextType>( [ undefined, () => { } ] );

export const AppProvider: React.FC = ( { children } ) => {
    const [ appLanguage, setAppLanguage ] = useState( initialLanguage );
    const [ login, setLogin ] = useLogin( initialLogin );
    const [ firstLoad, setFirstLoad ] = useState<boolean>( false );
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

const InitializeAppContext: React.FC<{appLanguage: AppLanguage, firstLoad: boolean, setFirstLoad: React.Dispatch<React.SetStateAction<boolean>> }> = ( { appLanguage, firstLoad, setFirstLoad, children } ) => {
    const [ appContext, setAppContext ] = useAppContext( initialAppConfig );
    const [ routeContext, setRouteContext ] = useRouteContext( initialRouteConfig );
    const [ error, setError ] = useError( initialError );
    const [ loading, setLoading ] = useState( false );

    useEffect( () => {
        if ( !firstLoad ) {
            //// load loken data for first selected language
            Promise.resolve(
                setAppContext( { type: ContextActions.ChangeLanguage, payload: { globalLanguage: appLanguage } } )
            ).finally(
                () => setFirstLoad( true )
            )
        }
        // eslint-disable-next-line
    }, [] );
    return (
        firstLoad ?
                <AppContext.Provider value={ [ appContext, setAppContext ] } >
                    <RouteContext.Provider value = { [ routeContext, setRouteContext ] }>
                        <ErrorContext.Provider value={ [ error, setError ] }>
                            <LoadingContext.Provider value={ [ loading, setLoading ] }>
                                { children }
                            </LoadingContext.Provider>
                        </ErrorContext.Provider>
                    </RouteContext.Provider >
                </AppContext.Provider>
            :
            <Row>
                <Column className="LoadingPadding">
                    <DotsLoader DotsNumber={DotsLoaderNrBall.Three} Color={DotsLoaderColor.Black} Size= {DotsLoaderSize.Big}/>
                </Column>
            </Row>
    )
}