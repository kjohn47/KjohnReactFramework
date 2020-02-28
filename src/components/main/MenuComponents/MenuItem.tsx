import React, { useState, useRef, useEffect } from 'react';
import { KnownPages } from '../../../common/context/appContextEnums';
import PageSelector from '../../common/PageSelector';
import Column from '../../common/Column';
import SubMenu, { ISubMenuItem } from './SubMenu';
import useTranslation from '../../../common/context/pageText/getTranslation';

export interface IMenuItem {
    Title: string;
    Link?: KnownPages;
    Action?: () => void;
    SubMenus?: ISubMenuItem[];
    Reloadable?: boolean;
}

const MenuItem: React.FC<{ Menu: IMenuItem }> = ( props ) => {
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

    return <Column className={ 'menuItemCol' + ( toogle ? ' menuItemColSel' : '' ) } reference={ subMenuRef } tabIndex={ 0 }>
        { makeMenu( props.Menu ) }
    </Column>
}

export default MenuItem;