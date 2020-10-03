import React, { useCallback, useState } from 'react';
import { IMenuItem } from './MenuItem';
import Row from '../../common/structure/Row';
import Column, { ColumnNumber } from '../../common/structure/Column';
import SubMenuMobile from './SubMenuMobile';
import useTranslation from '../../../logic/functions/getTranslation';
import useAppHandler from '../../../logic/context/App/AppContextHandler';
import useRouteHandler from '../../../logic/context/Routes/RouteContextHandler';
import useErrorHandler from '../../../logic/context/Error/ErrorContextHandler';
import useLoginHandler from '../../../logic/context/Login/LoginContextHandler';
import { executeClickEnterSpace } from '../../../logic/functions/misc';

const MenuItemMobile: React.FC<IMenuItem & { collapseFunc: () => void; IsSingle?: boolean; }> = ( {
    Title,
    collapseFunc,
    Action,
    AdminOnly,
    AuthOnly,
    IsSingle,
    Link,
    Reloadable,
    SubMenus
} ) => {
    const appContext = useAppHandler().App;
    const {Route, SetPage} = useRouteHandler();
    const errorContext = useErrorHandler().Error;
    const userContext = useLoginHandler().Login;
    const [ subMenuCollapsed, setSubMenuCollapsed ] = useState<boolean>( false );
    const { getTranslation } = useTranslation();

    const handleChangeRoute = useCallback((page?: string, forceReload?: boolean) => {
        page && SetPage({
            page: page,
            forceReload: forceReload
        });
        collapseFunc();
    }, [SetPage, collapseFunc])

    const makeMenuItem = () => {
        let translatedTitle = getTranslation( "_menu", Title );
        if ( Link ) {
            return (
                <Column
                    className={ "collapsedMenuItem pointer_cursor noselect" +
                        ( IsSingle ? " collapsedMenuSingleItem" : "" ) +
                        ( Link === Route.selectedPage && !errorContext.hasError ? " collapsedMenuLinkSelected" : "" ) } 
                    tabIndex={0}
                    onClick={() => handleChangeRoute(Link, Reloadable)}
                    onKeyDown={(e) => executeClickEnterSpace(e, () => handleChangeRoute(Link, Reloadable))}
                >
                    <span className="collapsedMenuItemInner">{ translatedTitle }</span>
                </Column>
            )
        }
        if ( SubMenus ) {
            return (
                <Column 
                    className={ "collapsedMenuItem pointer_cursor noselect" + ( IsSingle ? " collapsedMenuSingleItem" : "" ) + ( subMenuCollapsed ? " collapsedMenuItemSelected" : "" ) }
                    tabIndex={0}
                    onKeyDown={(e)=>executeClickEnterSpace(e, () => setSubMenuCollapsed( !subMenuCollapsed ))}
                >
                    <div className="collapsedMenuItemInner" onClick={ () => setSubMenuCollapsed( !subMenuCollapsed ) }>
                        <Row>
                            <Column full={ ColumnNumber.C16 }>{ translatedTitle }</Column>
                            <Column full={ ColumnNumber.C4 } className="collapseMenuSign">{ subMenuCollapsed ? '-' : '+' }</Column>
                        </Row>
                    </div>
                    {
                        subMenuCollapsed && <SubMenuMobile SubMenus={ SubMenus } collapseFunc={ collapseFunc } />
                    }
                </Column>
            )
        }
        return (
            <Column 
                className={ "collapsedMenuItem pointer_cursor noselect" + ( IsSingle ? " collapsedMenuSingleItem" : "" ) }
                onClick={ () => { collapseFunc(); Action && Action(); } }
                onKeyDown={ e => executeClickEnterSpace(e, () => { collapseFunc(); Action && Action(); } ) }
                tabIndex={0}
            >
                <span className="collapsedMenuItemInner">{ translatedTitle }</span>
            </Column>
        )
    };

    return ( (!AdminOnly && !AuthOnly) || 
             (!AdminOnly && userContext) ||
             appContext.adminOptions ) ? 
                <Row>
                    { makeMenuItem() }
                </Row>
                : null
}

export default MenuItemMobile;