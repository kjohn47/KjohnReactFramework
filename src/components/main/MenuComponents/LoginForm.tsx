import * as React from 'react';
import Row from '../../common/Row';
import Column, { ColumnNumber } from '../../common/Column';
import InputText from '../../common/InputText';
import Button, { ButtonTypes } from '../../common/Button';

const LoginForm: React.FC = () => {
    const renderInlineForm = () => {
        return (
            <Row className = "menuLoginFormRow">
                <Column full = { ColumnNumber.C8}><InputText name = "login" /></Column>
                <Column full = { ColumnNumber.C8}><InputText name = "password" /></Column>
                <Column full = { ColumnNumber.C4}><Button buttonType = { ButtonTypes.Default } className = "loginMenuButton">Login</Button></Column>
            </Row>
        );
    }
    return (
        renderInlineForm()
    )
}

export default LoginForm;