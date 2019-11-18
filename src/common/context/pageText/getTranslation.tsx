import { useContext } from "react"
import { AppContext } from "../../config/appConfig"
import { textTranslations } from "./pageTranslation";

const useTranslation: () => { getTranslation: ( process: string, token: string ) => string } = () => {
    const currentLanguage = useContext( AppContext )[ 0 ].globalLanguage;
    const getTranslation: ( process: string, token: string ) => string = ( process, token ) => {
        return textTranslations[ currentLanguage ][ process ][ token ];
    }
    return { getTranslation };
}

export default useTranslation;