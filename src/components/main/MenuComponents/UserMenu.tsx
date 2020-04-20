import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext, LoginContext } from '../../../common/config/appConfig';
import useWindowSize from '../../../common/functions/windowResize';
import { mobileWidthMenu, mobileWidthLoginForm } from '../../../common/config/configuration';
import Row from '../../common/Row';
import Column from '../../common/Column';
import SubMenu, { ISubMenuItem } from './SubMenu';
import { KnownPages } from '../../../common/context/routeContextEnums';
import MenuItemMobile from './MenuItemMobile';
import MenuNotification from './MenuNotification';
import { PageType } from '../../../common/functions/misc';

export interface IUserCustomMenu {
    Title?: string;
    Action?: () => void;
    Link?: PageType;
    Reloadable?: boolean;
    AdminOnly?: boolean;
}

const UserMenu: React.FC<{ CustomMenus?: IUserCustomMenu[]; NotificationsEnabled?: boolean; NotificationsRoute?: PageType; NotificationRefreshTime?: number;}> = ( props ) => {
    const [ appContext ] = useContext( AppContext );
    const [ userContext ] = useContext( LoginContext );
    const [ toogle, setToogle ] = useState<boolean>( false );
    const [ shortName, setShortName ] = useState<boolean>( false );
    const [ menuCollapse, setMenuCollapse ] = useState<boolean>( false );
    const [ width ] = useWindowSize();
    const userMenuRef = useRef<HTMLDivElement>( null );
    const notificationRef = useRef<HTMLDivElement>( null );

    const handleClickOut: ( event: any ) => void = ( event ) => {
        if ( toogle && 
            ( ( userMenuRef != null && userMenuRef.current !== null && !userMenuRef.current.contains( event.target ) ) ||
              ( notificationRef != null && notificationRef.current !== null && notificationRef.current.contains( event.target ) ) ) ) {
            setToogle( false );
        }
    }

    useEffect( () => {
        // add when mounted
        document.addEventListener( "mousedown", handleClickOut );
        // return function to be called when unmounted
        return () => {
            document.removeEventListener( "mousedown", handleClickOut );
        };
        //eslint-disable-next-line
    }, [ toogle ] )

    useEffect( () => {
        if ( width <= mobileWidthLoginForm && width > mobileWidthMenu ) {
            setShortName( true );
            if ( menuCollapse ) {
                setMenuCollapse( false );
                setToogle( false );
            }
        }
        else if ( width <= mobileWidthMenu ) {
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
    }, [ width ] );

    const renderDropDown = () => {
        const menus: ISubMenuItem[] = [
            { Title: "#(User)", Link: KnownPages.UserSettings }
        ];

        if ( props.CustomMenus ) {
            props.CustomMenus.forEach( ( menu ) => {
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
                        props.CustomMenus && props.CustomMenus.map( ( menu, i ) =>
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
                { props.NotificationsEnabled && props.NotificationsRoute && 
                    <MenuNotification 
                        reference = {notificationRef} 
                        Route= { props.NotificationsRoute ? props.NotificationsRoute : "" }
                        RefreshTime = { props.NotificationRefreshTime }
                    />
                }
                <div className="menuLanguageCol pointer_cursor noselect" onClick={ () => setToogle( !toogle ) }>
                    <span tabIndex={ 0 } className={ ( toogle ? 'menuItemColSel' : '' ) }>
                        { userContext && ( `${ userContext.name } ${ shortName ? `${ userContext.surname.charAt( 0 ) }.` : userContext.surname }` ) }
                    </span>
                </div>
                { toogle && ( menuCollapse ? renderCollapsed() : renderDropDown() ) }
            </div>
    )
}

export default UserMenu;