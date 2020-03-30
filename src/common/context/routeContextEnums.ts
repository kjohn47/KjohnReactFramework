//Add new actions here
export enum RouteActions {
    ChangePage = "ChangePage",
    ForceReloadDisable = "ForceReloadDisable"
}

//Add pages to be used on project (Components) - also add to switch case on PageHandler
export enum KnownPages {
    Home = "Home",
    UserSettings = "Usersettings",
    Administration = "Administration",
    Test = "Test",
    ErrorPage = "ErrorPage"
}