export enum AppLanguage {
    PT = "PT",
    EN = "EN"
}

export enum AppGlobalTheme {
    Default,
    Blue,
    Green,
    Red,
    Orange,
    Grey
}

//Browser Storage Keys
export enum AppStorageKeys {
    APPLANGUAGE = "APPLANGUAGE",
    USERDATA = "USERDATA"
}

//Add new actions here
export enum ContextActions {
    ChangeLanguage = "ChangeLanguage",
    ChangePage = "ChangePage"
}

//Add pages to be used on project (Components) - also add to switch case on PageHandler
export enum KnownPages {
    Home = "Home",
    Test = "Test",
    Error = "Error"
}