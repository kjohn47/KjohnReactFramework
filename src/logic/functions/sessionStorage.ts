import { AppLanguage, AppStorageKeys, AppGlobalTheme } from "../context/App/appContextEnums";
import { ILogin } from "../context/Login/loginContextInterfaces";
import SHA from "sha.js";
import JWT from "jsonwebtoken";

interface IAuthTokenPayload {
    name: string;
    surname: string;
    appLanguage: AppLanguage;
    appTheme: AppGlobalTheme;
    isAdmin: boolean;
}

interface IAllowCookieSettings {
    Expire: Date;
}

const appPrefix = process.env.REACT_APP_SESSION_PREFIX ? process.env.REACT_APP_SESSION_PREFIX : 'KRF_';
const getSessionKey = (key: AppStorageKeys ): string =>
{
    return `${appPrefix}${key}`;
}

const validateStoredUser: ( storedUser: ILogin ) => boolean = ( storedUser ) => {
    if ( storedUser.name !== "" &&
        storedUser.surname !== "" &&
        storedUser.userSessionToken !== "" &&
        storedUser.authTokenHash.length === 64 ) {
        ////verify token signature is correct
        return SHA( 'sha256' ).update( storedUser.userSessionToken ).digest( 'hex' ) === storedUser.authTokenHash;
    }

    return false;
}

const getLastSelectedLanguage: () => AppLanguage = () => {
    let storedLanguage: string | null = localStorage.getItem( getSessionKey(AppStorageKeys.APPLANGUAGE) );

    if ( storedLanguage !== null ) {
        return storedLanguage as AppLanguage;
    }

    setLastSelectedLanguage( AppLanguage.PT );
    return AppLanguage.PT;
}

const setLastSelectedLanguage: ( language: AppLanguage ) => void = ( language ) => {
    localStorage.setItem( getSessionKey(AppStorageKeys.APPLANGUAGE), language );
}

const getAppTheme: () => AppGlobalTheme = () => {
    let storedTheme: string | null = localStorage.getItem( getSessionKey(AppStorageKeys.APPTHEME) );

    if ( storedTheme !== null ) {
        return storedTheme as AppGlobalTheme;
    }

    setAppTheme( AppGlobalTheme.Default );
    return AppGlobalTheme.Default;
}

const setAppTheme: ( language: AppGlobalTheme ) => void = ( theme ) => {
    localStorage.setItem( getSessionKey(AppStorageKeys.APPTHEME), theme );
}

const setUserSession: ( userData: ILogin, permanent?: boolean ) => void = ( userData, permanent ) => {
    if ( permanent ) {
        localStorage.setItem( getSessionKey(AppStorageKeys.USERDATA), JSON.stringify( userData ) );
    }
    else {
        sessionStorage.setItem( getSessionKey(AppStorageKeys.USERDATA), JSON.stringify( userData ) );
    }
}

const updateUserSession: ( userDate: ILogin ) => void = ( userData ) => {
    let storedUser: string | null = localStorage.getItem( getSessionKey(AppStorageKeys.USERDATA) );

    if ( storedUser === null ) {
        storedUser = sessionStorage.getItem( getSessionKey(AppStorageKeys.USERDATA) );
        if ( storedUser !== null )
            setUserSession( userData );
    }
    else {
        setUserSession( userData, true );
    }
}

const getUserSession: () => ILogin | undefined = () => {
    let storedUser: string | null = localStorage.getItem( getSessionKey(AppStorageKeys.USERDATA) );

    if ( storedUser === null ) {
        storedUser = sessionStorage.getItem( getSessionKey(AppStorageKeys.USERDATA) );
    }

    if ( storedUser !== null ) {
        let parsedUser = JSON.parse( storedUser ) as ILogin;
        if ( validateStoredUser( parsedUser ) )
            return parsedUser;
    }

    return undefined;
}

const clearUserSession: () => void = () => {
    localStorage.removeItem( getSessionKey(AppStorageKeys.USERDATA) );
    sessionStorage.removeItem( getSessionKey(AppStorageKeys.USERDATA) );
}

const getTokenData: ( token: string ) => IAuthTokenPayload = ( token ) => {
    let tokenPayload = JWT.decode( token );
    return tokenPayload as IAuthTokenPayload;
}

const getAllowCookieFlag = (): boolean => {
    let allowCookieItem = localStorage.getItem( getSessionKey(AppStorageKeys.COOKIEFLAG) );
    if(allowCookieItem !== undefined && allowCookieItem !== null)
    {
        let cookieSetting = JSON.parse(allowCookieItem) as IAllowCookieSettings;
        const expire = new Date(cookieSetting.Expire);
        
        if(expire  > new Date())
        {
            return true;
        }
    }
    return false;
}

const setAllowCookieFlag = (): void => {
    const expire = new Date();
    const currMonth = expire.getMonth();
    expire.setMonth(currMonth + 1);
    const allowCookie: IAllowCookieSettings = {
        Expire: expire
    };

    localStorage.setItem( getSessionKey(AppStorageKeys.COOKIEFLAG), JSON.stringify(allowCookie));
}

export const sessionHandler = {
    getLastSelectedLanguage,
    setLastSelectedLanguage,
    getAppTheme,
    setAppTheme,
    setUserSession,
    updateUserSession,
    getUserSession,
    clearUserSession,
    getTokenData,
    getAllowCookieFlag,
    setAllowCookieFlag
}