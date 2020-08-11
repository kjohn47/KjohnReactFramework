import React from "react";
import ModalWrapper from "./ModalWrapper";
import useAppHandler from "../../logic/context/App/AppContextHandler";

interface ILayout {
    MenuComponent: React.ComponentType;
    FooterComponent: React.ComponentType;
    IsCustomMenu: boolean;
    IsCustomFooter: boolean;
}

const Layout: React.FC<ILayout> = ( props ) => {
    const selectedTheme = useAppHandler().App.globalTheme;
    return (
        <div className={ "PageLayout " + selectedTheme }>
            <ModalWrapper>
                <div className={ !props.IsCustomMenu ? "PageMenu PageMenuColor" : "" }>
                    <props.MenuComponent />
                </div>
                <div className={ "PageContent PageContentColor" } >
                    { props.children }
                </div>
                <div className={ !props.IsCustomFooter ? "PageFooter PageMenuColor" : "" }>
                    <props.FooterComponent />
                </div>
            </ModalWrapper>
        </div>
    );
}

export default Layout;