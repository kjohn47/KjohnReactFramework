import { useContext } from "react";
import { AppLanguageContext } from "../../config/AppProvider";

const useAppLanguageHandler = () => {
    const [appLanguage, setAppLanguage] = useContext(AppLanguageContext);
    return {
        appLanguage, 
        setAppLanguage
    }
}

export default useAppLanguageHandler;