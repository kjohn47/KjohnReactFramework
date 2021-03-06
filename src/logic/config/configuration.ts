import { IError } from "../context/Error/appErrorInterfaces";
import { IAppContext } from "../context/App/appContextInterfaces";
import { ILogin } from "../context/Login/loginContextInterfaces";
import { AppGlobalTheme } from "../context/App/appContextEnums";
import { sessionHandler } from "../functions/sessionStorage";
import { getRouteUrlAndQuery } from "../functions/routeHandling";
import { trueFalseParser } from "../functions/misc";
import { IRouteContext } from "../context/Routes/routeContextInterfaces";
import { IKnownServices, IKRFRefreshTokenSettings } from "../services/serviceCallerInterfaces";
import { AvailableActionsEnum, AvailableServicesEnum, NotificationRoutesEnum } from "../services/servicesEnums";

/* 
    *** Application Env Keys ***
*/
//Context Keys
const defaultLanguage = process.env.REACT_APP_DEFAULT_LANGUAGE ? process.env.REACT_APP_DEFAULT_LANGUAGE : "EN";
export const appPrefix = process.env.REACT_APP_SESSION_PREFIX ? process.env.REACT_APP_SESSION_PREFIX : 'KRF_';
const cookiesAlertEnabled = process.env.REACT_APP_COOKIE_MODAL ? trueFalseParser(process.env.REACT_APP_COOKIE_MODAL) : false;
export const krfGatewayService = process.env.REACT_APP_USE_GW_SERVICE ? trueFalseParser(process.env.REACT_APP_USE_GW_SERVICE) : false;
export const krfRefreshToken: IKRFRefreshTokenSettings = {
    isEnabled: process.env.REACT_APP_REFRESH_TOKEN_ACTIVE ? trueFalseParser(process.env.REACT_APP_REFRESH_TOKEN_ACTIVE) : false,
    header: process.env.REACT_APP_REFRESH_TOKEN_RESPONSE_HEADER ? process.env.REACT_APP_REFRESH_TOKEN_RESPONSE_HEADER : 'www-authenticate',
    header_Code: process.env.REACT_APP_REFRESH_TOKEN_RESPONSE_HEADER_CODE ? process.env.REACT_APP_REFRESH_TOKEN_RESPONSE_HEADER_CODE : 'REFRESH',
    url: process.env.REACT_APP_REFRESH_TOKEN_URL ? process.env.REACT_APP_REFRESH_TOKEN_URL : 'https://localhost/refresh',
}

//// Width for mobile dimensions
export const mobileWidth: number = process.env.REACT_APP_MOBILE_WIDTH ? parseInt(process.env.REACT_APP_MOBILE_WIDTH) : 480;
export const mobileWidthLoginForm: number = process.env.REACT_APP_MOBILE_WIDTH_LOGIN ? parseInt(process.env.REACT_APP_MOBILE_WIDTH_LOGIN) : 1200;
export const mobileWidthMenu: number = process.env.REACT_APP_MOBILE_WIDTH_MENU ? parseInt(process.env.REACT_APP_MOBILE_WIDTH_MENU) : 640;
export const minHeight: number = process.env.REACT_APP_MIN_HEIGHT ? parseInt(process.env.REACT_APP_MIN_HEIGHT) : 250;

//// Api host server url
//export const apiServerUrl: string = "https://localhost:44378";
export const apiServerUrl: string = process.env.REACT_APP_API_SRV_URL ? process.env.REACT_APP_API_SRV_URL : "";

//// Show caught error from service
export const showDetailedErrors: boolean = process.env.REACT_APP_ERROR_DETAIL ? trueFalseParser(process.env.REACT_APP_ERROR_DETAIL) : false;

let currentUser: ILogin | undefined = sessionHandler.getUserSession();
/*
currentUser = {
    appLanguage: "EN",
    appTheme: AppGlobalTheme.Default,
    authTokenHash: "",
    name: "John",
    surname: "Doe",
    userSessionToken: "abcd",
    allowCookies: false
};*/

let lastSavedLang: string = currentUser !== undefined ? currentUser.appLanguage : sessionHandler.getLastSelectedLanguage(defaultLanguage);
let lastSavedTheme: AppGlobalTheme = currentUser !== undefined ? currentUser.appTheme : sessionHandler.getAppTheme();
let pageRoute = getRouteUrlAndQuery();

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
const tokenData = ( currentUser !== undefined && sessionHandler.getTokenData( currentUser.userSessionToken ) ) || undefined;
export const initialAppConfig: IAppContext = {
    globalTheme: lastSavedTheme,
    adminOptions: tokenData !== undefined && tokenData.isAdmin,
    translations: {},
    errorTranslations: {},
    allowCookies: cookiesAlertEnabled ? ( currentUser !== undefined ? ( currentUser.allowCookies !== undefined ? currentUser.allowCookies : false ) : sessionHandler.getAllowCookieFlag() ): undefined,
    languageCodes: [defaultLanguage]
}

export const initialRouteConfig: IRouteContext = {
    selectedPage: pageRoute.selectedPage,
    queryString: pageRoute.queryString,
    routeReady: false
}

export const initialLanguage: string = lastSavedLang;

//// Get from cookie or storage
export const initialLogin: ILogin | undefined = currentUser;

export const defaultKnownServices: IKnownServices = {
    [AvailableServicesEnum.HomePage]: {
        Name: "homepage",
        Actions: {
            [AvailableActionsEnum.Translation] : {
                Name: "translations"
            },
            [AvailableActionsEnum.Home] : {
                Name: "home"
            }
        },
        GWRoute: "open"
    },
    [AvailableServicesEnum.User]: {
        Name: "user",
        Actions: {
            [AvailableActionsEnum.Notifications] : {
                Name: "notifications",
                Routes: {
                    [NotificationRoutesEnum.GetData]: {
                        Name: "getData"
                    },
                    [NotificationRoutesEnum.ReadCurrent]: {
                        Name: "readCurrent"
                    },
                    [NotificationRoutesEnum.ReadAll]:  {
                        Name: "readAll"
                    },
                    [NotificationRoutesEnum.Delete]: {
                        Name: "delete"
                    }
                }
            }
        },
        GWRoute: "protected"
    }
};