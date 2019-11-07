import React from 'react';
import PageSelector from './PageSelector';
import { KnownPages } from '../../common/context/appContextEnums';
import "../../styles/Button.scss";

export enum ButtonTypes {
    Default = "page_button_color",
    Danger = "page_button_danger",
    Warning = "page_button_Warning",
    Confirmation = "page_button_Confirmation",
    Cancelation = "page_button_Cancelation",
    Information = "page_button_Information"
}

interface IButton {
    page?: KnownPages;
    queryParams?: object;
    buttonType?: ButtonTypes;
    className?: string;
    onClick?(): void;
}

const Button: React.FC<IButton> = ( props ) => {    
    let css = "noselect page_button  " + ( props.buttonType !== undefined ? ( props.buttonType ) : "page_button_color" );
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