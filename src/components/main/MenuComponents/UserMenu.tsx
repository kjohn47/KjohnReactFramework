import React, { useState, useRef, useEffect, useCallback } from 'react';
import {useMobileWidth} from '../../../logic/functions/windowResize';
import Row from '../../common/structure/Row';
import Column from '../../common/structure/Column';
import SubMenu, { ISubMenuItem } from './SubMenu';
import { KnownPages } from '../../../logic/context/Routes/routeContextEnums';
import MenuItemMobile from './MenuItemMobile';
import MenuNotification from './MenuNotification';
import { executeAfterLostFocusChild, executeClickEnterSpace, PageType } from '../../../logic/functions/misc';
import useAppHandler from '../../../logic/context/App/AppContextHandler';
import useLoginHandler from '../../../logic/context/Login/LoginContextHandler';

export interface IUserCustomMenu {
    Title?: string;
    Action?: () => void;
    Link?: PageType;
    Reloadable?: boolean;
    AdminOnly?: boolean;
}

const UserMenu: React.FC<{ CustomMenus?: IUserCustomMenu[]; NotificationsEnabled?: boolean; NotificationsRoute?: PageType; NotificationRefreshTime?: number;}> = ( {
    CustomMenus,
    NotificationRefreshTime,
    NotificationsEnabled,
    NotificationsRoute
} ) => {
    const appContext = useAppHandler().App;
    const userContext = useLoginHandler().Login;
    const [ toogle, setToogle ] = useState<boolean>( false );
    const [ shortName, setShortName ] = useState<boolean>( false );
    const [ menuCollapse, setMenuCollapse ] = useState<boolean>( false );
    const mobileWidth = useMobileWidth();
    const userMenuRef = useRef<HTMLDivElement>( null );
    const notificationRef = useRef<HTMLDivElement>( null );

    const handleClickOutUsrMenu = useCallback(( event:any ): void => {
        if ( toogle && 
            ( ( userMenuRef != null && userMenuRef.current !== null && !userMenuRef.current.contains( event.target ) ) ||
              ( notificationRef != null && notificationRef.current !== null && notificationRef.current.contains( event.target ) ) ) ) {
            setToogle( false );
        }
    }, [toogle]);

    const handleTabOutUsrMenu = useCallback((e: KeyboardEvent) => {
        if(toogle && userMenuRef.current)
        {
            if(NotificationsEnabled && notificationRef.current)
            {
                const notificationMenu = notificationRef.current.querySelector('.BadgeComponent_Inner') as HTMLElement;
                if(document.activeElement === notificationMenu)
                {
                    e.preventDefault();
                    setToogle(false);
                }
                else
                {
                    executeAfterLostFocusChild(e, userMenuRef.current, () => setToogle(false));
                }
            }
            else
            {
                executeAfterLostFocusChild(e, userMenuRef.current, () => setToogle(false));
            }
        }
    }, [toogle, NotificationsEnabled] )

    useEffect( () => {
        // add when mounted
        document.addEventListener( "mousedown", handleClickOutUsrMenu );
        // return function to be called when unmounted
        return () => {
            document.removeEventListener( "mousedown", handleClickOutUsrMenu );
        };
    }, [ handleClickOutUsrMenu ] )

    useEffect( () => {
        // add when mounted
        document.addEventListener( "keyup", handleTabOutUsrMenu );
        // return function to be called when unmounted
        return () => {
            document.removeEventListener( "keyup", handleTabOutUsrMenu );
        };
    }, [ handleTabOutUsrMenu ] )

    useEffect( () => {
        if ( mobileWidth.isMobileWidthLoginForm && !mobileWidth.isMobileWidthMenu ) {
            setShortName( true );
            if ( menuCollapse ) {
                setMenuCollapse( false );
                setToogle( false );
            }
        }
        else if ( mobileWidth.isMobileWidthMenu ) {
            if ( !menuCollapse ) {
                setToogle( false );
            }
            setShortName( true );
            setMenuCollapse( true );
        }
        else {
            setShortName( false );
            setMenuCollapse( false );
            setToogle( false );
        }
        //eslint-disable-next-line
    }, [ mobileWidth.isMobileWidthLoginForm, mobileWidth.isMobileWidthMenu ] );

    const renderDropDown = () => {
        const menus: ISubMenuItem[] = [
            { Title: "#(User)", Link: KnownPages.UserSettings }
        ];

        if ( CustomMenus ) {
            CustomMenus.forEach( ( menu ) => {
                if(!menu.AdminOnly || appContext.adminOptions)
                {
                    menus.push( { Title: menu.Title, Action: menu.Action, Link: menu.Link, Reloadable: menu.Reloadable } );
                }
            } );
        }

        if ( appContext.adminOptions ) {
            menus.push( { Title: "#(Administration)", Link: KnownPages.Administration } );
        }

        menus.push( {} );
        menus.push( { Title: "#(Logout)", Action: () => null } )

        return (
            <div className="userSubMenuDrop">
                <SubMenu subMenu={ menus } unToogle={ () => setToogle( false ) } />
            </div>
        )
    }

    const renderCollapsed = () => {
        return (
            <Row>
                <Column className="collapsedMenuGroup collapsedMenuGroupUserMenu">
                    <MenuItemMobile Title="#(User)" Link={ KnownPages.UserSettings } collapseFunc={ () => { setToogle( false ) } } />
                    {
                        CustomMenus && CustomMenus.map( ( menu, i ) =>
                            menu.Title && ( !menu.AdminOnly || appContext.adminOptions ) ?
                            <MenuItemMobile
                                key={ i }
                                Title={ menu.Title }
                                collapseFunc={ () => setToogle( false ) }
                                Action={ menu.Action }
                                Link={ menu.Link }
                                Reloadable={ menu.Reloadable }
                            />
                            : null
                        )
                    }
                    { appContext.adminOptions && <MenuItemMobile Title="#(Administration)" Link={ KnownPages.Administration } collapseFunc={ () => { setToogle( false ) } } /> }
                    <MenuItemMobile Title="#(Logout)" Action={ () => null } collapseFunc={ () => { setToogle( false ) } } />
                </Column>
            </Row>
        )
    }


    return (
            <div ref={ userMenuRef }>
                { NotificationsEnabled && NotificationsRoute && 
                    <MenuNotification 
                        reference = {notificationRef} 
                        Route= { NotificationsRoute ? NotificationsRoute : "" }
                        RefreshTime = { NotificationRefreshTime }
                    />
                }
                <div 
                    className="menuLanguageCol pointer_cursor noselect" 
                    tabIndex={ 0 } 
                    onClick={ (e) => { toogle && e.currentTarget.blur(); setToogle( !toogle )} }
                    onKeyDown={(e) => executeClickEnterSpace(e, () => setToogle( !toogle ))}
                >
                    <span className={ ( toogle ? 'menuItemColSel' : '' ) }>
                        { userContext && ( `${ userContext.name } ${ shortName ? `${ userContext.surname.charAt( 0 ) }.` : userContext.surname }` ) }
                    </span>
                </div>
                { toogle && ( menuCollapse ? renderCollapsed() : renderDropDown() ) }
            </div>
    )
}

export default UserMenu;