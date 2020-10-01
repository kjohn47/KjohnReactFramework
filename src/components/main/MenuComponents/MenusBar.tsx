import * as React from 'react';
import Row from '../../common/structure/Row';
import Column from '../../common/structure/Column';
import MenuItem, { IMenuItem } from './MenuItem';
import PageSelector from '../../common/inputs/PageSelector';
import { KnownPages } from '../../../logic/context/Routes/routeContextEnums';
import {useMobileWidth} from '../../../logic/functions/windowResize';
import { useState, useRef, useEffect, useMemo } from 'react';
import { mobileWidthMenu } from '../../../logic/config/configuration';
import useTranslation from '../../../logic/functions/getTranslation';
import MenuItemMobile from './MenuItemMobile';
import { handleClickOutDiv } from '../../../logic/functions/misc';

interface INavMenuProps {
  toogle: boolean; 
  setToogle: ( toogle: boolean ) => void;
  Brand?: string;
  MenuNav?: IMenuItem[];
}

const MenusBar: React.FC<INavMenuProps> = ( {
  setToogle, 
  toogle, 
  Brand,
  MenuNav
} ) => {
  const [ menuCollapse, setMenuCollapse ] = useState<boolean>( false );
  const { getTranslation } = useTranslation();
  const menuRef = useRef<HTMLDivElement>( null );
  const maxWith = useMemo(() => {
    const numMenus: number = MenuNav !== undefined ? MenuNav.length : 0;
    return numMenus <= 3 ? mobileWidthMenu : mobileWidthMenu + ( 100 * (numMenus - 3) );
  }, [MenuNav])
  const mobileWidth = useMobileWidth(maxWith);  

  const handleClickOutNavMenu = React.useCallback( (event: any) => handleClickOutDiv(event, menuRef, toogle, () => setToogle( false ) ), [toogle, setToogle]);

  React.useEffect( () => {
    if ( mobileWidth.isCustomWidth )
      setMenuCollapse( true );
    else {
      setMenuCollapse( false );
      setToogle( false );
    }
    //eslint-disable-next-line
  }, [ mobileWidth.isCustomWidth ] );

  useEffect( () => {
    // add when mounted
    document.addEventListener( "mousedown", handleClickOutNavMenu );
    // return function to be called when unmounted
    return () => {
      document.removeEventListener( "mousedown", handleClickOutNavMenu );
    };
  }, [ handleClickOutNavMenu ] )

  const renderInLineMenus = () => {
    return <Row className='menuItemRow noselect'>
      { Brand && <Column className='menuItemCol menuBrand noselect'><PageSelector page={ KnownPages.Home } forceReload>{ getTranslation( "_brand", Brand ) }</PageSelector></Column> }
      {
        MenuNav && MenuNav.map( ( menu, i ) =>
          <MenuItem key={ 'menu_' + i } Menu={ menu } />
        )
      }
    </Row>
  }

  const renderCollapsedMenu = () => {
    return (
      <div ref={ menuRef }>
        <div className="menuLanguageCol pointer_cursor noselect" onClick={ () => setToogle( !toogle ) }>
          <span tabIndex={ 0 } className={ ( toogle ? 'menuItemColSel' : '' ) }>
            <div className="menuCollapsed">|||</div>
          </span>
        </div>
        { toogle &&
          <Row>
            <Column className="collapsedMenuGroup">
              { Brand &&
                <Row>
                  <Column className={ "collapsedMenuItem collapseMenuBrand" + ( MenuNav && MenuNav.length > 0 ? "" : " collapsedMenuSingleItem" ) }>
                    <PageSelector page={ KnownPages.Home } forceReload action={ () => setToogle( false ) }>{ getTranslation( "_brand", Brand ) }</PageSelector>
                  </Column>
                </Row>
              }
              {
                MenuNav && MenuNav.map( ( menu, i ) =>
                  <MenuItemMobile { ...menu } key={ "_menu_" + i } collapseFunc={ () => setToogle( false ) } IsSingle={ !Brand && MenuNav && MenuNav.length === 1 } />
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