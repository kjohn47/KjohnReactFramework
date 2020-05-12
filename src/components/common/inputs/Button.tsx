import React from 'react';
import PageSelector from './PageSelector';
import { IDictionary, PageType } from '../../../logic/functions/misc';

export enum ButtonTypes {
    Default = "page_button_color",
    Danger = "page_button_danger",
    Warning = "page_button_Warning",
    Confirmation = "page_button_Confirmation",
    Cancelation = "page_button_Cancelation",
    Information = "page_button_Information"
}

interface IButton {
    page?: PageType;
    queryParams?: IDictionary<string>;
    buttonType?: ButtonTypes;
    className?: string;
    forceReload?: boolean;
    onClick?(): void;
    disabled?: boolean;
}

const Button: React.FC<IButton> = ( props ) => {
    let css = `noselect page_button  ${( props.buttonType !== undefined ? ( props.buttonType ) : "page_button_color" )}${( props.disabled ? "_disabled" : " pointer_cursor" )}`;
    css = props.className !== undefined ? css + " " + props.className : css;

    return (
        <div className="ButtonComponent">
            <div tabIndex={ 0 } className={ css } onClick={ () => !props.disabled ? props.onClick && props.onClick() : undefined }>
                { props.page !== undefined &&
                    <PageSelector
                        page={ props.page }
                        queryParams={ props.queryParams }
                        className="page_Button_PageSelector"
                        forceReload = {props.forceReload}
                        disabled = { props.disabled }
                    >
                        { props.children }
                    </PageSelector>
                }
                { !props.page && props.children }
            </div>
        </div>
    );
}

export default Button;