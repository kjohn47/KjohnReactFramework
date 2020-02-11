import { useState, useContext } from "react";
import { ContextActions, AppLanguage } from "./appContextEnums";
import { IAppContext, IContextAction, AppContextType } from "./appContextInterfaces";
import { setLastSelectedLanguage, setAppTheme } from "../functions/sessionStorage";
import { LoginContext, AppLanguageContext } from "../config/appConfig";
import { LoginActions } from "./loginContextEnums";
import { ITranslation } from "./pageText/pageTranslationInterfaces";
import { AvailableServices } from "../services/servicesEnums";
import { useFetchGetHandler } from "../services/fetchHandler";
import { IServiceError } from "../services/serviceCallerInterfaces";

export const useAppContext: ( initialContext: IAppContext ) => AppContextType = ( initialContext ) => {
    const [ currentAppContext, setCurrentAppContext ] = useState( initialContext );
    const [ currentUser, setCurrentUser ] = useContext( LoginContext );
    const setAppLanguage = useContext( AppLanguageContext )[1];
    const getTranslation = useFetchGetHandler<ITranslation>(`${ AvailableServices.Translation }`);

    const changeAppConfig = ( action: IContextAction ) => new Promise<void | IServiceError>( ( resolve ) => {
        switch ( action.type ) {
            case ContextActions.ChangeLanguage: {
                if ( action.payload.globalLanguage !== undefined ) {   
                    let globalLanguage: string = action.payload.globalLanguage.toString();
                    if ( currentUser )
                        setCurrentUser( { type: LoginActions.UpdateUserLanguage, userLanguage: action.payload.globalLanguage } );
                    else
                        setLastSelectedLanguage( action.payload.globalLanguage );

                    if ( currentAppContext.translations === {} || currentAppContext.translations[ globalLanguage ] === undefined ) {
                        resolve(
                            getTranslation( `/${ globalLanguage }` )
                                .then( data => 
                                    setCurrentAppContext( {
                                        ...currentAppContext,
                                        translations: {
                                            ...currentAppContext.translations,
                                            [globalLanguage]: data as ITranslation
                                        }
                                    } )
                                )
                                .then(() => 
                                    setAppLanguage(globalLanguage as AppLanguage)
                                )
                                .catch( () =>
                                    setAppLanguage(globalLanguage as AppLanguage)
                                ) );
                    }
                    else {
                       setAppLanguage(globalLanguage as AppLanguage);
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