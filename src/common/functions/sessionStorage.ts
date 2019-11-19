import { AppLanguage, AppStorageKeys, AppGlobalTheme } from "../context/appContextEnums";
import { ILogin } from "../context/loginContextInterfaces";
import SHA from "sha.js";
import JWT from "jsonwebtoken";

interface IAuthTokenPayload {
    name: string;
    surname: string;
    appLanguage: AppLanguage;
    appTheme: AppGlobalTheme;
    isAdmin: boolean;
}

export const getLastSelectedLanguage: () => AppLanguage = () => {
    let storedLanguage: string | null = localStorage.getItem( AppStorageKeys.APPLANGUAGE );

    if ( storedLanguage !== null ) {
        return storedLanguage === AppLanguage.PT ? AppLanguage.PT : AppLanguage.EN;
    }

    setLastSelectedLanguage( AppLanguage.PT );
    return AppLanguage.PT;
}

export const setLastSelectedLanguage: ( language: AppLanguage ) => void = ( language ) => {
    localStorage.setItem( AppStorageKeys.APPLANGUAGE, language );
}

export const getAppTheme: () => AppGlobalTheme = () => {
    let storedTheme: string | null = localStorage.getItem( AppStorageKeys.APPTHEME );

    if ( storedTheme !== null ) {
        return storedTheme as AppGlobalTheme;
    }

    setAppTheme( AppGlobalTheme.Default );
    return AppGlobalTheme.Default;
}

export const setAppTheme: ( language: AppGlobalTheme ) => void = ( theme ) => {
    localStorage.setItem( AppStorageKeys.APPTHEME, theme );
}

export const setUserSession: ( userData: ILogin, permanent?: boolean ) => void = ( userData, permanent ) => {
    if ( permanent ) {
        localStorage.setItem( AppStorageKeys.USERDATA, JSON.stringify( userData ) );
    }
    else {
        sessionStorage.setItem( AppStorageKeys.USERDATA, JSON.stringify( userData ) );
    }
}

export const updateUserSession: ( userDate: ILogin ) => void = ( userData ) => {
    let storedUser: string | null = localStorage.getItem( AppStorageKeys.USERDATA );

    if ( storedUser === null ) {
        storedUser = sessionStorage.getItem( AppStorageKeys.USERDATA );
        if ( storedUser !== null )
            setUserSession( userData );
    }
    else {
        setUserSession( userData, true );
    }
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

export const getUserSession: () => ILogin | undefined = () => {
    let storedUser: string | null = localStorage.getItem( AppStorageKeys.USERDATA );

    if ( storedUser === null ) {
        storedUser = sessionStorage.getItem( AppStorageKeys.USERDATA );
    }

    if ( storedUser !== null ) {
        let parsedUser = JSON.parse( storedUser ) as ILogin;
        if ( validateStoredUser( parsedUser ) )
            return parsedUser;
    }

    return undefined;
}

export const clearUserSession: () => void = () => {
    localStorage.removeItem( AppStorageKeys.USERDATA );
    sessionStorage.removeItem( AppStorageKeys.USERDATA );
}

export const getTokenData: ( token: string ) => IAuthTokenPayload = ( token ) => {
    let tokenPayload = JWT.decode( token );
    return tokenPayload as IAuthTokenPayload;
}