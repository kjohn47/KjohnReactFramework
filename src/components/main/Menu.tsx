import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext, AppLanguageContext } from '../../common/config/appConfig';
import { ContextActions, AppLanguage, KnownPages } from '../../common/context/appContextEnums';
import PageSelector from '../common/PageSelector';
import Row from '../common/Row';
import Column, { ColumnNumber } from '../common/Column';

interface IMenuItem {
  Title: string;
  Link?: KnownPages;
  Action?: () => void;
  SubMenus?: ISubMenuItem[];
}

interface ISubMenuItem {
  Title?: string;
  Link?: KnownPages;
  Action?: () => void;
}

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
        <Row className='menuItemRow'>
          { props.Brand && <Column className='menuItemCol menuBrand'><PageSelector page={ KnownPages.Home }>{ props.Brand }</PageSelector></Column> }
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
        <div className="menuLanguageCol pointer_cursor" onClick={ () => setToogleLang( !toogleLang ) }>
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

const MenuItem: React.FC<{ Menu: IMenuItem }> = ( props ) => {
  const [ toogle, setToogle ] = useState<boolean>( false );
  const subMenuRef = useRef<HTMLDivElement>( null );

  const handleClickOut: ( event: any ) => void = ( event ) => {
    if ( toogle && subMenuRef != null && subMenuRef.current !== null && !subMenuRef.current.contains( event.target ) ) {
      setToogle( false );
    }
  }

  useEffect( () => {
    // add when mounted
    document.addEventListener( "mousedown", handleClickOut );
    // return function to be called when unmounted
    return () => {
      document.removeEventListener( "mousedown", handleClickOut );
    };
    //eslint-disable-next-line
  }, [ toogle ] )

  const makeMenu = ( menu: IMenuItem ) => {
    if ( menu.Link ) {
      return <PageSelector page={ menu.Link } className='menuSpan pointer_cursor'>{ menu.Title }</PageSelector>
    }
    if ( menu.SubMenus ) {
      return <>
        <span className='menuSpan pointer_cursor' onClick={ () => setToogle( !toogle ) }>{ menu.Title }</span>
        { toogle && <SubMenu subMenu={ menu.SubMenus } unToogle={ () => setToogle( false ) } /> }
      </>
    }
    return <span className='menuSpan pointer_cursor'>{ menu.Title }</span>
  }

  return <Column className={ 'menuItemCol' + ( toogle ? ' menuItemColSel' : '' ) } reference={ subMenuRef } tabIndex={ 0 }>
    { makeMenu( props.Menu ) }
  </Column>
}

const SubMenu: React.FC<{ subMenu: ISubMenuItem[], className?: string, unToogle: () => void }> = ( props ) => {
  const [ appContext ] = useContext( AppContext );
  const [ globalLang ] = useContext( AppLanguageContext );

  const makeSubMenu = ( subMenu: ISubMenuItem ) => {
    if ( !subMenu.Title || subMenu.Title === '' ) {
      return <Column className='subMenuLine'></Column>
    }
    if ( subMenu.Link && subMenu.Link !== appContext.selectedPage ) {
      return <Column className='subMenuCol'>
        {
          <PageSelector page={ subMenu.Link } action={ props.unToogle }>{ subMenu.Title }</PageSelector>
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

export default Menu;