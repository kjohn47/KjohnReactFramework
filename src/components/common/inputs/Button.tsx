import React, { useMemo, useCallback } from 'react';
import { IDictionary, PageType, executeClickEnterSpace } from '../../../logic/functions/misc';
import useRouteHandler from '../../../logic/context/Routes/RouteContextHandler';

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

const Button: React.FC<IButton> = ( {buttonType, className, disabled, forceReload, page, queryParams, onClick, children} ) => {
    const {SetPage} = useRouteHandler();

    const css = useMemo(() => {
        let cssVal = `noselect page_button ${( buttonType !== undefined ? 
                                                buttonType 
                                                : ButtonTypes.Default )
                                            }${( disabled ? 
                                                "_disabled" 
                                                : " pointer_cursor" )
                                            }`;

        return className !== undefined ? 
                    `${cssVal} ${className}` 
                    : cssVal;
    }, [buttonType, disabled, className])

    const handleClick = useCallback(() => {
        if(!disabled && onClick)
        {
            onClick();
        }

        if(!disabled && page)
        {
            SetPage({page, queryParams, forceReload});
        }
    }, [SetPage, disabled, forceReload, onClick, page, queryParams])
    
    return (
        <div className="ButtonComponent">
            <div tabIndex={ !disabled ? 0 : undefined } className={ css } onClick={ () => handleClick() } onKeyDown={(event) => executeClickEnterSpace(event, () => handleClick())}>
                { children }
            </div>
        </div>
    );
}

export default Button;