export enum AppLanguage {
    PT = "PT",
    EN = "EN"
}

export enum AppGlobalTheme {
    Default = "PageLayoutColor",
    Red = "PageLayoutColor_Red",
    Green = "PageLayoutColor_Green",
    Blue = "PageLayoutColor_Blue",
    Orange = "PageLayoutColor_Orange",
    Grey = "PageLayoutColor_Grey",
    Pink = "PageLayoutColor_Pink"
}

//Browser Storage Keys
export enum AppStorageKeys {
    APPLANGUAGE = "APPLANGUAGE",
    APPTHEME = "APPTHEME",
    USERDATA = "USERDATA"
}

//Add new actions here
export enum ContextActions {
    ChangeLanguage = "ChangeLanguage",
    ChangeTheme = "ChangeTheme",
    ChangePage = "ChangePage",
    ForceReloadDisable = "ForceReloadDisable"
}

//Add pages to be used on project (Components) - also add to switch case on PageHandler
export enum KnownPages {
    Home = "Home",
    UserSettings = "Usersettings",
    Administration = "Administration",
    Test = "Test"
}