# KjohnReactFramework
Framework to make development of react app with integrated authentication, authorization, service and error handling, routing, multi language and easy to use

# Env vars:

REACT_APP_API_SRV_URL=/ -> sets main api server route

REACT_APP_MOBILE_WIDTH=480 -> sets mobile view width constant

REACT_APP_MOBILE_WIDTH_LOGIN=1200 -> sets width for login to collapse

REACT_APP_MOBILE_WIDTH_MENU=640 -> sets width for menu to collapse

REACT_APP_SESSION_PREFIX=KRF_ ->prefix for the session keys

REACT_APP_ERROR_DETAIL=true -> show or hide detailed information in error page (like error from server and exceptions)

REACT_APP_COOKIE_MODAL=true -> enable modal at startup that informs user of the use of cookies on the application. The configuration must be set on main component.

REACT_APP_DEFAULT_LANGUAGE=EN -> default selected language when first time loading the app


# Session/Browser Storage and Configuration

-> Language

-> Theme

-> User Login

-> Cookie flag (expiration)


# Context hooks:

-> Application

-> Loading

-> Language Code

-> Routes

-> Errors

-> Login

-> Modal


# Functionality hooks:

-> Translations hook: useTranslation() -> getTranslation(string(process key), string(token), Array<string>(args)):

--> This hook will return the translation for selected language. 

----> *process key is a string, normally starts with _

----> *token is a key that must be setted as #(text). If not setted correctly, the text is returned.

----> *args are arguments that will replace the text from translation replacing {n} where n is a number and the position of the argument on the array. Similar to string.Format

---> In case of no translation is present, the process key and token are returned indicating with [] which of them is missing.

-> Error Hook

-> Services hooks

-> Fetch Hooks

-> Window Size


# Functionality components:

-> Menu

-> Notifications

-> Page Selector

-> Language Selector

-> Modals

-> Download

-> FieldSet

-> Buttons

-> Text Input

-> Date Picker

-> Rows and Columns

-> Side Menu 

-> Tab Group

-> Cards

-> Labels

-> Tooltips

-> Loading

-> Icons

-> Alerts

-> Badges

-> Balloons

-> Header

-> Table


# HOC

-> With Login


# Authentication and Authorization


# Miscelineous Functions


# Styles