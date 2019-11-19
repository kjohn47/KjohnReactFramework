import { useState, useContext } from "react";
import { ContextActions, AppLanguage } from "./appContextEnums";
import { IAppContext, IContextAction, AppContextType } from "./appContextInterfaces";
import { setLastSelectedLanguage, setAppTheme } from "../functions/sessionStorage";
import { LoginContext } from "../config/appConfig";
import { LoginActions } from "./loginContextEnums";
import { ITranslation } from "./pageText/pageTranslationInterfaces";
import { apiServerUrl } from "../config/configuration";
import { AvailableServices } from "../services/servicesAvailable";
import { fetchGetHandler } from "../services/fetchHandler";
import { IServiceError } from "../services/serviceCallerInterfaces";

export const useAppContext: ( initialContext: IAppContext ) => AppContextType = ( initialContext ) => {
    const [ currentAppContext, setCurrentAppContext ] = useState( initialContext );
    const [ currentUser, setCurrentUser ] = useContext( LoginContext );

    const changeAppConfig = ( action: IContextAction ) => new Promise<void | IServiceError>( ( resolve ) => {
        switch ( action.type ) {
            case ContextActions.ChangeLanguage: {
                if ( action.payload.globalLanguage !== undefined ) {
                    if ( currentUser )
                        setCurrentUser( { type: LoginActions.UpdateUserLanguage, userLanguage: action.payload.globalLanguage } );
                    else
                        setLastSelectedLanguage( action.payload.globalLanguage );

                    if ( currentAppContext.translations === {} || currentAppContext.translations[ action.payload.globalLanguage ] === undefined ) {
                        resolve(
                            fetchGetHandler<ITranslation>(
                                `${ apiServerUrl }/${ AvailableServices.Translation }/${ action.payload.globalLanguage }.json` )
                                .then( data =>
                                    setCurrentAppContext( {
                                        ...currentAppContext,
                                        globalLanguage: action.payload.globalLanguage as AppLanguage,
                                        translations: {
                                            ...currentAppContext.translations,
                                            [ action.payload.globalLanguage as AppLanguage ]: data
                                        }
                                    } )
                                )
                                .catch( () =>
                                    setCurrentAppContext( {
                                        ...currentAppContext,
                                        globalLanguage: action.payload.globalLanguage as AppLanguage
                                    } )
                                ) );
                    }
                    else {
                        setCurrentAppContext( {
                            ...currentAppContext,
                            globalLanguage: action.payload.globalLanguage
                        } );
                    }
                }
                break;
            }
            case ContextActions.ChangeTheme: {
                if ( action.payload.pageTheme ) {
                    if ( currentUser )
                        setCurrentUser( { type: LoginActions.UpdateUserTheme, userTheme: action.payload.pageTheme } );
                    else
                        setAppTheme( action.payload.pageTheme );

                    setCurrentAppContext( {
                        ...currentAppContext,
                        globalTheme: action.payload.pageTheme
                    } );
                }
                break;
            }
            case ContextActions.ChangePage: {
                if ( action.payload.selectedPage !== undefined )
                    setCurrentAppContext( {
                        ...currentAppContext,
                        selectedPage: action.payload.selectedPage,
                        queryString: action.payload.queryString
                    } );
                break;
            }
        }
    } )

    return [ currentAppContext, changeAppConfig ];
}