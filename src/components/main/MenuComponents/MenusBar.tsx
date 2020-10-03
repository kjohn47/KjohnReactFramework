import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Row from '../../common/structure/Row';
import Column from '../../common/structure/Column';
import MenuItem, { IMenuItem } from './MenuItem';
import PageSelector from '../../common/inputs/PageSelector';
import { KnownPages } from '../../../logic/context/Routes/routeContextEnums';
import {useMobileWidth} from '../../../logic/functions/windowResize';
import { mobileWidthMenu } from '../../../logic/config/configuration';
import useTranslation from '../../../logic/functions/getTranslation';
import MenuItemMobile from './MenuItemMobile';
import { executeAfterLostFocusChild, executeClickEnterSpace, handleClickOutDiv } from '../../../logic/functions/misc';
import useRouteHandler from '../../../logic/context/Routes/RouteContextHandler';

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
  const {SetPage} = useRouteHandler();
  const menuRef = useRef<HTMLDivElement>( null );
  const maxWith = useMemo(() => {
    const numMenus: number = MenuNav !== undefined ? MenuNav.length : 0;
    return numMenus <= 3 ? mobileWidthMenu : mobileWidthMenu + ( 100 * (numMenus - 3) );
  }, [MenuNav])
  const mobileWidth = useMobileWidth(maxWith);  

  const handleGoHome = useCallback(() => {
    SetPage({
      page: KnownPages.Home,
      forceReload: true
    });
    setToogle( false );
  }, [SetPage, setToogle])

  const handleClickOutNavMenu = useCallback( (event: any) => handleClickOutDiv(event, menuRef, toogle, () => setToogle( false ) ), [toogle, setToogle]);

  const handleTabOutMenu = useCallback((e: KeyboardEvent) => {
    if(toogle && menuRef.current)
    {
      executeAfterLostFocusChild(e, menuRef.current, () => setToogle(false));
    }
  }, [toogle, menuRef, setToogle]);

  useEffect( () => {
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

  useEffect(() => {
    // add when mounted
    document.addEventListener( "keyup", handleTabOutMenu );
    // return function to be called when unmounted
    return () => {
      document.removeEventListener( "keyup", handleTabOutMenu );
    };
  }, [handleTabOutMenu])

  const renderInLineMenus = () => {
    return <Row className='menuItemRow noselect'>
      { Brand && <Column className='menuItemCol menuBrand noselect'>
          <PageSelector page={ KnownPages.Home } focusable forceReload>{ getTranslation( "_brand", Brand ) }</PageSelector>
        </Column> }
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
        <div 
          tabIndex={ 0 } 
          className="menuLanguageCol pointer_cursor noselect" 
          onClick={ (e) => {toogle && e.currentTarget.blur(); setToogle( !toogle );} }
          onKeyDown={(e) => executeClickEnterSpace(e, () => setToogle( !toogle ))}
        >
          <span className={ ( toogle ? 'menuItemColSel' : '' ) }>
            <div className="menuCollapsed">|||</div>
          </span>
        </div>
        { toogle &&
          <Row>
            <Column className="collapsedMenuGroup">
              { Brand &&
                <Row>
                  <Column 
                    className={ "collapsedMenuItem collapseMenuBrand pointer_cursor" + ( MenuNav && MenuNav.length > 0 ? "" : " collapsedMenuSingleItem" ) }
                    onClick={() => handleGoHome()}
                    onKeyDown={(e) => executeClickEnterSpace(e, () => handleGoHome())}
                    tabIndex={0}
                  >
                    <span>{ getTranslation( "_brand", Brand ) }</span>
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