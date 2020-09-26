import React, { useCallback, useMemo, useState } from 'react';
import { AppRegex } from '../../../logic/config/regexEnum';

interface IInputProps {
    name: string;
    className?: string;    
    regexValidation?: AppRegex;
    allowOnlyRegex?: boolean;
    onChange?:( output: { text: string, name: string, isValid: boolean } ) => void;
    onBlur?:( output:  { text: string, name: string, isValid: boolean } ) => void;
    externalIsValid?: boolean;
    externalValidated?: boolean;
    validText?: string;
    invalidText?: string;
    placeHolder?: string;
    isPassword?: boolean;
    notEmpty?: boolean;
    validateEmail?: boolean;
    lenght?: number;
    initialText?: string;
    balloonValidText?: boolean;
    disabled?: boolean;
}

const InputText: React.FC<IInputProps> = ( {
                                            name,
                                            allowOnlyRegex,
                                            balloonValidText,
                                            className,
                                            disabled,
                                            externalIsValid,
                                            externalValidated,
                                            initialText,
                                            invalidText,
                                            isPassword,
                                            lenght,
                                            notEmpty,
                                            onBlur,
                                            onChange,
                                            placeHolder,
                                            regexValidation,
                                            validText,
                                            validateEmail
                                        } ) => {    
    const [ value, setValue ] = useState<string>( initialText ? initialText : "" );
    const [ { valid, validated }, setValidation ] = useState< {valid: boolean, validated: boolean} >( { valid: false, validated: false } );

    const validate = useCallback(( eventText: string, prevValue: string ): [ string, boolean ] => {
        let textOut = eventText;
        if( notEmpty && textOut === "" )
        {
            return [ textOut, false ];
        }

        if( regexValidation !== undefined )
        {            
            let regex = new RegExp( regexValidation );
            let isValid = regex.test( textOut );

            if( allowOnlyRegex && !isValid )
            {
                if( !validateEmail )
                    textOut = prevValue;
                else
                {
                    let emailRegex = new RegExp( AppRegex.EmailChars );
                    if( !( emailRegex.test( textOut ) ) )
                        textOut = prevValue;
                }

                isValid = regex.test( textOut ) && ( !notEmpty || ( notEmpty && textOut !== "" ) );
            }

            return [ textOut, isValid ];
        }

        return [ textOut, true ];
    }, [regexValidation, allowOnlyRegex, validateEmail, notEmpty]);

    const changeHandler = useCallback(( event: React.FormEvent<HTMLInputElement>, prevValue: string ): void => {
        if(!disabled)
        {
            let [ text, isValid ] = validate( event.currentTarget.value, prevValue );

            setValue( text );
            setValidation( (prev) => { return { valid: isValid, validated: prev.validated } } );

            if( onChange !== undefined )
            {
                onChange( { text, name: name, isValid } );
            }
        }
    }, [validate, name, onChange, disabled])

    const blurHandler = useCallback(( event: React.FormEvent<HTMLInputElement>, prevValue: string ): void => {        
        if(!disabled)
        {
            let [ text, isValid ] = validate( event.currentTarget.value, prevValue );

            setValue( text );
            setValidation( {valid: isValid, validated: ( notEmpty || validateEmail || regexValidation !== undefined ) } );

            if( onBlur !== undefined )
            {
                onBlur( { text, name: name, isValid } );
            }
        }
    }, [validate, name, onBlur, notEmpty, validateEmail, regexValidation, disabled]);

    const inputValid = useMemo(() => ( valid && validated ) || ( externalIsValid && externalValidated ), [valid, validated, externalIsValid, externalValidated]);
    const inputInvalid = useMemo(() => ( !valid && validated ) || ( !externalIsValid && externalValidated ), [valid, validated, externalIsValid, externalValidated]);
    const inputCss = useMemo(() => {
        return `inputText
            ${!( inputValid || inputInvalid ) ? " inputText_Color" : ""}
            ${inputValid ?  " inputTextValid" : ""}
            ${inputInvalid ?  " inputTextInvalid" : ""}
            ${disabled ? " disabled" : ""}`;
    
    }, [inputValid, inputInvalid, disabled]);

    return(
        <div className = "inputTextDiv">
            <input 
                type = { isPassword ? "password" : "text" }
                name = { name }
                className = { inputCss + ( className ? ( " " + className ) : "" ) }
                onChange = { ( event ) => { changeHandler( event, value ) } }
                onBlur = { ( event ) => { blurHandler( event, value ) } }                
                value = { value }
                maxLength = { lenght }
                placeholder = { placeHolder }
                disabled = { disabled }
            />
            { validText && inputValid && 
                <div className = { balloonValidText ? 
                            ( "inputTextValidationBalloon inputTextValidBalloon" ) 
                            : ( "inputTextValidation inputTextValidationValid" )
                }>
                    { validText }
                </div> }
            { invalidText && inputInvalid && 
                <div className = { balloonValidText ? 
                            ( "inputTextValidationBalloon inputTextInvalidBalloon" ) 
                            : ("inputTextValidation inputTextValidationInvalid")
                }>
                    { invalidText }
                </div> }
        </div>
    )
}

export default InputText;