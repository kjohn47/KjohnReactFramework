import { IError } from "../context/appErrorInterfaces";
import { IAppContext } from "../context/appContextInterfaces";
import { ILogin } from "../context/loginContextInterfaces";
import { AppLanguage, AppGlobalTheme } from "../context/appContextEnums";
import { getLastSelectedLanguage, getUserSession, getTokenData, getAppTheme } from "../functions/sessionStorage";
import { getRouteUrlAndQuery } from "../functions/routeHandling";
import { trueFalseParser } from "../functions/misc";

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
    globalTheme: lastSavedTheme,
    selectedPage: pageRoute.selectedPage,
    queryString: pageRoute.queryString,
    adminOptions: currentUser !== undefined && getTokenData( currentUser.userSessionToken ).isAdmin,
    translations: {}
}

export const initialLanguage: AppLanguage = lastSavedLang;

//// Get from cookie or storage
export const initialLogin: ILogin | undefined = currentUser;

//// Width for mobile dimensions
export const mobileWidth: number = process.env.REACT_APP_MOBILE_WIDTH ? parseInt(process.env.REACT_APP_MOBILE_WIDTH) : 480;
export const mobileWidthLoginForm: number = process.env.REACT_APP_MOBILE_WIDTH_LOGIN ? parseInt(process.env.REACT_APP_MOBILE_WIDTH_LOGIN) : 1200;
export const mobileWidthMenu: number = process.env.REACT_APP_MOBILE_WIDTH_MENU ? parseInt(process.env.REACT_APP_MOBILE_WIDTH_MENU) : 640;

//// Api host server url
//export const apiServerUrl: string = "https://localhost:44378";
export const apiServerUrl: string = process.env.REACT_APP_API_SRV_URL ? process.env.REACT_APP_API_SRV_URL : "/";

//// Show caught error from service
export const showDetailedErrors: boolean = process.env.REACT_APP_ERROR_DETAIL ? trueFalseParser(process.env.REACT_APP_ERROR_DETAIL) : false;