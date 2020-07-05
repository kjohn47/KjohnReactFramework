import React, { useContext } from 'react';
import { AppContext, AppLanguageContext, ErrorContext, LoginContext, RouteContext } from '../../../logic/config/AppProvider';
import PageSelector from '../../common/inputs/PageSelector';
import Row from '../../common/structure/Row';
import Column from '../../common/structure/Column';
import useTranslation from '../../../logic/functions/getTranslation';
import { PageType } from '../../../logic/functions/misc';

export interface ISubMenuItem {
    Title?: string;
    Link?: PageType;
    Action?: () => void;
    Reloadable?: boolean;
    AuthOnly?: boolean;
    AdminOnly?: boolean;
}

const SubMenu: React.FC<{ subMenu: ISubMenuItem[], className?: string, unToogle: () => void }> = ( props ) => {
    const appContext = useContext( AppContext ).App;
    const routeContext = React.useContext( RouteContext ).Route;
    const errorContext = useContext( ErrorContext ).Error;
    const [ globalLang ] = useContext( AppLanguageContext );
    const [ userContext ] = useContext(LoginContext);
    const { getTranslation } = useTranslation();

    const makeSubMenu = ( subMenu: ISubMenuItem ) => {
        if ( !subMenu.Title || subMenu.Title === '' ) {
            return <Column className='subMenuLine'></Column>
        }
        let translatedTitle = subMenu.Title.startsWith( "#(" ) ? getTranslation( "_menu", subMenu.Title ) : subMenu.Title;
        if ( subMenu.Link && ( subMenu.Link !== routeContext.selectedPage || errorContext.hasError || subMenu.Reloadable ) ) {
            return <Column className={ 'subMenuCol' + ( subMenu.Reloadable && subMenu.Link === routeContext.selectedPage ? ' disabledMenuItem pointer_cursor subMenuReloadable' : '' ) }>
                {
                    <PageSelector page={ subMenu.Link } action={ props.unToogle } forceReload={ subMenu.Reloadable }>{ translatedTitle }</PageSelector>
                }
            </Column>
        }
        if ( subMenu.Action ) {
            return <Column className={ 'subMenuCol' + ( globalLang === subMenu.Title ? ' disabledMenuItem' : ' pointer_cursor' ) }>
                <span onClick={ () => { subMenu.Action && subMenu.Action(); props.unToogle(); } }>
                    { translatedTitle }
                </span>
            </Column>
        }
        return <Column className='subMenuCol disabledMenuItem'>
            <span>
                { translatedTitle }
            </span>
        </Column>
    }
    return (
        <div className={ 'subMenuDrop' + ( props.className ? ' ' + props.className : '' ) }>
            { props.subMenu.map( ( subMenu, i ) =>
                ( (!subMenu.AdminOnly && !subMenu.AuthOnly) || 
                  (!subMenu.AdminOnly && userContext) ||
                  appContext.adminOptions ) ? 
                    <Row key={ 'SubMenu_' + i }>
                        { makeSubMenu( subMenu ) }
                    </Row>
                    : null
            ) }
        </div>
    )
}

export default SubMenu;