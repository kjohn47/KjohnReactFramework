import React, { useState } from 'react';
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
}

const InputText: React.FC<IInputProps> = ( props ) => 
{    
    const [ value, setValue ] = useState<string>( props.initialText ? props.initialText : "" );
    const [ [ valid, validated ], setValidation ] = useState< [boolean, boolean ] >( [ false, false ] );    

    const validate: ( eventText: string ) => [ string, boolean ] = ( eventText ) => {
        let textOut = eventText;
        if( props.notEmpty && textOut === "" )
        {
            return [ textOut, false ];
        }

        if( props.regexValidation !== undefined )
        {            
            let regex = new RegExp( props.regexValidation );
            let isValid = regex.test( textOut );

            if( props.allowOnlyRegex && !isValid )
            {
                if( !props.validateEmail )
                    textOut = value;
                else
                {
                    let emailRegex = new RegExp( AppRegex.EmailChars );
                    if( !( emailRegex.test( textOut ) ) )
                        textOut = value;
                }

                isValid = regex.test( textOut ) && ( !props.notEmpty || ( props.notEmpty && textOut !== "" ) );
            }

            return [ textOut, isValid ];
        }

        return [ textOut, true ];
    }

    const changeHandler: ( event: React.FormEvent<HTMLInputElement> ) => void = ( event ) => {
        let [ text, isValid ] = validate( event.currentTarget.value );

        setValue( text );
        setValidation( [ isValid, validated ] );

        if( props.onChange !== undefined )
        {
            props.onChange( { text, name: props.name, isValid } );
        }
    }

    const blurHandler: ( event: React.FormEvent<HTMLInputElement> ) => void = ( event ) => {        

        let [ text, isValid ] = validate( event.currentTarget.value );

        setValidation( [ isValid, ( props.notEmpty || props.validateEmail || props.regexValidation !== undefined ) ] );

        if( props.onBlur !== undefined )
        {
            props.onBlur( { text, name: props.name, isValid } );
        }
    }

    let inputValid = ( valid && validated ) || ( props.externalIsValid && props.externalValidated );
    let inputInvalid = ( !valid && validated ) || ( !props.externalIsValid && props.externalValidated );
    let inputCss = "inputText";
    inputCss += !( inputValid || inputInvalid ) ? " inputText_Color" : "" ;
    inputCss += inputValid ?  " inputTextValid" : "";
    inputCss += inputInvalid ?  " inputTextInvalid" : "";

    return(
        <div className = "inputTextDiv">
            <input 
                type = { props.isPassword ? "password" : "text" }
                name = { props.name }
                className = { inputCss + ( props.className ? ( " " + props.className ) : "" ) }
                onChange = { ( event ) => { changeHandler( event ) } }
                onBlur = { ( event ) => { blurHandler( event ) } }                
                value = { value }
                maxLength = { props.lenght }
                placeholder = { props.placeHolder }
            />
            { props.validText && inputValid && <div className = { props.balloonValidText ? ( "inputTextValidationBalloon inputTextValidBalloon" ) : ( "inputTextValidation inputTextValidationValid" )}>{ props.validText }</div> }
            { props.invalidText && inputInvalid && <div className = { props.balloonValidText ? ( "inputTextValidationBalloon inputTextInvalidBalloon" ) : ("inputTextValidation inputTextValidationInvalid")}>{ props.invalidText }</div> }
        </div>
    )
}

export default InputText;