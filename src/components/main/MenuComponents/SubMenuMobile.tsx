import React, { useContext } from 'react';
import { ISubMenuItem } from './SubMenu';
import Row from '../../common/structure/Row';
import Column from '../../common/structure/Column';
import PageSelector from '../../common/inputs/PageSelector';
import useTranslation from '../../../logic/functions/getTranslation';
import { AppContext, ErrorContext, LoginContext, RouteContext } from '../../../logic/config/AppProvider';

const SubMenuMobile: React.FC<{ SubMenus: ISubMenuItem[], collapseFunc: () => void }> = ( props ) => {
    const appContext = useContext( AppContext ).App;
    const routeContext = React.useContext( RouteContext ).Route;
    const errorContext = useContext( ErrorContext ).Error;
    const userContext = useContext(LoginContext).Login;
    const { getTranslation } = useTranslation();

    const makeSubMenu = ( subMenu: ISubMenuItem, isSingle: boolean = false ) => {
        if ( !subMenu.Title || subMenu.Title === '' ) {
            return (
                <Column className='subMenuLine'></Column>
            )
        }
        let translatedTitle = subMenu.Title.startsWith( "#(" ) ? getTranslation( "_menu", subMenu.Title ) : subMenu.Title;
        if ( subMenu.Link && ( subMenu.Link !== routeContext.selectedPage || errorContext.hasError || subMenu.Reloadable ) ) {
            return (
                <Column className={ "collapsedSubMenuItem" + ( isSingle ? " collapsedSubMenuSingleItem" : "" ) + ( subMenu.Reloadable && subMenu.Link === routeContext.selectedPage ? ' disabledMenuItem pointer_cursor' : '' ) }>
                    <PageSelector page={ subMenu.Link } action={ props.collapseFunc } forceReload={ subMenu.Reloadable }>{ translatedTitle }</PageSelector>
                </Column>
            )
        }
        return (
            <Column className={ "collapsedSubMenuItem pointer_cursor" + ( isSingle ? " collapsedSubMenuSingleItem" : "" ) + ( !subMenu.Action ? " disabledMenuItem" : "" ) }>
                <span onClick={ () => { if ( subMenu.Action ) { props.collapseFunc(); subMenu.Action(); } } } >{ translatedTitle }</span>
            </Column>
        )
    }

    return (
        <div className="collapsedSubMenuGroup">
            {
                props.SubMenus.map( ( subMenu, i ) =>
                    ( (!subMenu.AdminOnly && !subMenu.AuthOnly) || 
                    (!subMenu.AdminOnly && userContext) ||
                    appContext.adminOptions ) ? 
                        <Row key={ 'sub_menu_' + i }>
                            { makeSubMenu( subMenu, props.SubMenus.length === 1 ) }
                        </Row>
                        : null
                )
            }
        </div>
    )
}

export default SubMenuMobile;