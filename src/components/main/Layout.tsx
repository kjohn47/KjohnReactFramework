import React from "react";
import ModalWrapper from "./ModalWrapper";
import useAppHandler from "../../logic/context/App/AppContextHandler";
import MenuWrapper from "./MenuWrapper";
import ContentWrapper from "./ContentWrapper";
import FooterWrapper from "./FooterWrapper";

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
                <MenuWrapper IsCustom = {props.IsCustomMenu}>
                    <props.MenuComponent />
                </MenuWrapper>
                <ContentWrapper>
                    { props.children }
                </ContentWrapper>
                <FooterWrapper IsCustom = {props.IsCustomFooter}>
                    <props.FooterComponent />
                </FooterWrapper>
            </ModalWrapper>
        </div>
    );
}

export default Layout;