import * as React from 'react';
import Row from '../../common/Row';
import Column, { ColumnNumber } from '../../common/Column';
import InputText from '../../common/InputText';
import Button, { ButtonTypes } from '../../common/Button';
import useWindowSize from '../../../common/functions/windowResize';
import { useState, useEffect } from 'react';
import { mobileWidthLoginForm, mobileWidthMenu } from '../../../common/config/configuration';
import useTranslation from '../../../common/context/pageText/getTranslation';
import PageSelector from '../../common/PageSelector';
import { KnownPages } from '../../../common/context/appContextEnums';

const LoginForm: React.FC = () => {
    const [ width ] = useWindowSize();
    const [ menuDropDown, setDropDown ] = useState<boolean>( false );
    const [ menuCollapse, setMenuCollapse ] = useState<boolean>( false );
    const [ menuToogle, setMenuToogle ] = useState<boolean>( false );
    const { getTranslation } = useTranslation();
    const loginMenuRef = React.useRef<HTMLDivElement>( null );

    const handleClickOut: ( event: any ) => void = ( event ) => {
        if ( menuToogle && loginMenuRef != null && loginMenuRef.current !== null && !loginMenuRef.current.contains( event.target ) ) {
            setMenuToogle( false );
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
    }, [ menuToogle ] )

    useEffect( () => {
        if ( width <= mobileWidthLoginForm )
            setDropDown( true );
        else
            setDropDown( false );
        if ( width <= mobileWidthMenu )
            setMenuCollapse( true );
        else
            setMenuCollapse( false );
    }, [ width ] );

    const renderInlineForm = () => {
        return (
            <Row className="menuLoginFormRow">
                <Column full={ ColumnNumber.C7 }><InputText name="login" placeHolder={ getTranslation( "_loginform", "#(Username)" ) } /></Column>
                <Column full={ ColumnNumber.C7 }><InputText name="password" placeHolder={ getTranslation( "_loginform", "#(Password)" ) } /></Column>
                <Column full={ ColumnNumber.C3 } className = "loginMenuLink">
                    <PageSelector page = { KnownPages.Home }>{ getTranslation( "_loginform", "#(LoginButton)" ) }</PageSelector>
                </Column>
                <Column full={ ColumnNumber.C3 } className = "loginMenuLink">
                    <PageSelector page = { KnownPages.Home }>Novo</PageSelector>
                </Column>
            </Row>
        );
    }

    const renderDropDownForm = () => {
        return (
            <div ref={ loginMenuRef }>
                <div className="menuLanguageCol pointer_cursor noselect" onClick={ () => setMenuToogle( !menuToogle ) }>
                    <span tabIndex={ 0 } className={ ( menuToogle ? 'menuItemColSel' : '' ) }>{ getTranslation( "_loginform", "#(LoginDrop)" ) }</span>
                </div>
                { menuToogle && <div className="loginMenuDrop">
                    <Row className="menuLoginFormRow">
                        <Column>
                        <Row>
                            <Column><InputText name="login" placeHolder={ getTranslation( "_loginform", "#(Username)" ) } /></Column>
                        </Row>
                        <Row>
                            <Column><InputText name="password" placeHolder={ getTranslation( "_loginform", "#(Password)" ) } /></Column>
                        </Row>
                        <Row>
                            <Column><Button buttonType={ ButtonTypes.Default } className="loginMenuButton">{ getTranslation( "_loginform", "#(LoginButton)" ) }</Button></Column>
                        </Row>
                        </Column>
                    </Row>
                </div> }
            </div>
        )
    }

    const renderCollapsedForm = () => {
        return (
            <>Collapsed</>
        )
    }

    return (
        ( !menuDropDown && !menuCollapse ) ? renderInlineForm() : ( ( !menuCollapse && renderDropDownForm() ) || renderCollapsedForm() )
    )
}

export default LoginForm;