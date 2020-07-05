import React, { createContext, useState, useEffect } from "react"
import { useError, DefaultErrorContext } from "../context/Error/appError";
import { ErrorContextType } from "../context/Error/appErrorInterfaces";
import { useAppContext, DefaultAppContext } from "../context/App/appContext";
import { LoadingType, AppContextType, AppLanguageType } from "../context/App/appContextInterfaces";
import { useLogin } from "../context/Login/loginContext";
import { LoginContextType } from "../context/Login/loginContextInterfaces";
import { initialAppConfig, initialLogin, initialError, initialLanguage, initialRouteConfig } from "./configuration";
import { AppLanguage } from "../context/App/appContextEnums";
import { RouteContextType } from "../context/Routes/routeContextInterfaces";
import { useRouteContext, DefaultRouteContext } from "../context/Routes/routeContext";
import DotsLoader, { DotsLoaderNrBall, DotsLoaderColor, DotsLoaderSize } from "../../components/common/presentation/loading/DotsLoader";
import Column from "../../components/common/structure/Column";
import Row from "../../components/common/structure/Row";

export const AppLanguageContext = createContext<AppLanguageType>( [ initialLanguage, () => {} ] );
export const ErrorContext = createContext<ErrorContextType>( DefaultErrorContext );
export const LoadingContext = createContext<LoadingType>( [ false, () => { } ] );
export const AppContext = createContext<AppContextType>( DefaultAppContext );
export const RouteContext = createContext<RouteContextType>( DefaultRouteContext );
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
    const appContext = useAppContext( initialAppConfig );
    const routeContext = useRouteContext( initialRouteConfig );
    const errorContext = useError( initialError );
    const [ loading, setLoading ] = useState( false );

    useEffect( () => {
        if ( !firstLoad ) {
            //// load loken data for first selected language
            Promise.resolve(
                appContext.ChangeLanguage(appLanguage)
            ).finally(
                () => setFirstLoad( true )
            )
        }
        // eslint-disable-next-line
    }, [] );
    return (
        firstLoad ?
                <AppContext.Provider value={ appContext } >
                    <RouteContext.Provider value = { routeContext }>
                        <ErrorContext.Provider value={ errorContext }>
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