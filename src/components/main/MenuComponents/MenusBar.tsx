import * as React from 'react';
import Row from '../../common/Row';
import Column from '../../common/Column';
import MenuItem from './MenuItem';
import PageSelector from '../../common/PageSelector';
import { KnownPages } from '../../../common/context/appContextEnums';
import { IMenuProps } from '../Menu';
import useWindowSize from '../../../common/functions/windowResize';
import { useState, useRef, useEffect } from 'react';
import { mobileWidthMenu } from '../../../common/config/configuration';
import useTranslation from '../../../common/context/pageText/getTranslation';
import MenuItemMobile from './MenuItemMobile';

const MenusBar: React.FC<IMenuProps & { toogle: boolean; setToogle: ( toogle: boolean ) => void }> = ( props ) => {
  const [ width ] = useWindowSize();
  const [ menuCollapse, setMenuCollapse ] = useState<boolean>( false );

  const { getTranslation } = useTranslation();
  const menuRef = useRef<HTMLDivElement>( null );

  const numMenus: number = props.MenuNav !== undefined ? props.MenuNav.length : 0;
  const maxWidth: number = numMenus <= 3 ? mobileWidthMenu : mobileWidthMenu + ( 100 * numMenus - 3 );

  const handleClickOut: ( event: any ) => void = ( event ) => {
    if ( props.toogle && menuRef != null && menuRef.current !== null && !menuRef.current.contains( event.target ) ) {
      props.setToogle( false );
    }
  }

  React.useEffect( () => {
    if ( width <= maxWidth )
      setMenuCollapse( true );
    else {
      setMenuCollapse( false );
      props.setToogle( false );
    }
  }, [ width, maxWidth ] );

  useEffect( () => {
    // add when mounted
    document.addEventListener( "mousedown", handleClickOut );
    // return function to be called when unmounted
    return () => {
      document.removeEventListener( "mousedown", handleClickOut );
    };
    //eslint-disable-next-line
  }, [ props.toogle ] )

  const renderInLineMenus = () => {
    return <Row className='menuItemRow noselect'>
      { props.Brand && <Column className='menuItemCol menuBrand noselect'><PageSelector page={ KnownPages.Home } forceReload>{ props.Brand.startsWith( "#(" ) ? getTranslation( "_brand", props.Brand ) : props.Brand }</PageSelector></Column> }
      {
        props.MenuNav && props.MenuNav.map( ( menu, i ) =>
          <MenuItem key={ 'menu_' + i } Menu={ menu } />
        )
      }
    </Row>
  }

  const renderCollapsedMenu = () => {
    return (
      <div ref={ menuRef }>
        <div className="menuLanguageCol pointer_cursor noselect" onClick={ () => props.setToogle( !props.toogle ) }>
          <span tabIndex={ 0 } className={ ( props.toogle ? 'menuItemColSel' : '' ) }>
            <div className="menuCollapsed">|||</div>
          </span>
        </div>
        { props.toogle &&
          <Row>
            <Column className="collapsedMenuGroup">
              { props.Brand &&
                <Row>
                  <Column className="collapsedMenuItem collapseMenuBrand">
                    <PageSelector page={ KnownPages.Home } forceReload action={ () => props.setToogle( false ) }>{ props.Brand.startsWith( "#(" ) ? getTranslation( "_brand", props.Brand ) : props.Brand }</PageSelector>
                  </Column>
                </Row>
              }
              {
                props.MenuNav && props.MenuNav.map( ( menu, i ) =>
                  <MenuItemMobile { ...menu } key={ "_menu_" + i } collapseFunc={ () => props.setToogle( false ) } />
                )
              }
            </Column>
          </Row>
        }
      </div>
    )
  }

  return (
    !menuCollapse ? renderInLineMenus() : renderCollapsedMenu()
  );
}

export default MenusBar;