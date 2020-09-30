import React, { useCallback, useMemo, useState } from 'react';
import { AppRegex } from '../../../logic/config/regexEnum';
import InputText from './InputText';

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

const InputTextHoc: React.FC<IInputProps> = ( {
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

    return(
        <InputText 
            name = {name}
            value = {value}
            lenght = {lenght}
            className = {className}
            placeHolder = {placeHolder}
            isPassword = {isPassword}
            disabled = {disabled}
            inputValid = {inputValid}
            inputInvalid = {inputInvalid}
            validText = {validText}
            invalidText = {invalidText}
            balloonValidText = {balloonValidText}
            blurHandler = {blurHandler}
            changeHandler = {changeHandler}
        />
    )
}

export default InputTextHoc;