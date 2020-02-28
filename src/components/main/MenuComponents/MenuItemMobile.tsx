import * as React from 'react';
import { IMenuItem } from './MenuItem';
import Row from '../../common/Row';
import Column, { ColumnNumber } from '../../common/Column';
import { useState } from 'react';
import SubMenuMobile from './SubMenuMobile';
import PageSelector from '../../common/PageSelector';
import useTranslation from '../../../common/context/pageText/getTranslation';
import { AppContext, ErrorContext } from '../../../common/config/appConfig';

const MenuItemMobile: React.FC<IMenuItem & { collapseFunc: () => void; IsSingle?: boolean; }> = ( props ) => {
    const [ appContext ] = React.useContext( AppContext );
    const [ errorContext ] = React.useContext( ErrorContext );
    const [ subMenuCollapsed, setSubMenuCollapsed ] = useState<boolean>( false );
    const { getTranslation } = useTranslation();

    const makeMenuItem = () => {
        let translatedTitle = props.Title.startsWith( "#(" ) ? getTranslation( "_menu", props.Title ) : props.Title;
        if ( props.Link ) {
            return (
                <Column
                    className={ "collapsedMenuItem pointer_cursor noselect" +
                        ( props.IsSingle ? " collapsedMenuSingleItem" : "" ) +
                        ( props.Link === appContext.selectedPage && !errorContext.hasError ? " collapsedMenuLinkSelected" : "" ) } >
                    <PageSelector className="collapsedMenuItemInner" action={ props.collapseFunc } page={ props.Link } forceReload={ props.Reloadable }>{ translatedTitle }</PageSelector>
                </Column>
            )
        }
        if ( props.SubMenus ) {
            return (
                <Column className={ "collapsedMenuItem pointer_cursor noselect" + ( props.IsSingle ? " collapsedMenuSingleItem" : "" ) + ( subMenuCollapsed ? " collapsedMenuItemSelected" : "" ) }>
                    <div className="collapsedMenuItemInner" onClick={ () => setSubMenuCollapsed( !subMenuCollapsed ) }>
                        <Row>
                            <Column full={ ColumnNumber.C16 }>{ translatedTitle }</Column>
                            <Column full={ ColumnNumber.C4 } className="collapseMenuSign">{ subMenuCollapsed ? '-' : '+' }</Column>
                        </Row>
                    </div>
                    {
                        subMenuCollapsed && <SubMenuMobile SubMenus={ props.SubMenus } collapseFunc={ props.collapseFunc } />
                    }
                </Column>
            )
        }
        return (
            <Column className={ "collapsedMenuItem pointer_cursor noselect" + ( props.IsSingle ? " collapsedMenuSingleItem" : "" ) } >
                <span className="collapsedMenuItemInner" onClick={ () => { props.collapseFunc(); props.Action && props.Action(); } }>{ translatedTitle }</span>
            </Column>
        )
    };

    return (
        <Row>
            { makeMenuItem() }
        </Row>
    )
}

export default MenuItemMobile;