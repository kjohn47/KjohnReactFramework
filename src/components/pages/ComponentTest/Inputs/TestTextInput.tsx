import React, { useState, useEffect, useCallback } from 'react';
import Row from '../../../common/structure/Row';
import Column, { ColumnNumber } from '../../../common/structure/Column';
import WithLabel from '../../../common/presentation/wrapper/WithLabel';
import InputTextHoc from '../../../common/inputs/InputTextHoc';
import { AppRegex } from '../../../../logic/config/regexEnum';
import FieldSet from '../../../common/presentation/wrapper/FieldSet';
import useInputText from '../../../../logic/functions/UseInputText';
import InputText from '../../../common/inputs/InputText';

const TestInputWithHook: React.FC = () =>
{
    const [text6, setText6] = useState<string>("I have some initial text");

    useEffect(() => {
        console.log("Text 6 changed to: ",text6)
    },[text6])


    return  <InputTextHoc
                name="TestInput6"
                validText="Valid :)"
                invalidText="Invalid :("
                onChange={ ( Output ) => { setText6(Output.text) } }
                onBlur={ ( Output ) => { setText6(Output.text) } }
                initialText = {text6}
            />
}

const TestTextInput: React.FC = () => {
    const hookInput = useInputText({
        name: "hookInput",
        validText: "valid :p",
        invalidText: "invalid :(",
        initialText: "some initial text",
        regexValidation: AppRegex.NumberOnly,
        notEmpty: true
    });

    const logOutput = useCallback( (textOutput) => {
        console.log( textOutput );
    }, [])

    useEffect(() => {
        console.log(hookInput);
        // eslint-disable-next-line 
    }, [hookInput.value, hookInput.valid, hookInput.validated])

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
                    <InputTextHoc
                        name="TestInput1"
                        validText="Valid :)"
                        invalidText="Invalid :("
                        notEmpty={ true }
                        onChange={ logOutput }
                        onBlur={ logOutput }
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
                    <InputTextHoc
                        name="TestInput2"
                        validText="Valid :)"
                        invalidText="Invalid :("
                        notEmpty={ true }
                        onChange={ logOutput }
                        onBlur={ logOutput }
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
                    <InputTextHoc
                        name="TestInput3"
                        validText="Valid :)"
                        invalidText="Invalid :("
                        notEmpty={ true }
                        onChange={ logOutput }
                        onBlur={ logOutput }
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
                    <InputTextHoc
                        name="TestInput4"
                        validText="Valid :)"
                        invalidText="Invalid :("
                        notEmpty={ true }
                        onChange={ logOutput }
                        onBlur={ logOutput }
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
                    <InputTextHoc
                        name="TestInput5"
                        validText="Valid :)"
                        invalidText="Invalid :("
                        onChange={ logOutput }
                        onBlur={ logOutput }
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
                    <TestInputWithHook />
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
                <WithLabel htmlFor="TestInput7" text="Test Input invalid chars with balloon">
                    <InputTextHoc
                        name="TestInput7"
                        validText="Valid :)"
                        invalidText="Invalid :("
                        onChange={ logOutput }
                        onBlur={ logOutput }
                        regexValidation={ AppRegex.NoSpecialChar }
                        placeHolder="Test input box for text without symbol"
                        balloonValidText
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
                <WithLabel htmlFor="TestInput8" text="Disabled Text Input">
                    <InputTextHoc
                        name="TestInput8"
                        initialText="Cannot change text on input"
                        disabled
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
                    <InputText {...hookInput.inputProps}/>
                </WithLabel>
            </Column>
        </Row>
    </FieldSet>
)}

export default TestTextInput;