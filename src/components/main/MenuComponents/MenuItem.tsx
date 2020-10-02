import React, { useState, useRef, useEffect, useCallback } from 'react';
import PageSelector from '../../common/inputs/PageSelector';
import Column from '../../common/structure/Column';
import SubMenu, { ISubMenuItem } from './SubMenu';
import useTranslation from '../../../logic/functions/getTranslation';
import { PageType, handleClickOutDiv, executeClickEnterSpace, executeAfterLostFocusChild } from '../../../logic/functions/misc';
import useAppHandler from '../../../logic/context/App/AppContextHandler';
import useLoginHandler from '../../../logic/context/Login/LoginContextHandler';

export interface IMenuItem {
    Title: string;
    Link?: PageType;
    Action?: () => void;
    SubMenus?: ISubMenuItem[];
    Reloadable?: boolean;
    AuthOnly?: boolean;
    AdminOnly?: boolean;
}

const MenuItem: React.FC<{ Menu: IMenuItem }> = ( props ) => {
    const appContext = useAppHandler().App;
    const userContext = useLoginHandler().Login;
    const [ toogle, setToogle ] = useState<boolean>( false );
    const { getTranslation } = useTranslation();
    const subMenuRef = useRef<HTMLDivElement>( null );
    const handleClickOutMenuItem = useCallback( (event: any) => handleClickOutDiv(event, subMenuRef, toogle, () => setToogle( false ) ), [toogle]);

    const handleTab = useCallback((e: KeyboardEvent) => {
        if(toogle && subMenuRef.current)
        {
            executeAfterLostFocusChild(e, subMenuRef.current, () => setToogle(false));
        }
    }, [subMenuRef, toogle])

    useEffect( () => {
        // add when mounted
        document.addEventListener( "mousedown", handleClickOutMenuItem );
        // return function to be called when unmounted
        return () => {
            document.removeEventListener( "mousedown", handleClickOutMenuItem );
        };
    }, [ handleClickOutMenuItem ] )

    useEffect(() => {
        // add when mounted
        document.addEventListener( "keyup", handleTab );
        // return function to be called when unmounted
        return () => {
            document.removeEventListener( "keyup", handleTab );
        };
    }, [handleTab])

    const makeMenu = ( menu: IMenuItem ) => {
        let translatedTitle = getTranslation( "_menu", menu.Title );
        if ( menu.Link ) {
            return <PageSelector focusable forceReload={ menu.Reloadable } page={ menu.Link } className='menuSpan pointer_cursor'>{ translatedTitle }</PageSelector>
        }
        if ( menu.SubMenus ) {
            return <>
                <span 
                    className='menuSpan pointer_cursor'
                    tabIndex={0} 
                    onClick={ (e) => {setToogle( p => !p ); e.currentTarget.blur();} } 
                    onKeyDown={(e) => executeClickEnterSpace(e, () => setToogle(p => !p))}
                >{ translatedTitle }</span>
                { toogle && <SubMenu subMenu={ menu.SubMenus } unToogle={ () => setToogle( false ) } /> }
            </>
        }
        return <span onClick={ e => {menu.Action && menu.Action(); e.currentTarget.blur();} } tabIndex={0} className='menuSpan pointer_cursor'>{ translatedTitle }</span>
    }

    return ( (!props.Menu.AdminOnly && !props.Menu.AuthOnly) || 
             (!props.Menu.AdminOnly && userContext) ||
             appContext.adminOptions ) ? 
                <Column className={ 'menuItemCol' + ( toogle ? ' menuItemColSel' : '' ) } reference={ subMenuRef }>
                    { makeMenu( props.Menu ) }
                </Column> 
                : null
}

export default MenuItem;