import { IError } from "../context/appErrorInterfaces";
import { IAppContext } from "../context/appContextInterfaces";
import { ILogin } from "../context/loginContextInterfaces";
import { AppLanguage, KnownPages, AppGlobalTheme } from "../context/appContextEnums";
import { textTranslations } from "../context/pageText/pageTranslation";
import { getLastSelectedLanguage, getUserSession, getTokenData } from "../functions/sessionStorage";
import { getQueryStringParams } from "../functions/stringParsing";

let lastSavedLang: AppLanguage = getLastSelectedLanguage();
let currentUser: ILogin | undefined = getUserSession();

//// Error initial config
export const initialError: IError = {
    hasError: false,
    errorData: undefined,
    errorCode: undefined
}

//// Get language from cookie or storage
export const initialAppConfig: IAppContext = {
    globalLanguage: lastSavedLang,
    translations: textTranslations[lastSavedLang],
    globalTheme: AppGlobalTheme.Default,
    selectedPage: window.location.pathname.substring(1) !== "" ? window.location.pathname.substring(1) as KnownPages : KnownPages.Home,
    queryString:  window.location.pathname.substring(1) !== "" ? JSON.stringify( getQueryStringParams<any>( window.location.search.substring(1) ) ) : undefined,
    adminOptions: currentUser !== undefined && getTokenData( currentUser.userSessionToken ).isAdmin
}

//// Get from cookie or storage
export const initialLogin: ILogin | undefined = currentUser;