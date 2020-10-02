import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { AppRegex } from '../../../logic/config/regexEnum';
import InputText from './InputText';

interface IInputProps {
    name: string;
    className?: string;    
    regexValidation?: AppRegex;
    allowOnlyRegex?: boolean;
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
    getText?:( output: { text: string, name: string, isValid?: boolean } ) => void;
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
                                            placeHolder,
                                            regexValidation,
                                            validText,
                                            validateEmail,
                                            getText
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
            setValidation( (prev) => { return { valid: isValid, validated: ( notEmpty || validateEmail || regexValidation !== undefined ) && prev.validated } } );
        }
    }, [validate, notEmpty, validateEmail, regexValidation, disabled])

    const blurHandler = useCallback(( event: React.FormEvent<HTMLInputElement>, prevValue: string ): void => {        
        if(!disabled)
        {
            let [ text, isValid ] = validate( event.currentTarget.value, prevValue );

            setValue( text );
            setValidation( {valid: isValid, validated: ( notEmpty || validateEmail || regexValidation !== undefined ) } );
        }
    }, [validate, notEmpty, validateEmail, regexValidation, disabled]);

    const inputValid = useMemo(() => ( valid && validated ) || ( externalIsValid && externalValidated ), [valid, validated, externalIsValid, externalValidated]);
    const inputInvalid = useMemo(() => ( !valid && validated ) || ( !externalIsValid && externalValidated ), [valid, validated, externalIsValid, externalValidated]);

    useEffect(() => {
        if(getText !== undefined)
        {
            getText({text: value, name, isValid: validated ? valid : undefined});
        }

    }, [value, validated, valid, name, getText]);

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
            blurHandler = {(event: React.FocusEvent<HTMLInputElement>) => blurHandler(event, value)}
            changeHandler = {(event: React.ChangeEvent<HTMLInputElement>) => changeHandler(event, value)}
        />
    )
}

export default InputTextHoc;