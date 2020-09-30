import React, { useMemo } from 'react';

export interface ITextInput {
    isPassword?: boolean;
    name: string;
    className?: string;
    value: string;
    changeHandler: ( event: React.FormEvent<HTMLInputElement>, prevValue: string ) => void;
    blurHandler: ( event: React.FormEvent<HTMLInputElement>, prevValue: string ) => void;
    lenght?: number;
    placeHolder?: string;
    disabled?: boolean;
    validText?: string;
    inputValid?: boolean;
    invalidText?: string;
    inputInvalid?: boolean;
    balloonValidText?: boolean;
    reference?: React.RefObject<HTMLInputElement>;
}

const InputText: React.FC<ITextInput> = ({
    name,
    value,
    lenght,
    isPassword,
    placeHolder,
    disabled,
    className,
    changeHandler,
    blurHandler,
    validText,
    inputValid,
    balloonValidText,
    inputInvalid,
    invalidText,
    reference
}) => {
    
    const inputCss = useMemo(() => {
        return `inputText
            ${!( inputValid || inputInvalid ) ? " inputText_Color" : ""}
            ${inputValid ?  " inputTextValid" : ""}
            ${inputInvalid ?  " inputTextInvalid" : ""}
            ${disabled ? " disabled" : ""}
            ${className ? ` ${className}` : ""}`;
    
    }, [inputValid, inputInvalid, disabled, className]);

    return  (
        <div className = "inputTextDiv">
        <input 
            type = { isPassword ? "password" : "text" }
            name = { name }
            className = { inputCss }
            onChange = { ( event ) => { changeHandler( event, value ) } }
            onBlur = { ( event ) => { blurHandler( event, value ) } }
            value = { value }
            maxLength = { lenght }
            placeholder = { placeHolder }
            disabled = { disabled }
            ref = { reference }
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