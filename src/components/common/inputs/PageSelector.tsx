import React, { useCallback, useMemo } from "react";
import { IDictionary, PageType, executeClickEnterSpace } from "../../../logic/functions/misc";
import useRouteHandler from "../../../logic/context/Routes/RouteContextHandler";

interface IPageSelector {
    page: PageType;
    queryParams?: IDictionary<string>;
    className?: string;
    highlight?: boolean;
    forceReload?: boolean;
    action?: () => void;
    disabled?: boolean;
    focusable?: boolean;
}

const PageSelector: React.FC<IPageSelector> = ( { page,
                                                  action,
                                                  className,
                                                  disabled,
                                                  forceReload,
                                                  highlight,
                                                  queryParams,
                                                  focusable,
                                                  children
                                                } ) => {
    const {SetPage} = useRouteHandler();
    const css = useMemo(() => `${( disabled ? "" :  "pointer_cursor")}
                               ${( highlight ? " PageSelector_Highlight" : "" )}
                               ${( focusable ? " PageSelector_Focusable" : "" )}
                               ${( className ? ` ${className}` : "" )}`,
                         [disabled, highlight, className, focusable]);

    const setPage = useCallback(( page: PageType, queryParams?: IDictionary<string> ): void => {
        if(disabled)
            return;

        SetPage({page, queryParams, forceReload});

        if(action)
        {
            action();
        }
    }, [action, forceReload, SetPage, disabled]);

    return (
        <span 
            className={ css } 
            onClick={ (e) => {setPage( page, queryParams ); e.currentTarget.blur()} } 
            tabIndex = {!disabled && focusable ? 0 : undefined}
            onKeyDown = {focusable ? (event) => executeClickEnterSpace(event, () => setPage( page, queryParams ) ) : undefined}
        >
            { children }
        </span>
    );
}

export default PageSelector;