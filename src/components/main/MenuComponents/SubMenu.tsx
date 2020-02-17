import React, { useContext } from 'react';
import { AppContext, AppLanguageContext, ErrorContext } from '../../../common/config/appConfig';
import { KnownPages } from '../../../common/context/appContextEnums';
import PageSelector from '../../common/PageSelector';
import Row from '../../common/Row';
import Column from '../../common/Column';

export interface ISubMenuItem {
    Title?: string;
    Link?: KnownPages;
    Action?: () => void;
    Reloadable?: boolean;
}

const SubMenu: React.FC<{ subMenu: ISubMenuItem[], className?: string, unToogle: () => void }> = ( props ) => {
    const [ appContext ] = useContext( AppContext );
    const [ errorContext ] = useContext( ErrorContext );
    const [ globalLang ] = useContext( AppLanguageContext );

    const makeSubMenu = ( subMenu: ISubMenuItem ) => {
        if ( !subMenu.Title || subMenu.Title === '' ) {
            return <Column className='subMenuLine'></Column>
        }
        if ( subMenu.Link && ( subMenu.Link !== appContext.selectedPage || errorContext.hasError || subMenu.Reloadable ) ) {
            return <Column className={ 'subMenuCol' + ( subMenu.Reloadable && subMenu.Link === appContext.selectedPage ? ' disabledMenuItem pointer_cursor subMenuReloadable' : '' ) }>
                {
                    <PageSelector page={ subMenu.Link } action={ props.unToogle } forceReload={ subMenu.Reloadable }>{ subMenu.Title }</PageSelector>
                }
            </Column>
        }
        if ( subMenu.Action ) {
            return <Column className={ 'subMenuCol' + ( globalLang === subMenu.Title ? ' disabledMenuItem' : ' pointer_cursor' ) }>
                <span onClick={ () => { subMenu.Action && subMenu.Action(); props.unToogle(); } }>
                    { subMenu.Title }
                </span>
            </Column>
        }
        return <Column className='subMenuCol disabledMenuItem'>
            <span>
                { subMenu.Title }
            </span>
        </Column>
    }
    return (
        <div className={ 'subMenuDrop' + ( props.className ? ' ' + props.className : '' ) }>
            { props.subMenu.map( ( subMenu, i ) =>
                <Row key={ 'SubMenu_' + i }>
                    { makeSubMenu( subMenu ) }
                </Row>
            ) }
        </div>
    )
}

export default SubMenu;