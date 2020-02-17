import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext, AppLanguageContext } from '../../common/config/appConfig';
import { ContextActions, AppLanguage, KnownPages } from '../../common/context/appContextEnums';
import PageSelector from '../common/PageSelector';
import Row from '../common/Row';
import Column, { ColumnNumber } from '../common/Column';
import MenuItem, { IMenuItem } from './MenuComponents/MenuItem';
import SubMenu, { ISubMenuItem } from './MenuComponents/SubMenu';

export interface IMenuProps {
  Brand?: string;
  MenuNav?: IMenuItem[];
}

const Menu: React.FC<IMenuProps> = ( props ) => {
  const setAppContext = useContext( AppContext )[ 1 ];
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
      <Column full={ ColumnNumber.C14 }>
        <Row className='menuItemRow noselect'>
          { props.Brand && <Column className='menuItemCol menuBrand noselect'><PageSelector page={ KnownPages.Home } forceReload>{ props.Brand }</PageSelector></Column> }
          {
            props.MenuNav && props.MenuNav.map( ( menu, i ) =>
              <MenuItem key={ 'menu_' + i } Menu={ menu } />
            )
          }
        </Row>
      </Column>
      <Column full={ ColumnNumber.C5 }>
        {
          // login Form
          // user Menu
        }
      </Column>
      <Column full={ ColumnNumber.C1 } reference={ langMenuRef }>
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