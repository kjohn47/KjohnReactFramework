import { useContext } from "react"
import { AppContext } from "../../config/appConfig"

const useTranslation: () => { getTranslation: ( process: string, token: string ) => string } = () => {
    const [appContext] = useContext( AppContext );
    const getTranslation: ( process: string, token: string ) => string = ( process, token ) => {
        let translation = appContext.translations[ appContext.globalLanguage ];
        let translatedProcess = translation !== undefined ? translation[ process ] : undefined;
        if( translatedProcess === undefined )
            return "#([" + process + "]." + token + ")";
        let translatedText = translatedProcess[ token ];
        if( translatedText === null || translatedText === undefined || translatedText === "" )
            return "#(" + process + ".[" + token + "])";
        return translatedText as string;
    }
    return { getTranslation };
}

export default useTranslation;