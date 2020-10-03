import React, { useState, useEffect, useCallback } from 'react';
import Row from '../../common/structure/Row';
import Column, { ColumnNumber } from '../../common/structure/Column';
import Button, { ButtonTypes } from '../../common/inputs/Button';
import {useMobileWidth} from '../../../logic/functions/windowResize';
import useTranslation from '../../../logic/functions/getTranslation';
import PageSelector from '../../common/inputs/PageSelector';
import { KnownPages } from '../../../logic/context/Routes/routeContextEnums';
import WithLabel from '../../common/presentation/wrapper/WithLabel';
import useInputText from '../../../logic/inputHooks/UseInputText';
import InputText from '../../common/inputs/InputText';
import { executeAfterLostFocusChild, executeClickEnterSpace, handleClickOutDiv } from '../../../logic/functions/misc';

const LoginFormWrapper: React.FC<{reference: React.RefObject<HTMLDivElement>, toogle: boolean, changeToogle: (override?: boolean) => void}> = ( {reference, toogle, changeToogle, children} ) => {
    const { getTranslation } = useTranslation();
    const handleLoginTabOut = useCallback((event: KeyboardEvent) => {
        if(toogle && reference.current)
        {
            executeAfterLostFocusChild(event, reference.current, () => changeToogle(false))
        }
    }, [reference, toogle, changeToogle]);

    useEffect(() => {
        // add when mounted
        document.addEventListener( "keyup", handleLoginTabOut );
        // return function to be called when unmounted
        return () => {
            document.removeEventListener( "keyup", handleLoginTabOut );
        };
    }, [handleLoginTabOut])

    return (
        <div ref={ reference }>
            <div 
                tabIndex={ 0 } 
                className="menuLanguageCol pointer_cursor noselect" 
                onClick={(e) => { toogle && e.currentTarget.blur(); changeToogle();}} 
                onKeyDown={(e)=>executeClickEnterSpace(e, () => changeToogle())}
            >
                <span className={ ( toogle ? 'menuItemColSel' : '' ) }>{ getTranslation( "_loginform", "#(LoginDrop)" ) }</span>
            </div>
            { children }
        </div>
    )
}

const LoginForm: React.FC = () => {
    const mobileWidth = useMobileWidth();
    const [ menuDropDown, setDropDown ] = useState<boolean>( false );
    const [ menuCollapse, setMenuCollapse ] = useState<boolean>( false );
    const [ menuToogle, setMenuToogle ] = useState<boolean>( false );
    const { getTranslation } = useTranslation();
    const usernameRef = React.useRef<HTMLInputElement>( null );
    const passwordRef = React.useRef<HTMLInputElement>( null );

    const usernameInput = useInputText({
        name: "login",
        placeHolder: getTranslation( "_loginform", "#(Username)" ),
        balloonValidText: true,
        invalidText: "Invalid :(",
        validText: "Valid :)",
        reference: usernameRef
    });
    const passwordInput = useInputText({
        name: "password",
        placeHolder: getTranslation( "_loginform", "#(Password)" ),
        isPassword: true,
        reference: passwordRef
    });

    const loginMenuRef = React.useRef<HTMLDivElement>( null );

    const handleClickOutLoginFrm = React.useCallback( (event: any) => handleClickOutDiv(event, loginMenuRef, menuToogle, () => setMenuToogle( false ) ), [menuToogle]);

    useEffect( () => {
        // add when mounted
        document.addEventListener( "mousedown", handleClickOutLoginFrm );
        // return function to be called when unmounted
        return () => {
            document.removeEventListener( "mousedown", handleClickOutLoginFrm );
        };
    }, [ handleClickOutLoginFrm ] )

    useEffect( () => {
        if ( mobileWidth.isMobileWidthLoginForm && !mobileWidth.isMobileWidthMenu ) {
            setDropDown( true );
            if ( menuCollapse ) {
                setMenuToogle( false );
                setMenuCollapse( false );
            }
        }
        else if ( mobileWidth.isMobileWidthMenu ) {
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
    }, [ mobileWidth.isMobileWidthLoginForm, mobileWidth.isMobileWidthMenu ] );

    const handleLogin = () => {
        usernameInput.changeValidation(false);
        //usernameInput.clearText();
        passwordInput.clearText();

        usernameRef.current && usernameRef.current.focus();
    }

    const renderInlineForm = () => {
        return (
            <Row className="menuLoginFormRow">
                <Column full={ ColumnNumber.C7 }><InputText {...usernameInput.inputProps} /></Column>
                <Column full={ ColumnNumber.C7 }><InputText {...passwordInput.inputProps} /></Column>
                <Column full={ ColumnNumber.C3 } className="loginMenuLink">
                    <span onClick={ () => handleLogin() } className="pointer_cursor">{ getTranslation( "_loginform", "#(LoginButton)" ) }</span>
                </Column>
                <Column full={ ColumnNumber.C3 } className="loginMenuLink">
                    <PageSelector page={ KnownPages.Home } focusable>{ getTranslation( "_loginform", "#(NewLogin)" ) }</PageSelector>
                </Column>
            </Row>
        );
    }

    const renderDropDownForm = () => {
        return (
            <LoginFormWrapper reference={loginMenuRef} toogle={menuToogle} changeToogle={(override) => setMenuToogle(prev => override !== undefined ? override : !prev)}>
                { menuToogle && <div className="loginMenuDrop">
                    <Row>
                        <Column>
                            <Row>
                                <Column>
                                    <WithLabel inline text={ getTranslation( "_loginform", "#(Username)" ) }>
                                        <InputText {...usernameInput.inputProps} placeHolder = {undefined} />
                                    </WithLabel>
                                </Column>
                            </Row>
                            <Row>
                                <Column>
                                    <WithLabel inline text={ getTranslation( "_loginform", "#(Password)" ) }>
                                        <InputText {...passwordInput.inputProps} placeHolder = {undefined} />
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
                                    <Button buttonType={ ButtonTypes.Confirmation } onClick={() => handleLogin()}>{ getTranslation( "_loginform", "#(LoginButton)" ) }</Button>
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
            <LoginFormWrapper reference={loginMenuRef} toogle={menuToogle} changeToogle={(override) => setMenuToogle(prev => override !== undefined ? override : !prev)}>
                { menuToogle &&
                    <Row className="loginMenuCollapsed">
                        <Column>
                            <Row>
                                <Column>
                                    <WithLabel text={ getTranslation( "_loginform", "#(Username)" ) }>
                                        <InputText {...usernameInput.inputProps} placeHolder = {undefined} />
                                    </WithLabel>
                                </Column>
                            </Row>
                            <Row>
                                <Column>
                                    <WithLabel text={ getTranslation( "_loginform", "#(Password)" ) }>
                                        <InputText {...passwordInput.inputProps} placeHolder = {undefined}/>
                                    </WithLabel>
                                </Column>
                            </Row>
                            <Row className="loginMenuBtnRow">
                                <Column className="loginMenuButtonCol">
                                    <Button buttonType={ ButtonTypes.Information }>{ getTranslation( "_loginform", "#(NewLogin)" ) }</Button>
                                </Column>
                                <Column className="loginMenuButtonCol">
                                    <Button buttonType={ ButtonTypes.Confirmation }onClick={() => handleLogin()}>{ getTranslation( "_loginform", "#(LoginButton)" ) }</Button>
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