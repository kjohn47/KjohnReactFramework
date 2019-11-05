import React, { useContext } from 'react';
import PageSelector from './PageSelector';
import { KnownPages, AppGlobalTheme } from '../../common/context/appContextEnums';
import "../../styles/Button.css";
import { AppContext } from '../../common/config/appConfig';

export enum ButtonTypes {
    Default,
    Danger,
    Warning,
    Confirmation,
    Cancelation,
    Information
}

interface IButton {
    page?: KnownPages;
    queryParams?: object;
    buttonType?: ButtonTypes;
    className?: string;
    onClick?(): void;    
}

const getThemeCss: ( appTheme: AppGlobalTheme ) => string = ( appTheme ) => {    
    switch( appTheme )
    {
        case AppGlobalTheme.Blue: 
            return " page_button_color_Blue";
        case AppGlobalTheme.Green: 
            return " page_button_color_Green";
        case AppGlobalTheme.Red: 
            return " page_button_color_Red";
        case AppGlobalTheme.Orange: 
            return " page_button_color_Orange";
        case AppGlobalTheme.Grey: 
            return " page_button_color_Grey";
        default:
            return " page_button_color";
    }
}

const getButtonClass: ( appTheme:AppGlobalTheme ,type?: ButtonTypes ) => string = ( appTheme, type ) => {
    let btncss = "noselect page_button";    
    switch( type )
    {
        case ButtonTypes.Danger:
            return btncss + " page_button_danger";
        case ButtonTypes.Warning:
            return btncss + " page_button_Warning";
        case ButtonTypes.Confirmation:
            return btncss + " page_button_Confirmation";            
        case ButtonTypes.Cancelation:
            return btncss + " page_button_Cancelation";
        case ButtonTypes.Information:
            return btncss + " page_button_Information";
        default:
            return btncss + getThemeCss( appTheme );
    }
}

const Button: React.FC<IButton> = ( props ) => {
    const appTheme = useContext( AppContext )[0].globalTheme;
    let css = getButtonClass( appTheme, props.buttonType );
    css = props.className !== undefined ? css + " " + props.className : css;

    return(
    <div tabIndex = { 0 } className = { css } onClick = { props.onClick }>
        { props.page !== undefined && 
            <PageSelector 
                page = { props.page }
                queryParams = { props.queryParams } 
                className = "page_Button_PageSelector"
            >
                { props.children }
            </PageSelector>
        }
        { !props.page && props.children }
    </div>
    );
}

export default Button;