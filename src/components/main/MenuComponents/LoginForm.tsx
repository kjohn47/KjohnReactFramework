import * as React from 'react';
import Row from '../../common/structure/Row';
import Column, { ColumnNumber } from '../../common/structure/Column';
import InputText from '../../common/inputs/InputText';
import Button, { ButtonTypes } from '../../common/inputs/Button';
import {useWindowWidth} from '../../../logic/functions/windowResize';
import { useState, useEffect } from 'react';
import { mobileWidthLoginForm, mobileWidthMenu } from '../../../logic/config/configuration';
import useTranslation from '../../../logic/functions/getTranslation';
import PageSelector from '../../common/inputs/PageSelector';
import { KnownPages } from '../../../logic/context/Routes/routeContextEnums';
import WithLabel from '../../common/presentation/wrapper/WithLabel';

const LoginForm: React.FC = () => {
    const width = useWindowWidth();
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
        if ( width <= mobileWidthLoginForm && width > mobileWidthMenu ) {
            setDropDown( true );
            if ( menuCollapse ) {
                setMenuToogle( false );
                setMenuCollapse( false );
            }
        }
        else if ( width <= mobileWidthMenu ) {
            if ( menuDropDown ) {
                setMenuToogle( false );
                setDropDown( false );
            }
            setMenuCollapse( true );
        }
        else {
            setDropDown( false );
            setMenuCollapse( false );
            setMenuToogle( false );
        }
        //eslint-disable-next-line
    }, [ width ] );

    const renderInlineForm = () => {
        return (
            <Row className="menuLoginFormRow">
                <Column full={ ColumnNumber.C7 }><InputText name="login" placeHolder={ getTranslation( "_loginform", "#(Username)" ) } /></Column>
                <Column full={ ColumnNumber.C7 }><InputText name="password" placeHolder={ getTranslation( "_loginform", "#(Password)" ) } /></Column>
                <Column full={ ColumnNumber.C3 } className="loginMenuLink">
                    <span onClick={ () => { } } className="pointer_cursor">{ getTranslation( "_loginform", "#(LoginButton)" ) }</span>
                </Column>
                <Column full={ ColumnNumber.C3 } className="loginMenuLink">
                    <PageSelector page={ KnownPages.Home }>{ getTranslation( "_loginform", "#(NewLogin)" ) }</PageSelector>
                </Column>
            </Row>
        );
    }

    const LoginFormWrapper: React.FC = ( props ) => {
        return (
            <div ref={ loginMenuRef }>
                <div className="menuLanguageCol pointer_cursor noselect" onClick={ () => setMenuToogle( !menuToogle ) }>
                    <span tabIndex={ 0 } className={ ( menuToogle ? 'menuItemColSel' : '' ) }>{ getTranslation( "_loginform", "#(LoginDrop)" ) }</span>
                </div>
                { props.children }
            </div>
        )
    }

    const renderDropDownForm = () => {
        return (
            <LoginFormWrapper>
                { menuToogle && <div className="loginMenuDrop">
                    <Row>
                        <Column>
                            <Row>
                                <Column>
                                    <WithLabel inline text={ getTranslation( "_loginform", "#(Username)" ) }>
                                        <InputText name="login" />
                                    </WithLabel>
                                </Column>
                            </Row>
                            <Row>
                                <Column>
                                    <WithLabel inline text={ getTranslation( "_loginform", "#(Password)" ) }>
                                        <InputText name="password" />
                                    </WithLabel>
                                </Column>
                            </Row>
                            <Row>
                                <Column></Column>
                                <Column>
                                    <Button buttonType={ ButtonTypes.Information }>{ getTranslation( "_loginform", "#(NewLogin)" ) }</Button>
                                </Column>
                                <Column></Column>
                                <Column>
                                    <Button buttonType={ ButtonTypes.Confirmation }>{ getTranslation( "_loginform", "#(LoginButton)" ) }</Button>
                                </Column>
                                <Column></Column>
                            </Row>
                        </Column>
                    </Row>
                </div> }
            </LoginFormWrapper>
        )
    }

    const renderCollapsedForm = () => {
        return (
            <LoginFormWrapper>
                { menuToogle &&
                    <Row className="loginMenuCollapsed">
                        <Column>
                            <Row>
                                <Column>
                                    <WithLabel text={ getTranslation( "_loginform", "#(Username)" ) }>
                                        <InputText name="login" />
                                    </WithLabel>
                                </Column>
                            </Row>
                            <Row>
                                <Column>
                                    <WithLabel text={ getTranslation( "_loginform", "#(Password)" ) }>
                                        <InputText name="password" />
                                    </WithLabel>
                                </Column>
                            </Row>
                            <Row className="loginMenuBtnRow">
                                <Column className="loginMenuButtonCol">
                                    <Button buttonType={ ButtonTypes.Information }>{ getTranslation( "_loginform", "#(NewLogin)" ) }</Button>
                                </Column>
                                <Column className="loginMenuButtonCol">
                                    <Button buttonType={ ButtonTypes.Confirmation }>{ getTranslation( "_loginform", "#(LoginButton)" ) }</Button>
                                </Column>
                            </Row>
                        </Column>
                    </Row>
                }
            </LoginFormWrapper>
        )
    }

    return (
        ( !menuDropDown && !menuCollapse ) ? renderInlineForm() : ( ( !menuCollapse && renderDropDownForm() ) || renderCollapsedForm() )
    )
}

export default LoginForm;