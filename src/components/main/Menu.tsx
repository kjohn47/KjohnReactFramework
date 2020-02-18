import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext, AppLanguageContext, LoginContext } from '../../common/config/appConfig';
import { ContextActions, AppLanguage } from '../../common/context/appContextEnums';
import Row from '../common/Row';
import Column, { ColumnNumber } from '../common/Column';
import { IMenuItem } from './MenuComponents/MenuItem';
import SubMenu, { ISubMenuItem } from './MenuComponents/SubMenu';
import LoginForm from './MenuComponents/LoginForm';
import MenusBar from './MenuComponents/MenusBar';

export interface IMenuProps {
  Brand?: string;
  MenuNav?: IMenuItem[];
}

const Menu: React.FC<IMenuProps> = ( props ) => {
  const setAppContext = useContext( AppContext )[ 1 ];
  const [ loginContext ] = useContext( LoginContext );
  const [ appLanguage ] = useContext( AppLanguageContext );
  const [ toogleLang, setToogleLang ] = useState<boolean>( false );
  const langMenuRef = useRef<HTMLDivElement>( null );

  const handleClickOut: ( event: any ) => void = ( event ) => {
    if ( toogleLang && langMenuRef != null && langMenuRef.current !== null && !langMenuRef.current.contains( event.target ) ) {
      setToogleLang( false );
    }
  }

  const getAvailableLanguages: () => ISubMenuItem[] = () => {
    let langMenu: ISubMenuItem[] = [];
    for ( let item in AppLanguage ) {
      langMenu.push( {
        Title: item,
        Action: () => { setAppContext( { type: ContextActions.ChangeLanguage, payload: { globalLanguage: item as AppLanguage } } ) }
      } )
    }

    return langMenu;
  }

  useEffect( () => {
    // add when mounted
    document.addEventListener( "mousedown", handleClickOut );
    // return function to be called when unmounted
    return () => {
      document.removeEventListener( "mousedown", handleClickOut );
    };
    //eslint-disable-next-line
  }, [ toogleLang ] )

  return (
    <Row className='menuRow'>
      {
        loginContext !== undefined ?
        <Column full={ ColumnNumber.C17 } medium={ ColumnNumber.C15 } mobile={ ColumnNumber.C10 }>
          <MenusBar { ...props } />
        </Column> :
        <Column full={ ColumnNumber.C14 } medium={ ColumnNumber.C15 } mobile={ ColumnNumber.C10 }>
          <MenusBar { ...props } />
        </Column>
      }
      {
        loginContext !== undefined ?
        <Column full={ ColumnNumber.C2 } medium={ ColumnNumber.C3 } mobile={ ColumnNumber.C6 } className="loginMenuCol">
          <>UserMenuComponent</>
        </Column> :
        <Column full={ ColumnNumber.C5 } medium={ ColumnNumber.C3 } mobile={ ColumnNumber.C6 } className="loginMenuCol">
          <LoginForm />
        </Column>
      }
      <Column full={ ColumnNumber.C1 } medium={ ColumnNumber.C2 } mobile={ ColumnNumber.C4 } reference={ langMenuRef }>
        <div className="menuLanguageCol pointer_cursor noselect" onClick={ () => setToogleLang( !toogleLang ) }>
          <span tabIndex={ 0 } className={ ( toogleLang ? ' menuItemColSel' : '' ) }>{ appLanguage }</span>
        </div>
        { toogleLang && <SubMenu
          unToogle={ () => setToogleLang( false ) }
          subMenu={ getAvailableLanguages() }
          className='subMenuDropLang'
        /> }
      </Column>
    </Row>
  );
}

export default Menu;