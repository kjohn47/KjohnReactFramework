import { useState, useContext } from "react";
import { AppLanguage } from "./appContextEnums";
import { IAppContext, AppContextType, ChangeAppLanguage, ChangeAppTheme } from "./appContextInterfaces";
import { setLastSelectedLanguage, setAppTheme } from "../../functions/sessionStorage";
import { LoginContext, AppLanguageContext } from "../../config/AppProvider";
import { ITranslation } from "../../functions/getTranslation";
import { AvailableServices } from "../../services/servicesEnums";
import { useFetchGetHandler } from "../../services/fetchHandler";
import { IServiceError } from "../../services/serviceCallerInterfaces";
import { initialAppConfig } from "../../config/configuration";

const translationHeaders = () => {
    let headers = new Headers();
    headers.append( 'Accept', 'application/json' );
    return headers;
}

export const useAppContext: ( initialContext: IAppContext ) => AppContextType = ( initialContext ) => {
    const [ currentAppContext, setCurrentAppContext ] = useState( initialContext );
    const loginContext = useContext( LoginContext );
    const setAppLanguage = useContext( AppLanguageContext )[1];
    const getTranslation = useFetchGetHandler<ITranslation>( { serviceUrl: `${ AvailableServices.Translation }`, customHeaders: translationHeaders() } );

    const ChangeLanguage: ChangeAppLanguage = (appLanguage) => new Promise<void | IServiceError>( (resolve) => {
        let globalLanguage: string = appLanguage.toString();
        if ( loginContext.Login )
        loginContext.UpdateUserLanguage( appLanguage );
        else
            setLastSelectedLanguage( appLanguage );

        if ( currentAppContext.translations === {} || currentAppContext.translations[ globalLanguage ] === undefined ) {
            setCurrentAppContext({
                ...currentAppContext,
                loadingTranslation: true
            })
            resolve(
                getTranslation.Get( `/${ globalLanguage }` )
                    .then( data => 
                        setCurrentAppContext( {
                            ...currentAppContext,
                            translations: {
                                ...currentAppContext.translations,
                                [globalLanguage]: data as ITranslation
                            },
                            loadingTranslation: false
                        } )
                    )
                    .then(() => 
                        setAppLanguage(globalLanguage as AppLanguage)
                    )
                    .catch( () => {
                        setCurrentAppContext( {
                            ...currentAppContext,
                            loadingTranslation: false
                        })
                        setAppLanguage(globalLanguage as AppLanguage) }
                    ) )
        }
        else {
            setAppLanguage(globalLanguage as AppLanguage);
        }});
    
    const ChangeTheme: ChangeAppTheme = (appTheme) => 
    {
        if ( loginContext.Login )
            loginContext.UpdateUserTheme( appTheme );
        else
            setAppTheme( appTheme );

        setCurrentAppContext( {
            ...currentAppContext,
            globalTheme: appTheme
        } );
    }
    return {
        App: currentAppContext, 
        ChangeLanguage,
        ChangeTheme
    };
}

export const DefaultAppContext: AppContextType = {
    App: initialAppConfig,
    ChangeTheme: () => {},
    ChangeLanguage: ()=> new Promise(()=>{})
};