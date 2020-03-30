import React, { useState, useRef, useEffect, useContext } from 'react';
import { KnownPages } from '../../../common/context/routeContextEnums';
import PageSelector from '../../common/PageSelector';
import Column from '../../common/Column';
import SubMenu, { ISubMenuItem } from './SubMenu';
import useTranslation from '../../../common/context/pageText/getTranslation';
import { LoginContext, AppContext } from '../../../common/config/appConfig';

export interface IMenuItem {
    Title: string;
    Link?: KnownPages;
    Action?: () => void;
    SubMenus?: ISubMenuItem[];
    Reloadable?: boolean;
    AuthOnly?: boolean;
    AdminOnly?: boolean;
}

const MenuItem: React.FC<{ Menu: IMenuItem }> = ( props ) => {
    const [ appContext ] = React.useContext( AppContext );
    const [ userContext ] = useContext(LoginContext);
    const [ toogle, setToogle ] = useState<boolean>( false );
    const { getTranslation } = useTranslation();
    const subMenuRef = useRef<HTMLDivElement>( null );

    const handleClickOut: ( event: any ) => void = ( event ) => {
        if ( toogle && subMenuRef != null && subMenuRef.current !== null && !subMenuRef.current.contains( event.target ) ) {
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

    const makeMenu = ( menu: IMenuItem ) => {
        let translatedTitle = menu.Title.startsWith( "#(" ) ? getTranslation( "_menu", menu.Title ) : menu.Title;
        if ( menu.Link ) {
            return <PageSelector forceReload={ menu.Reloadable } page={ menu.Link } className='menuSpan pointer_cursor'>{ translatedTitle }</PageSelector>
        }
        if ( menu.SubMenus ) {
            return <>
                <span className='menuSpan pointer_cursor' onClick={ () => setToogle( !toogle ) }>{ translatedTitle }</span>
                { toogle && <SubMenu subMenu={ menu.SubMenus } unToogle={ () => setToogle( false ) } /> }
            </>
        }
        return <span onClick={ menu.Action } className='menuSpan pointer_cursor'>{ translatedTitle }</span>
    }

    return ( (!props.Menu.AdminOnly && !props.Menu.AuthOnly) || 
             (!props.Menu.AdminOnly && userContext) ||
             appContext.adminOptions ) ? 
                <Column className={ 'menuItemCol' + ( toogle ? ' menuItemColSel' : '' ) } reference={ subMenuRef } tabIndex={ 0 }>
                    { makeMenu( props.Menu ) }
                </Column> 
                : null
}

export default MenuItem;