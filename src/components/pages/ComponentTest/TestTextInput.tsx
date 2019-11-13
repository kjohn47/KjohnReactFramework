import React from 'react';
import Row from '../../common/Row';
import Column, { ColumnNumber } from '../../common/Column';
import WithLabel from '../../common/WithLabel';
import InputText from '../../common/InputText';
import { AppRegex } from '../../../common/config/regexEnum';

const TestTextInput: React.FC = () => 
    <Row>
        <Column
        full = { ColumnNumber.C10 } 
        large = { ColumnNumber.C14 }
        medium = { ColumnNumber.C17 }
        mobile = { ColumnNumber.C20 }
        >
            <WithLabel htmlFor = "TestInput" text = "Test Input Box" inline>
                <InputText
                name = "TestInput"
                validText = "Valid :)"
                invalidText = "Invalid :("
                notEmpty = { true }
                onChange = { ( Output ) => { console.log( Output ) } }
                onBlur = { ( Output ) => { console.log( Output ) } }
                regexValidation = { AppRegex.NumberOnly }
                allowOnlyRegex
                placeHolder = "Test input box"
                />
            </WithLabel>
        </Column>
    </Row>

export default TestTextInput;