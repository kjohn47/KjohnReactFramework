import { useContext } from "react"
import { AppContext } from "../../config/appConfig"
import { textTranslations } from "./pageTranslation";

const useTranslation: () => { getTranslation: ( process: string, token: string ) => string } = () => {
    const currentLanguage = useContext( AppContext )[ 0 ].globalLanguage;
    const getTranslation: ( process: string, token: string ) => string = ( process, token ) => {
        let translatedProcess = textTranslations[ currentLanguage ][ process ];
        if( translatedProcess === undefined )
            return "#([" + process + "]." + token + ")";
        let translatedText = translatedProcess[ token ];
        if( translatedText === null || translatedText === undefined || translatedText === "" )
            return "#(" + process + ".[" + token + "])";
        return translatedText;
    }
    return { getTranslation };
}

export default useTranslation;