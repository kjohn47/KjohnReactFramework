import { IError } from "../context/Error/appErrorInterfaces";
import { IAppContext } from "../context/App/appContextInterfaces";
import { ILogin } from "../context/Login/loginContextInterfaces";
import { AppLanguage, AppGlobalTheme } from "../context/App/appContextEnums";
import { getLastSelectedLanguage, getUserSession, getTokenData, getAppTheme } from "../functions/sessionStorage";
import { getRouteUrlAndQuery } from "../functions/routeHandling";
import { trueFalseParser } from "../functions/misc";
import { IRouteContext } from "../context/Routes/routeContextInterfaces";

let currentUser: ILogin | undefined = getUserSession();
/*
currentUser = {
    appLanguage: AppLanguage.PT,
    appTheme: AppGlobalTheme.Default,
    authTokenHash: "",
    name: "John",
    surname: "Doe",
    userSessionToken: "abcd"
};*/

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
const tokenData = ( currentUser !== undefined && getTokenData( currentUser.userSessionToken ) ) || undefined;
export const initialAppConfig: IAppContext = {
    globalTheme: lastSavedTheme,
    adminOptions: tokenData !== undefined && tokenData.isAdmin,
    translations: {}
}

export const initialRouteConfig: IRouteContext = {
    selectedPage: pageRoute.selectedPage,
    queryString: pageRoute.queryString,
    routeReady: false
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