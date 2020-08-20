import { useState } from "react";
import { IAppContext, AppContextType, ChangeAppLanguage, ChangeAppTheme, ITranslationServiceResponse } from "./appContextInterfaces";
import { AvailableServices } from "../../services/servicesEnums";
import { useFetchGetHandler } from "../../services/fetchHandler";
import { IServiceError } from "../../services/serviceCallerInterfaces";
import { initialAppConfig } from "../../config/configuration";
import useLoginHandler from "../Login/LoginContextHandler";
import useAppLanguageHandler from "./AppLanguageContextHandler";
import { sessionHandler } from "../../functions/sessionStorage";

const translationHeaders = () => {
    let headers = new Headers();
    headers.append( 'Accept', 'application/json' );
    return headers;
}

export const useAppContext: ( initialContext: IAppContext ) => AppContextType = ( initialContext ) => {
    const [ currentAppContext, setCurrentAppContext ] = useState( initialContext );
    const loginContext = useLoginHandler();
    const {setAppLanguage} = useAppLanguageHandler();
    const getTranslation = useFetchGetHandler<ITranslationServiceResponse>( { serviceUrl: `${ AvailableServices.Translation }`, customHeaders: translationHeaders() } );

    const ChangeLanguage: ChangeAppLanguage = (appLanguage, getLangKeys) => new Promise<void | IServiceError>( (resolve) => {
        let globalLanguage: string = appLanguage;
        if ( loginContext.Login )
            loginContext.UpdateUserLanguage( appLanguage );
        else
            sessionHandler.setLastSelectedLanguage( appLanguage );

        if ( currentAppContext.translations === {} || currentAppContext.translations[ globalLanguage ] === undefined ) {
            setCurrentAppContext({
                ...currentAppContext,
                loadingTranslation: true
            });
            const url = getLangKeys ? `/${ globalLanguage }?getKeys=true` : `/${ globalLanguage }`;
            resolve(
                getTranslation.Get( url )
                    .then( data => {
                        let serviceResponse = data as ITranslationServiceResponse;
                        return setCurrentAppContext( {
                            ...currentAppContext,
                            translations: {
                                ...currentAppContext.translations,
                                [globalLanguage]: serviceResponse.Translation
                            },
                            languageCodes: getLangKeys && serviceResponse.LanguageCodes ? serviceResponse.LanguageCodes : currentAppContext.languageCodes,
                            loadingTranslation: false
                        } )
                    })
                    .then(() => 
                        setAppLanguage(globalLanguage)
                    )
                    .catch( () => {
                        setCurrentAppContext( {
                            ...currentAppContext,
                            loadingTranslation: false
                        })
                        setAppLanguage(globalLanguage) }
                    ) )
        }
        else {
            setAppLanguage(globalLanguage);
        }});
    
    const ChangeTheme: ChangeAppTheme = (appTheme) => 
    {
        if ( loginContext.Login )
            loginContext.UpdateUserTheme( appTheme );
        else
            sessionHandler.setAppTheme( appTheme );

        setCurrentAppContext( {
            ...currentAppContext,
            globalTheme: appTheme
        } );
    }

    const AllowCookies = (allow: boolean) => {
        if(loginContext.Login)
        {
            loginContext.UpdateUserAllowCookie(allow);
        }
        else if (allow)
        {
            sessionHandler.setAllowCookieFlag();
        }

        setCurrentAppContext((prevContext) => {
            return {
                ...prevContext,
                allowCookies: allow
            }
        });
    }

    return {
        App: currentAppContext, 
        ChangeLanguage,
        ChangeTheme,
        AllowCookies
    };
}

export const DefaultAppContext: AppContextType = {
    App: initialAppConfig,
    ChangeTheme: () => {},
    ChangeLanguage: ()=> new Promise(()=>{}),
    AllowCookies: () => {}
};

//TODO: Add update method to change cookie flag