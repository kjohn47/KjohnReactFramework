import { useState } from "react";
import { ContextActions } from "./appContextEnums";
import { IAppContext,IContextAction } from "./appContextInterfaces";
import { textTranslations } from "./pageText/pageTranslation";
import { setLastSelectedLanguage } from "../functions/sessionStorage";

export function useAppContext( initialContext: IAppContext )
{
    const [currentAppContext, setCurrentAppContext] = useState(initialContext);

    function changeAppConfig( action: IContextAction )
    {     
        switch( action.type ) {
            case ContextActions.ChangeLanguage: {
                if( action.payload.globalLanguage !== undefined )
                {
                    setLastSelectedLanguage( action.payload.globalLanguage );
                    setCurrentAppContext( { ...currentAppContext,
                        globalLanguage: action.payload.globalLanguage,
                        translations: textTranslations[ action.payload.globalLanguage] 
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