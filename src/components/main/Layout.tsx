import React, { useContext } from "react";
import '../../styles/Layout.css';
import { AppContext } from "../../common/config/appConfig";
import { AppGlobalTheme } from "../../common/context/appContextEnums";

interface ILayout {
    MenuComponent: React.ComponentType;
    FooterComponent: React.ComponentType;
}

interface IAppThemeCss {
    menuCss: string;
    contentCss: string;
}

const getThemeCss: ( appTheme: AppGlobalTheme ) => IAppThemeCss = ( appTheme ) => {
    switch( appTheme ) 
    {
        case AppGlobalTheme.Blue: 
            return {
                contentCss: " PageContentColor_Blue",
                menuCss: " PageMenuColor_Blue"
            }
        case AppGlobalTheme.Green: 
            return {
                contentCss: " PageContentColor_Green",
                menuCss: " PageMenuColor_Green"
            }
        case AppGlobalTheme.Red: 
            return {
                contentCss: " PageContentColor_Red",
                menuCss: " PageMenuColor_Red"
            }
        case AppGlobalTheme.Orange: 
            return {
                contentCss: " PageContentColor_Orange",
                menuCss: " PageMenuColor_Orange"
            }
        case AppGlobalTheme.Grey: 
            return {
                contentCss: " PageContentColor_Grey",
                menuCss: " PageMenuColor_Grey"
            }
        default:
            return {
                contentCss: " PageContentColor",
                menuCss: " PageMenuColor"
            }
    }
}

const Layout: React.FC<ILayout> = ( props ) => {
    const selectedTheme = useContext( AppContext )[0].globalTheme;
    let theme = getThemeCss( selectedTheme );

    return (
        <div className = "PageLayout">
            <div className = { "PageMenu" + theme.menuCss }>
                <props.MenuComponent />
            </div>
            <div className = { "PageContent" + theme.contentCss } >
                {props.children}
            </div>
            <div className = { "PageFooter" + theme.menuCss }>
                <props.FooterComponent />
            </div>
        </div>
    );
}

export default Layout;