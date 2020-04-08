import React, { useState, useEffect } from 'react';
import Row from '../../../common/Row';
import Column, { ColumnNumber } from '../../../common/Column';
import WithLabel from '../../../common/WithLabel';
import InputText from '../../../common/InputText';
import { AppRegex } from '../../../../common/config/regexEnum';
import FieldSet from '../../../common/FieldSet';

const TestTextInput: React.FC = () => {
    const [text6, setText6] = useState<string>("I have some initial text");

    useEffect(() => {
        console.log("Text 6 changed to: ",text6)
    },[text6])

    return (
    <FieldSet Title="Text Inputs">
        <Row>
            <Column
                full={ ColumnNumber.C10 }
                large={ ColumnNumber.C14 }
                medium={ ColumnNumber.C17 }
                mobile={ ColumnNumber.C20 }
            >
                <WithLabel htmlFor="TestInput1" text="Test numbers" inline>
                    <InputText
                        name="TestInput1"
                        validText="Valid :)"
                        invalidText="Invalid :("
                        notEmpty={ true }
                        onChange={ ( Output ) => { console.log( Output ) } }
                        onBlur={ ( Output ) => { console.log( Output ) } }
                        regexValidation={ AppRegex.NumberOnly }
                        allowOnlyRegex
                        placeHolder="Test input box for numbers"
                    />
                </WithLabel>
            </Column>
        </Row>
        <Row>
            <Column
                full={ ColumnNumber.C10 }
                large={ ColumnNumber.C14 }
                medium={ ColumnNumber.C17 }
                mobile={ ColumnNumber.C20 }
            >
                <WithLabel htmlFor="TestInput2" text="Test Input text" inline>
                    <InputText
                        name="TestInput2"
                        validText="Valid :)"
                        invalidText="Invalid :("
                        notEmpty={ true }
                        onChange={ ( Output ) => { console.log( Output ) } }
                        onBlur={ ( Output ) => { console.log( Output ) } }
                        regexValidation={ AppRegex.TextOnly }
                        allowOnlyRegex
                        placeHolder="Test input box for text"
                    />
                </WithLabel>
            </Column>
        </Row>
        <Row>
            <Column
                full={ ColumnNumber.C10 }
                large={ ColumnNumber.C14 }
                medium={ ColumnNumber.C17 }
                mobile={ ColumnNumber.C20 }
            >
                <WithLabel htmlFor="TestInput3" text="Test Input email" inline>
                    <InputText
                        name="TestInput3"
                        validText="Valid :)"
                        invalidText="Invalid :("
                        notEmpty={ true }
                        onChange={ ( Output ) => { console.log( Output ) } }
                        onBlur={ ( Output ) => { console.log( Output ) } }
                        regexValidation={ AppRegex.Email }
                        validateEmail
                        allowOnlyRegex
                        placeHolder="Test input box for email"
                    />
                </WithLabel>
            </Column>
        </Row>
        <Row>
            <Column
                full={ ColumnNumber.C10 }
                large={ ColumnNumber.C14 }
                medium={ ColumnNumber.C17 }
                mobile={ ColumnNumber.C20 }
            >
                <WithLabel htmlFor="TestInput4" text="Password">
                    <InputText
                        name="TestInput4"
                        validText="Valid :)"
                        invalidText="Invalid :("
                        notEmpty={ true }
                        onChange={ ( Output ) => { console.log( Output ) } }
                        onBlur={ ( Output ) => { console.log( Output ) } }
                        isPassword
                        placeHolder="Test input box for password"
                    />
                </WithLabel>
            </Column>
        </Row>
        <Row>
            <Column
                full={ ColumnNumber.C10 }
                large={ ColumnNumber.C14 }
                medium={ ColumnNumber.C17 }
                mobile={ ColumnNumber.C20 }
            >
                <WithLabel htmlFor="TestInput5" text="Test Input not forced valid chars">
                    <InputText
                        name="TestInput5"
                        validText="Valid :)"
                        invalidText="Invalid :("
                        onChange={ ( Output ) => { console.log( Output ) } }
                        onBlur={ ( Output ) => { console.log( Output ) } }
                        regexValidation={ AppRegex.NoSpecialChar }
                        placeHolder="Test input box for text without symbol"
                    />
                </WithLabel>
            </Column>
        </Row>
        <Row>
            <Column
                full={ ColumnNumber.C10 }
                large={ ColumnNumber.C14 }
                medium={ ColumnNumber.C17 }
                mobile={ ColumnNumber.C20 }
            >
                <WithLabel htmlFor="TestInput6" text="Test Input with with defaut text">
                    <InputText
                        name="TestInput6"
                        validText="Valid :)"
                        invalidText="Invalid :("
                        onChange={ ( Output ) => { console.log( Output ); setText6(Output.text) } }
                        onBlur={ ( Output ) => { console.log( Output );  setText6(Output.text) } }
                        initialText = {text6}
                    />
                </WithLabel>
            </Column>
        </Row>
    </FieldSet>
)}

export default TestTextInput;