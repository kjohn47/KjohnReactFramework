import { useContext } from "react"
import { AppContext } from "../../config/appConfig"
import { ITranslations } from "../appContextInterfaces";
import { AppLanguage } from "../appContextEnums";

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
    const getTranslation: ( process: string, token: string, args?: string[] ) => string = ( process, token, args?) => {
        let textOut = getToken( process, token, appContext.translations, appContext.globalLanguage );
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