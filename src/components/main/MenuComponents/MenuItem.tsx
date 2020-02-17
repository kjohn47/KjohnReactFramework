import React, { useState, useRef, useEffect } from 'react';
import { KnownPages } from '../../../common/context/appContextEnums';
import PageSelector from '../../common/PageSelector';
import Column from '../../common/Column';
import SubMenu, { ISubMenuItem } from './SubMenu';

export interface IMenuItem {
    Title: string;
    Link?: KnownPages;
    Action?: () => void;
    SubMenus?: ISubMenuItem[];
}

const MenuItem: React.FC<{ Menu: IMenuItem }> = ( props ) => {
    const [ toogle, setToogle ] = useState<boolean>( false );
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
        if ( menu.Link ) {
            return <PageSelector page={ menu.Link } className='menuSpan pointer_cursor'>{ menu.Title }</PageSelector>
        }
        if ( menu.SubMenus ) {
            return <>
                <span className='menuSpan pointer_cursor' onClick={ () => setToogle( !toogle ) }>{ menu.Title }</span>
                { toogle && <SubMenu subMenu={ menu.SubMenus } unToogle={ () => setToogle( false ) } /> }
            </>
        }
        return <span className='menuSpan pointer_cursor'>{ menu.Title }</span>
    }

    return <Column className={ 'menuItemCol' + ( toogle ? ' menuItemColSel' : '' ) } reference={ subMenuRef } tabIndex={ 0 }>
        { makeMenu( props.Menu ) }
    </Column>
}

export default MenuItem;