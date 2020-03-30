import React, { useContext } from 'react';
import { AppContext, AppLanguageContext, ErrorContext, LoginContext, RouteContext } from '../../../common/config/appConfig';
import { KnownPages } from '../../../common/context/routeContextEnums';
import PageSelector from '../../common/PageSelector';
import Row from '../../common/Row';
import Column from '../../common/Column';
import useTranslation from '../../../common/context/pageText/getTranslation';

export interface ISubMenuItem {
    Title?: string;
    Link?: KnownPages;
    Action?: () => void;
    Reloadable?: boolean;
    AuthOnly?: boolean;
    AdminOnly?: boolean;
}

const SubMenu: React.FC<{ subMenu: ISubMenuItem[], className?: string, unToogle: () => void }> = ( props ) => {
    const [ appContext ] = useContext( AppContext );
    const [ routeContext ] = React.useContext( RouteContext );
    const [ errorContext ] = useContext( ErrorContext );
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