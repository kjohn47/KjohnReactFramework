import React, { useState, useCallback, useMemo } from 'react';
import { AppRegex } from '../config/regexEnum';
import { ITextInput } from '../../components/common/inputs/InputText';

interface IInputSettings {
    name: string;
    className?: string;
    regexValidation?: AppRegex;
    allowOnlyRegex?: boolean;
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
    reference?: React.RefObject<HTMLInputElement>;
}

interface IUseTextInputReturn {
    inputProps: ITextInput;
    value: string;
    isValid?: boolean;
    disableInput: () => void;
    enableInput: () => void;
    changeValidation: (valid: boolean) => void;
    clearValidations: () => void;
    clearText: () => void;
}

const useInputText = ( {
                        name,
                        initialText,
                        className,
                        isPassword,
                        disabled,
                        lenght,
                        placeHolder,
                        regexValidation,
                        allowOnlyRegex,
                        notEmpty,
                        validateEmail,
                        validText,
                        invalidText,
                        balloonValidText,
                        reference
                    }: IInputSettings): IUseTextInputReturn => {
    //states
    const [value, setValue] = useState<string>(initialText ? initialText : "");
    const [isDisabled, setIsDisabled] = useState<boolean>(disabled ? disabled : false);
    const [ { valid, validated }, setValidation ] = useState< {valid: boolean, validated: boolean} >( { valid: false, validated: false } );

    //handle logic and validations
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
    }, [validate, disabled, notEmpty, validateEmail, regexValidation])

    const blurHandler = useCallback(( event: React.FormEvent<HTMLInputElement>, prevValue: string ): void => {        
        if(!disabled)
        {
            let [ text, isValid ] = validate( event.currentTarget.value, prevValue );

            setValue( text );
            setValidation( {valid: isValid, validated: ( notEmpty || validateEmail || regexValidation !== undefined ) } );
        }
    }, [validate, notEmpty, validateEmail, regexValidation, disabled]);

    const inputValid = useMemo(() => ( valid && validated ), [valid, validated]);
    const inputInvalid = useMemo(() => ( !valid && validated ), [valid, validated]);

    //external state manipulation
    const disableInput = () => {
        setIsDisabled(true);
    }

    const enableInput = () => {
        setIsDisabled(false);
    }

    const changeValidation = (valid: boolean) => {
        setValidation({
            valid: valid,
            validated: true
        });
    }

    const clearValidations = () => {
        setValidation({
            valid: false,
            validated: false
        });
    }

    const clearText = () => {
        setValue("");
        clearValidations();
    }

    return {
        value,
        isValid: validated ? valid : undefined,
        disableInput,
        enableInput,
        changeValidation,
        clearValidations,
        clearText,
        inputProps: {
                name,
                value,
                lenght,
                className,
                placeHolder,
                isPassword,
                disabled: isDisabled,
                inputValid,
                inputInvalid,
                validText,
                invalidText,
                balloonValidText,
                blurHandler: (event: React.FocusEvent<HTMLInputElement>) => blurHandler(event, value),
                changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => changeHandler(event, value),
                reference
        }
    }
}

export default useInputText;