import React, { useCallback } from 'react';
import Row from '../../common/structure/Row';
import Column from '../../common/structure/Column';
import useTranslation from '../../../logic/functions/getTranslation';
import { executeClickEnterSpace, PageType } from '../../../logic/functions/misc';
import useAppHandler from '../../../logic/context/App/AppContextHandler';
import useRouteHandler from '../../../logic/context/Routes/RouteContextHandler';
import useErrorHandler from '../../../logic/context/Error/ErrorContextHandler';
import useAppLanguageHandler from '../../../logic/context/App/AppLanguageContextHandler';
import useLoginHandler from '../../../logic/context/Login/LoginContextHandler';

export interface ISubMenuItem {
    Title?: string;
    Link?: PageType;
    Action?: () => void;
    Reloadable?: boolean;
    AuthOnly?: boolean;
    AdminOnly?: boolean;
}

const SubMenu: React.FC<{ subMenu: ISubMenuItem[], className?: string, unToogle: () => void }> = ( { 
    subMenu,
    unToogle,
    className
} ) => {
    const appContext = useAppHandler().App;
    const {Route, SetPage} = useRouteHandler();
    const errorContext = useErrorHandler().Error;
    const globalLang = useAppLanguageHandler().appLanguage;
    const userContext = useLoginHandler().Login;
    const { getTranslation } = useTranslation();

    const executeAction = useCallback((subMenuItem: ISubMenuItem, e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if((!subMenuItem.Link && !subMenuItem.Action) || globalLang === subMenuItem.Title || ( subMenuItem.Link === Route.selectedPage && !errorContext.hasError && !subMenuItem.Reloadable ))
        {
            return;
        }

        if(subMenuItem.Link)
        {
            SetPage({
                page: subMenuItem.Link,
                forceReload: subMenuItem.Reloadable
            });
        }
        else if(subMenuItem.Action)
        {
            subMenuItem.Action();
        }
        e && e.currentTarget.blur();
        unToogle();
    }, [Route.selectedPage, errorContext.hasError, SetPage, unToogle, globalLang]);

    const makeSubMenu = useCallback( ( subMenu: ISubMenuItem ) => {
        if ( !subMenu.Title || subMenu.Title === '' ) {
            return <Column className='subMenuLine'></Column>
        }
        let translatedTitle = getTranslation( "_menu", subMenu.Title );
        return (
            <Column 
                className={ `subMenuCol
                            ${((!subMenu.Link && !subMenu.Action) || globalLang === subMenu.Title || (!errorContext.hasError && subMenu.Link === Route.selectedPage))
                            ? ` disabledMenuItem${subMenu.Reloadable ? " pointer_cursor subMenuReloadable" : ""}`
                            : ' pointer_cursor'}`}
                onClick={(e) => {executeAction(subMenu, e);} }
                tabIndex = {(!subMenu.Link && !subMenu.Action) || 
                            (!subMenu.Reloadable && (globalLang === subMenu.Title || 
                            (!errorContext.hasError && subMenu.Link === Route.selectedPage))) 
                            ? undefined 
                            : 0}
                onKeyDown={(e)=> executeClickEnterSpace(e, () => executeAction(subMenu))}
            >
                <span>
                    { translatedTitle }
                </span>
            </Column>
        )}, [globalLang, Route.selectedPage, errorContext.hasError, executeAction, getTranslation]);

    return (
        <div className={ `subMenuDrop${className ? ` ${className}` : ''}` }>
            { subMenu.map( ( subMenuItem, i ) =>
                ( (!subMenuItem.AdminOnly && !subMenuItem.AuthOnly) || 
                  (!subMenuItem.AdminOnly && userContext) ||
                  appContext.adminOptions ) ? 
                    <Row key={ 'SubMenu_' + i }>
                        { makeSubMenu( subMenuItem ) }
                    </Row>
                    : null
            ) }
        </div>
    )
}

export default SubMenu;