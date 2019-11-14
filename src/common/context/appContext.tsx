import { useState, useContext } from "react";
import { ContextActions } from "./appContextEnums";
import { IAppContext,IContextAction, AppContextType } from "./appContextInterfaces";
import { textTranslations } from "./pageText/pageTranslation";
import { setLastSelectedLanguage, setAppTheme } from "../functions/sessionStorage";
import { LoginContext } from "../config/appConfig";
import { LoginActions } from "./loginContextEnums";

export const useAppContext: ( initialContext: IAppContext ) => AppContextType = ( initialContext ) =>
{
    const [currentAppContext, setCurrentAppContext] = useState(initialContext);
    const [currentUser, setCurrentUser] = useContext(LoginContext);

    function changeAppConfig( action: IContextAction )
    {     
        switch( action.type ) {
            case ContextActions.ChangeLanguage: {
                if( action.payload.globalLanguage !== undefined )
                {
                    if( currentUser )
                        setCurrentUser( { type: LoginActions.UpdateUserLanguage, userLanguage: action.payload.globalLanguage } );
                    else                    
                        setLastSelectedLanguage( action.payload.globalLanguage );

                    setCurrentAppContext( { ...currentAppContext,
                        globalLanguage: action.payload.globalLanguage,
                        translations: textTranslations[ action.payload.globalLanguage] 
                    } );
                }
                break;
            }
            case ContextActions.ChangeTheme: {
                if( action.payload.pageTheme )
                {                    
                    if( currentUser )
                        setCurrentUser( { type: LoginActions.UpdateUserTheme, userTheme: action.payload.pageTheme } );
                    else                    
                        setAppTheme( action.payload.pageTheme );
                    
                    setCurrentAppContext( { ...currentAppContext,
                        globalTheme: action.payload.pageTheme
                    } );
                }
                break;
            }
            case ContextActions.ChangePage: {
                if( action.payload.selectedPage !== undefined )
                    setCurrentAppContext( { ...currentAppContext,
                        selectedPage: action.payload.selectedPage,
                        queryString: action.payload.queryString
                    } );
                break;
            }
        }
    }
    
    return [ currentAppContext, changeAppConfig ];
}