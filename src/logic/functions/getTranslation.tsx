import { useContext } from "react"
import { AppContext, AppLanguageContext } from "../config/AppProvider"
import { ITranslations } from "../context/App/appContextInterfaces";
import { AppLanguage } from "../context/App/appContextEnums";

 export interface ITranslation {
    [ process: string ]: {
        [ token: string ]: string;
    };
}

const getToken: ( process: string, token: string, translations: ITranslations, language: AppLanguage ) => string = ( process, token, translations, language ) => {
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
    const [ appContext ] = useContext( AppContext );
    const [ appLanguage ] = useContext( AppLanguageContext );
    const getTranslation: ( process: string, token: string, args?: string[] ) => string = ( process, token, args?) => {
        let textOut = getToken( process, token, appContext.translations, appLanguage );
        if ( args && args.length > 0 ) {
            args.forEach( ( arg, i ) => {
                textOut = textOut.replace( `{${ i }}`, arg );
            } )
        }

        return textOut;
    }
    return { getTranslation };
}

export default useTranslation;