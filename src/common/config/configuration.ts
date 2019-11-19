import { IError } from "../context/appErrorInterfaces";
import { IAppContext } from "../context/appContextInterfaces";
import { ILogin } from "../context/loginContextInterfaces";
import { AppLanguage, AppGlobalTheme } from "../context/appContextEnums";
import { getLastSelectedLanguage, getUserSession, getTokenData, getAppTheme } from "../functions/sessionStorage";
import { getRouteUrlAndQuery } from "../functions/routeHandling";

let currentUser: ILogin | undefined = getUserSession();
let lastSavedLang: AppLanguage = currentUser !== undefined ? currentUser.appLanguage : getLastSelectedLanguage();
let lastSavedTheme: AppGlobalTheme = currentUser !== undefined ? currentUser.appTheme : getAppTheme();
let pageRoute = getRouteUrlAndQuery();

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
    globalTheme: lastSavedTheme,
    selectedPage: pageRoute.selectedPage,
    queryString: pageRoute.queryString,
    adminOptions: currentUser !== undefined && getTokenData( currentUser.userSessionToken ).isAdmin,
    translations: {}
}

//// Get from cookie or storage
export const initialLogin: ILogin | undefined = currentUser;

//// Width for mobile dimensions
export const mobileWidth: number = 480;

//// Api host server url
export const apiServerUrl: string = "";