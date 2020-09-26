import React, { createContext, useState, useEffect, useMemo } from "react"
import { useError, DefaultErrorContext } from "../context/Error/appError";
import { ErrorContextType } from "../context/Error/appErrorInterfaces";
import { useAppContext, DefaultAppContext } from "../context/App/appContext";
import { LoadingType, AppContextType, AppLanguageType } from "../context/App/appContextInterfaces";
import { useLogin, DefaultLoginContext } from "../context/Login/loginContext";
import { LoginContextType } from "../context/Login/loginContextInterfaces";
import { initialAppConfig, initialLogin, initialError, initialLanguage, initialRouteConfig, defaultKnownServices } from "./configuration";
import { RouteContextType } from "../context/Routes/routeContextInterfaces";
import { useRouteContext, DefaultRouteContext } from "../context/Routes/routeContext";
import DotsLoader, { DotsLoaderNrBall, DotsLoaderColor, DotsLoaderSize } from "../../components/common/presentation/loading/DotsLoader";
import Column from "../../components/common/structure/Column";
import Row from "../../components/common/structure/Row";
import { ModalContextType } from "../context/Modal/ModalContextInterfaces";
import useModal, { defaultModalContext } from "../context/Modal/ModalContext";
import { IKnownServices } from "../services/serviceCallerInterfaces";

export const AppLanguageContext = createContext<AppLanguageType>( [ initialLanguage, () => {} ] );
export const ErrorContext = createContext<ErrorContextType>( DefaultErrorContext );
export const LoadingContext = createContext<LoadingType>( [ false, () => { } ] );
export const AppContext = createContext<AppContextType>( DefaultAppContext );
export const RouteContext = createContext<RouteContextType>( DefaultRouteContext );
export const LoginContext = createContext<LoginContextType>( DefaultLoginContext );
export const ModalContext = createContext<ModalContextType>( defaultModalContext );
export const ServicesContext = createContext<IKnownServices>(defaultKnownServices);

export const AppProvider: React.FC<{knownServices?: IKnownServices}> = ( { knownServices, children } ) => {
    const serviceContext = useMemo(() => knownServices ? {...defaultKnownServices, ...knownServices} : defaultKnownServices, [knownServices]);
    const [ appLanguage, setAppLanguage ] = useState( initialLanguage );
    const loginContext = useLogin( initialLogin );

    return (
        <ServicesContext.Provider value = {serviceContext} >
            <AppLanguageContext.Provider value = { [ appLanguage, setAppLanguage ] }>
                <LoginContext.Provider value={ loginContext } >
                    <MainAppProvider appLanguage = {appLanguage}>
                        { children }
                    </MainAppProvider>
                </LoginContext.Provider>
            </AppLanguageContext.Provider>
        </ServicesContext.Provider>
    )
}

const MainAppProvider: React.FC<{appLanguage: string}> = ( { appLanguage, children } ) => {
    const appContext = useAppContext( initialAppConfig );
    const routeContext = useRouteContext( initialRouteConfig );
    const errorContext = useError( initialError );
    const [ loading, setLoading ] = useState( false );
    const [ firstLoad, setFirstLoad ] = useState<boolean>( false );

    useEffect( () => {
        if ( !firstLoad ) {
            //// load loken data for first selected language
            Promise.resolve(
                appContext.ChangeLanguage(appLanguage, true)
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
                                <ModalProvider>
                                    { children }
                                </ModalProvider>
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

const ModalProvider: React.FC = ({children}) => {
    const modalContext = useModal();
    return <ModalContext.Provider value = {modalContext}>
              { children }
           </ModalContext.Provider>
}