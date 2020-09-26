import { ITranslations } from "../context/App/appContextInterfaces";
import useAppHandler from "../context/App/AppContextHandler";
import useAppLanguageHandler from "../context/App/AppLanguageContextHandler";
import { useCallback } from "react";

 export interface ITranslation {
    [ process: string ]: {
        [ token: string ]: string;
    };
}

const getToken: ( process: string, token: string, translations: ITranslations, language: string ) => string = ( process, token, translations, language ) => {
    let translation = translations[ language ];
    if ( translation === undefined )
        return `[${ process }.${ token }]`;
    let translatedProcess = translation[ process ];
    if ( translatedProcess === undefined )
        return `[${ process }].${ token }`;
    let translatedText = translatedProcess[ token ];
    if ( translatedText === null || translatedText === undefined || translatedText === "" )
        return `${ process }.[${ token }]`;

    return translatedText;
}

const useTranslation: () => { getTranslation: ( process: string, token: string, args?: string[] ) => string } = () => {
    const appContext = useAppHandler().App;
    const appLanguage = useAppLanguageHandler().appLanguage;

    const getTranslation = useCallback( (process: string, token: string, args?: string[] ): string => {
        if(!(token.startsWith( "#(" ) && token.endsWith(")")))
        {
            return token;
        }
        
        let textOut = getToken( process, token, appContext.translations, appLanguage );
        if ( args && args.length > 0 ) {
            args.forEach( ( arg, i ) => {
                textOut = textOut.replace( `{${ i }}`, arg );
            } )
        }

        return textOut;
    }, [appContext.translations, appLanguage]);

    return { getTranslation };
}

export default useTranslation;