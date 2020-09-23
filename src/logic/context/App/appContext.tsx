import { useState } from "react";
import { IAppContext, AppContextType, ChangeAppLanguage, ChangeAppTheme, ITranslationServiceResponse } from "./appContextInterfaces";
import { AvailableActionsEnum, AvailableServicesEnum } from "../../services/servicesEnums";
import { useFetchGetHandler } from "../../services/fetchHandler";
import { IServiceError } from "../../services/serviceCallerInterfaces";
import { initialAppConfig } from "../../config/configuration";
import useLoginHandler from "../Login/LoginContextHandler";
import useAppLanguageHandler from "./AppLanguageContextHandler";
import { sessionHandler } from "../../functions/sessionStorage";
import { IDictionary } from "../../functions/misc";

const translationHeaders = () => {
    let headers = new Headers();
    headers.append( 'Accept', 'application/json' );
    return headers;
}

export const useAppContext: ( initialContext: IAppContext ) => AppContextType = ( initialContext ) => {
    const [ currentAppContext, setCurrentAppContext ] = useState( initialContext );
    const loginContext = useLoginHandler();
    const {setAppLanguage} = useAppLanguageHandler();
    const getTranslation = useFetchGetHandler<ITranslationServiceResponse>( { 
            serviceUrl: AvailableServicesEnum.HomePage, customHeaders: translationHeaders() 
    } );

    const ChangeLanguage: ChangeAppLanguage = (appLanguage, getLangKeys) => new Promise<void | IServiceError>( (resolve) => {
        let globalLanguage: string = appLanguage;
        if(!getLangKeys)
        {
            if(!currentAppContext.languageCodes.find(c => c === globalLanguage))
            {
                globalLanguage = currentAppContext.languageCodes[0];
            }
        }

        if ( currentAppContext.translations === {} || currentAppContext.translations[ globalLanguage ] === undefined ) {
            setCurrentAppContext( prevContext => ({
                ...prevContext,
                loadingTranslation: true
            }));
            const queryDictionary: IDictionary<string> | undefined = getLangKeys ? {"getKeys" : "true"} : undefined;
            resolve(
                getTranslation.Get( AvailableActionsEnum.Translation, globalLanguage, queryDictionary )
                    .then( data => {
                        let serviceResponse = data as ITranslationServiceResponse;
                        if(getLangKeys && serviceResponse.LanguageCodes && !serviceResponse.LanguageCodes.find(c => c === globalLanguage))
                        {
                            globalLanguage = serviceResponse.LanguageCodes[0];
                        }

                        return setCurrentAppContext( prevContext => ( {
                            ...prevContext,
                            translations: {
                                ...prevContext.translations,
                                [globalLanguage]: serviceResponse.Translation
                            },
                            errorTranslations: {
                                ...prevContext.errorTranslations,
                                [globalLanguage]: serviceResponse.ErrorTranslation
                            },
                            languageCodes: getLangKeys && serviceResponse.LanguageCodes ? serviceResponse.LanguageCodes : prevContext.languageCodes,
                            loadingTranslation: false
                        } ) )
                    })
                    .then(() => {
                        UpdateLanguageContext(globalLanguage);
                    })
                    .catch( () => {
                        setCurrentAppContext( precContext => ({
                            ...precContext,
                            loadingTranslation: false
                        }))
                        setAppLanguage(globalLanguage) }
                    ) )
        }
        else {
            UpdateLanguageContext(globalLanguage);
        }
    });

    const UpdateLanguageContext = (langCode: string) => {
        if ( loginContext.Login )
            loginContext.UpdateUserLanguage( langCode );
        else
            sessionHandler.setLastSelectedLanguage( langCode );

        setAppLanguage(langCode);
    }
    
    const ChangeTheme: ChangeAppTheme = (appTheme) => 
    {
        if ( loginContext.Login )
            loginContext.UpdateUserTheme( appTheme );
        else
            sessionHandler.setAppTheme( appTheme );

        setCurrentAppContext( prevContext => ( {
            ...prevContext,
            globalTheme: appTheme
        } ) );
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

        setCurrentAppContext( prevContext => ( {
                ...prevContext,
                allowCookies: allow
        } ) );
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