import * as React from 'react';
import Row from '../../common/Row';
import Column from '../../common/Column';
import MenuItem from './MenuItem';
import PageSelector from '../../common/PageSelector';
import { KnownPages } from '../../../common/context/appContextEnums';
import { IMenuProps } from '../Menu';
import useWindowSize from '../../../common/functions/windowResize';
import { useState } from 'react';
import { mobileWidthMenu } from '../../../common/config/configuration';
import useTranslation from '../../../common/context/pageText/getTranslation';

const MenusBar: React.FC<IMenuProps> = ( props ) => {
  const [ width ] = useWindowSize();
  const [ menuCollapse, setMenuCollapse ] = useState<boolean>( false );
  const { getTranslation } = useTranslation();

  const numMenus: number = props.MenuNav !== undefined ? props.MenuNav.length : 0;
  const maxWidth: number = numMenus <= 3 ? mobileWidthMenu : mobileWidthMenu + ( 100 * numMenus - 3 );

  React.useEffect( () => {
    if ( width <= maxWidth )
      setMenuCollapse( true );
    else
      setMenuCollapse( false );
  }, [ width, maxWidth ] );

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
      <>CollapsedMenu</>
    )
  }

  return (
    !menuCollapse ? renderInLineMenus() : renderCollapsedMenu()
  );
}

export default MenusBar;