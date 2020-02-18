import * as React from 'react';
import Row from '../../common/Row';
import Column, { ColumnNumber } from '../../common/Column';
import InputText from '../../common/InputText';
import Button, { ButtonTypes } from '../../common/Button';
import useWindowSize from '../../../common/functions/windowResize';
import { useState } from 'react';
import { mobileWidthLoginForm, mobileWidthMenu } from '../../../common/config/configuration';

const LoginForm: React.FC = () => {
    const [ width ] = useWindowSize();
    const [ menuDropDown, setDropDown ] = useState<boolean>( false );
    const [ menuCollapse, setMenuCollapse ] = useState<boolean>( false );

    React.useEffect( () => {
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
                <Column full={ ColumnNumber.C8 }><InputText name="login" placeHolder="login" /></Column>
                <Column full={ ColumnNumber.C8 }><InputText name="password" placeHolder="password" /></Column>
                <Column full={ ColumnNumber.C4 }><Button buttonType={ ButtonTypes.Default } className="loginMenuButton">Login</Button></Column>
            </Row>
        );
    }

    const renderDropDownForm = () => {
        return (
            <>DropDown</>
        )
    }

    const renderCollapsedForm = () => {
        return (
            <>Collapsed</>
        )
    }

    return (
        ( !menuDropDown && !menuCollapse && renderInlineForm() ) || ( ( !menuCollapse && renderDropDownForm() ) || renderCollapsedForm() )
    )
}

export default LoginForm;