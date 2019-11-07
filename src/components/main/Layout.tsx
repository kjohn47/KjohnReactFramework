import React, { useContext } from "react";
import '../../styles/Layout.scss';
import { AppContext } from "../../common/config/appConfig";

interface ILayout {
    MenuComponent: React.ComponentType;
    FooterComponent: React.ComponentType;
}

const Layout: React.FC<ILayout> = ( props ) => {
    const selectedTheme = useContext( AppContext )[0].globalTheme;
    return (
        <div className = { "PageLayout " + selectedTheme }>
            <div className = { "PageMenu PageMenuColor" }>
                <props.MenuComponent />
            </div>
            <div className = { "PageContent PageContentColor" } >
                {props.children}
            </div>
            <div className = { "PageFooter PageMenuColor" }>
                <props.FooterComponent />
            </div>
        </div>
    );
}

export default Layout;