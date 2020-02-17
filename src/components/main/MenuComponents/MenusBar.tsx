import * as React from 'react';
import Row from '../../common/Row';
import Column from '../../common/Column';
import MenuItem from './MenuItem';
import PageSelector from '../../common/PageSelector';
import { KnownPages } from '../../../common/context/appContextEnums';
import { IMenuProps } from '../Menu';

const MenusBar: React.FC<IMenuProps> = (props) => {
    return (
        <Row className='menuItemRow noselect'>
        { props.Brand && <Column className='menuItemCol menuBrand noselect'><PageSelector page={ KnownPages.Home } forceReload>{ props.Brand }</PageSelector></Column> }
        {
          props.MenuNav && props.MenuNav.map( ( menu, i ) =>
            <MenuItem key={ 'menu_' + i } Menu={ menu } />
          )
        }
      </Row>
    );
}

export default MenusBar;