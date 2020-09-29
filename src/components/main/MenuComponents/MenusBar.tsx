import * as React from 'react';
import Row from '../../common/structure/Row';
import Column from '../../common/structure/Column';
import MenuItem from './MenuItem';
import PageSelector from '../../common/inputs/PageSelector';
import { KnownPages } from '../../../logic/context/Routes/routeContextEnums';
import { IMenuProps } from '../Menu';
import {useMobileWidth} from '../../../logic/functions/windowResize';
import { useState, useRef, useEffect, useMemo } from 'react';
import { mobileWidthMenu } from '../../../logic/config/configuration';
import useTranslation from '../../../logic/functions/getTranslation';
import MenuItemMobile from './MenuItemMobile';

const MenusBar: React.FC<IMenuProps & { toogle: boolean; setToogle: ( toogle: boolean ) => void }> = ( props ) => {
  const [ menuCollapse, setMenuCollapse ] = useState<boolean>( false );
  const { getTranslation } = useTranslation();
  const menuRef = useRef<HTMLDivElement>( null );
  const maxWith = useMemo(() => {
    const numMenus: number = props.MenuNav !== undefined ? props.MenuNav.length : 0;
    return numMenus <= 3 ? mobileWidthMenu : mobileWidthMenu + ( 100 * (numMenus - 3) );
  }, [props.MenuNav])
  const mobileWidth = useMobileWidth(maxWith);  

  const handleClickOut: ( event: any ) => void = ( event ) => {
    if ( props.toogle && menuRef != null && menuRef.current !== null && !menuRef.current.contains( event.target ) ) {
      props.setToogle( false );
    }
  }

  React.useEffect( () => {
    if ( mobileWidth.isCustomWidth )
      setMenuCollapse( true );
    else {
      setMenuCollapse( false );
      props.setToogle( false );
    }
    //eslint-disable-next-line
  }, [ mobileWidth.isCustomWidth ] );

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
      { props.Brand && <Column className='menuItemCol menuBrand noselect'><PageSelector page={ KnownPages.Home } forceReload>{ getTranslation( "_brand", props.Brand ) }</PageSelector></Column> }
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
                  <Column className={ "collapsedMenuItem collapseMenuBrand" + ( props.MenuNav && props.MenuNav.length > 0 ? "" : " collapsedMenuSingleItem" ) }>
                    <PageSelector page={ KnownPages.Home } forceReload action={ () => props.setToogle( false ) }>{ getTranslation( "_brand", props.Brand ) }</PageSelector>
                  </Column>
                </Row>
              }
              {
                props.MenuNav && props.MenuNav.map( ( menu, i ) =>
                  <MenuItemMobile { ...menu } key={ "_menu_" + i } collapseFunc={ () => props.setToogle( false ) } IsSingle={ !props.Brand && props.MenuNav && props.MenuNav.length === 1 } />
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