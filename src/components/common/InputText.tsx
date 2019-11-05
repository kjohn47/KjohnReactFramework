import React, { useState, useContext } from 'react';
import "../../styles/InputText.css";
import { AppGlobalTheme } from '../../common/context/appContextEnums';
import { AppContext } from '../../common/config/appConfig';
import { AppRegex } from '../../common/config/regexEnum';

interface IInputProps {
    name: string;
    className?: string;    
    regexValidation?: AppRegex;
    allowOnlyRegex?: boolean;
    onChange?:( output: [ string, string, boolean ] ) => void;
    onBlur?:( output: [ string, string, boolean ] ) => void;
    externalIsValid?: boolean;
    externalValidated?: boolean;
    validText?: string;
    invalidText?: string;
    placeHolder?: string;
    isPassword?: boolean;
    notEmpty?: boolean;
    validateEmail?: boolean;
    lenght?: number;
}

const getThemeCss: ( appTheme: AppGlobalTheme ) => string = ( appTheme ) => {    
    switch( appTheme )
    {
        case AppGlobalTheme.Blue: 
            return " inputText_Color_Blue";
        case AppGlobalTheme.Green: 
            return " inputText_Color_Green";
        case AppGlobalTheme.Red: 
            return " inputText_Color_Red";
        case AppGlobalTheme.Orange: 
            return " inputText_Color_Orange";
        case AppGlobalTheme.Grey: 
            return " inputText_Color_Grey";
        default:
            return " inputText_Color";
    }
}

const InputText: React.FC<IInputProps> = ( props ) => 
{
    const appTheme = useContext( AppContext )[0].globalTheme;
    const [ value, setValue ] = useState<string>( "" );
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
            props.onChange( [ text, props.name, isValid ] );
        }
    }

    const blurHandler: ( event: React.FormEvent<HTMLInputElement> ) => void = ( event ) => {        

        let [ text, isValid ] = validate( event.currentTarget.value );

        setValidation( [ isValid, ( props.notEmpty || props.validateEmail || props.regexValidation !== undefined ) ] );

        if( props.onBlur !== undefined )
        {
            props.onBlur( [ text, props.name, isValid ] );
        }
    }

    let inputValid = ( valid && validated ) || ( props.externalIsValid && props.externalValidated );
    let inputInvalid = ( !valid && validated ) || ( !props.externalIsValid && props.externalValidated );
    let inputCss = "inputText" + getThemeCss( appTheme );
    inputCss += ( inputValid ?  " inputTextValid" : "" );
    inputCss += ( inputInvalid ?  " inputTextInvalid" : "" );

    return(
        <React.Fragment>
            <input 
                type = { props.isPassword ? "password" : "text" }
                name = { props.name }
                className = { inputCss + ( props.className ? ( " " + props.className ) : "" ) }
                onChange = { ( event ) => { changeHandler( event ) } }
                onBlur = { ( event ) => { blurHandler( event ) } }                
                value = { value }
                maxLength = { props.lenght }
            />
            { props.validText && inputValid && <div className = "inputTextValidation inputTextValidationValid">{ props.validText }</div> }
            { props.invalidText && inputInvalid && <div className = "inputTextValidation inputTextValidationInvalid">{ props.invalidText }</div> }
        </React.Fragment>
    )
}

export default InputText;