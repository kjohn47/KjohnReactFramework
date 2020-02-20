import * as React from 'react';
import { IMenuItem } from './MenuItem';
import Row from '../../common/Row';
import Column from '../../common/Column';
import { useState } from 'react';

const MenuItemMobile: React.FC<IMenuItem & { collapseFunc: () => void }> = ( props ) => {
    const [ subMenuCollapsed, setSubMenuCollapsed ] = useState<boolean>( false );

    return (
        <Row>
            <Column className={ "collapsedMenuItem pointer_cursor noselect" + ( subMenuCollapsed ? " collapsedMenuItemSelected" : "" ) }>
                <div onClick={ () => setSubMenuCollapsed( !subMenuCollapsed ) }>
                    <Row>
                        <Column>{ props.Title }</Column>
                        <Column className="collapseMenuSign">{ subMenuCollapsed ? '-' : '+' }</Column>
                    </Row>
                </div>
                { subMenuCollapsed &&
                    <div className="collapsedSubMenuGroup" onClick={ props.collapseFunc }>
                        <Row>
                            <Column className="collapsedSubMenuItem pointer_cursor">
                                test sub menu 1
                            </Column>
                        </Row>
                        <Row>
                            <Column className="collapsedSubMenuItem pointer_cursor">
                                test sub menu 2
                            </Column>
                        </Row>
                        <Row>
                            <Column className='subMenuLine'></Column>
                        </Row>
                        <Row>
                            <Column className="collapsedSubMenuItem pointer_cursor">
                                test sub menu 3
                            </Column>
                        </Row>
                    </div>
                }
            </Column>
        </Row>
    )
}

export default MenuItemMobile;