import { IError } from "../context/appErrorInterfaces";
import { IAppContext } from "../context/appContextInterfaces";
import { ILogin } from "../context/loginContextInterfaces";
import { AppLanguage, KnownPages, AppGlobalTheme } from "../context/appContextEnums";
//import { textTranslations } from "../context/pageText/pageTranslation";
import { getLastSelectedLanguage, getUserSession, getTokenData, getAppTheme } from "../functions/sessionStorage";
import { getQueryStringParams } from "../functions/stringParsing";

let currentUser: ILogin | undefined = getUserSession();
let lastSavedLang: AppLanguage = currentUser !== undefined ? currentUser.appLanguage : getLastSelectedLanguage();
let lastSavedTheme: AppGlobalTheme = currentUser !== undefined ? currentUser.appTheme : getAppTheme();

if ( !( Object ).values( AppLanguage ).includes( lastSavedLang ) as any ) {
    lastSavedLang = AppLanguage.PT;
}

if ( !( Object ).values( AppGlobalTheme ).includes( lastSavedTheme ) as any ) {
    lastSavedTheme = AppGlobalTheme.Default;
}

//// Error initial config
export const initialError: IError = {
    hasError: false,
    errorDescription: undefined,
    errorCode: undefined
}

//// Get language from cookie or storage
export const initialAppConfig: IAppContext = {
    globalLanguage: lastSavedLang,
    //translations: textTranslations[lastSavedLang],
    globalTheme: lastSavedTheme,
    selectedPage: window.location.pathname.substring(1) !== "" ? window.location.pathname.substring(1) as KnownPages : KnownPages.Home,
    queryString:  window.location.pathname.substring(1) !== "" ? JSON.stringify( getQueryStringParams<any>( window.location.search.substring(1) ) ) : undefined,
    adminOptions: currentUser !== undefined && getTokenData( currentUser.userSessionToken ).isAdmin
}

//// Get from cookie or storage
export const initialLogin: ILogin | undefined = currentUser;

export const mobileWidth: number = 480;