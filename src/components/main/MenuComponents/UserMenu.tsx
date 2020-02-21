import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext, LoginContext } from '../../../common/config/appConfig';
import useTranslation from '../../../common/context/pageText/getTranslation';
import useWindowSize from '../../../common/functions/windowResize';
import { mobileWidthMenu, mobileWidthLoginForm } from '../../../common/config/configuration';

const UserMenu: React.FC = () => {
    const [ appContext ] = useContext( AppContext );
    const [ userContext ] = useContext( LoginContext );
    const [ toogle, setToogle ] = useState<boolean>( false );
    const [ shortName, setShortName ] = useState<boolean>( false );
    const [ menuCollapse, setMenuCollapse ] = useState<boolean>( false );
    const [ width ] = useWindowSize();
    const { getTranslation } = useTranslation();
    const userMenuRef = useRef<HTMLDivElement>( null );

    const handleClickOut: ( event: any ) => void = ( event ) => {
        if ( toogle && userMenuRef != null && userMenuRef.current !== null && !userMenuRef.current.contains( event.target ) ) {
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
        return (
            <>
                NORMAL MENU
            </>
        )
    }

    const renderCollapsed = () => {
        return (
            <>
                COLLAPSED MENU
            </>
        )
    }


    return (
        <div ref={ userMenuRef }>
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