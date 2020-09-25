import React, { useState, useEffect, useRef } from 'react';
import Column, { ColumnNumber } from './Column';
import Row from './Row';
import {useMobileWidth} from '../../../logic/functions/windowResize';

interface ISideMenuProps {
    title: string;
    presentationComponent: string | React.ComponentType | JSX.Element | JSX.IntrinsicElements;
    menus: IMenu[];
}

interface IMenu {
    title: string;
    startCollapsed?: boolean;
    submenus: ISubMenu[];
}

interface ISubMenu {
    title: string;
    component: string | React.ComponentType | JSX.Element | JSX.IntrinsicElements;
}

type selectFunctionType = ( component: string | React.ComponentType | JSX.Element | JSX.IntrinsicElements, index: string, menuTitle: string, subMenuTitle: string ) => void;

interface ISideMenuItem {
    selectFunc: selectFunctionType;
    index: number;
    menu: IMenu;
    selectedIndex: string;
}

const SideMenuItem: React.FC<ISideMenuItem> = ( props ) => {
    const [ collapse, setCollapse ] = useState<boolean>( props.menu.startCollapsed !== undefined && props.menu.startCollapsed );
    return (
        <Row>
            <Column>
                <span className="SideMenuMenu pointer_cursor" onClick={ () => { setCollapse( !collapse ) } }>{ ( collapse ? "+ " : "- " ) + props.menu.title }</span>
                <div className={ collapse ? "SideMenuHidden" : "" } >
                    {
                        props.menu.submenus.map( ( subMenu, z ) => {
                            let index = "menu-" + props.index + "subMenu-" + z;
                            return (
                                <Row key={ "menu-" + props.index + "subMenu-" + z }>
                                    <Column className="SubMenuSubMenu">
                                        <span
                                            className={ props.selectedIndex === index ? "SideMenuSelectedSubMenu" : "pointer_cursor" }
                                            onClick={ () => { props.selectFunc( subMenu.component, index, props.menu.title, subMenu.title ) } }
                                        >
                                            { subMenu.title }
                                        </span>
                                    </Column>
                                </Row> )
                        } )
                    }
                </div>
            </Column>
        </Row> )
}

const SideMenuPage: React.FC<ISideMenuProps> = ( props ) => {
    const mobileWidth = useMobileWidth();
    const [ selected, setSelected ] = useState<string | React.ComponentType | JSX.Element | JSX.IntrinsicElements>( props.presentationComponent );
    const [ selectedIndex, setSelectedIndex ] = useState<string>( "" );
    const [ menuCollapse, setMenuCollapse ] = useState<boolean>( false );
    const [ selectedTitle, setSelectedTitle ] = useState<[ string, string ]>( [ props.title, "" ] )
    const topRowRef = useRef<HTMLDivElement>(null);

    const selectSubMenu: selectFunctionType = ( component, index, menuTitle, subMenuTitle ) => {
        setSelected( component );
        setSelectedIndex( index );
        setSelectedTitle( [ menuTitle, subMenuTitle ] );
        if ( mobileWidth.isMobileWidth )
            setMenuCollapse( true );
    }

    useEffect( () => {
        if ( mobileWidth.isMobileWidth )
            setMenuCollapse( true );
        else
            setMenuCollapse( false );
    }, [ mobileWidth.isMobileWidth ] );

    useEffect(() => {
        if(topRowRef.current && selectedIndex !== "")
            topRowRef.current.scrollIntoView();
    }, [selectedIndex])

    return (
        <Row className="SideMenuPage" reference={topRowRef}>
            <Column full={ ColumnNumber.C3 } className="SideMenuColumn" mobile={ ColumnNumber.C20 }>
                <Row>
                    <Column className={ "SideMenuColumnContent" + ( menuCollapse ? " SideMenuColumnContentHidden" : "" ) }>
                        <Row>
                            <Column className="SideMenuTitle">
                                <Row>
                                    <Column className="SideMenuTitleText" >
                                        <span className="pointer_cursor" onClick={ () => { selectSubMenu( props.presentationComponent, "", props.title, "" ) } }>{ props.title }</span>
                                    </Column>
                                    <Column full={ ColumnNumber.C2 } className="SideMenuTitleCollapse">
                                        { mobileWidth.isMobileWidth && <span className="pointer_cursor " onClick={ () => { setMenuCollapse( !menuCollapse ) } }>{ menuCollapse ? "+" : "-" }</span> }
                                    </Column>
                                </Row>
                            </Column>
                        </Row>
                        <Row>
                            <Column className={ "SideMenuContent" + ( menuCollapse ? " SideMenuHidden" : "" ) }>
                                {
                                    props.menus.map( ( menu, i ) =>
                                        <SideMenuItem
                                            key={ i }
                                            index={ i }
                                            menu={ menu }
                                            selectFunc={ selectSubMenu }
                                            selectedIndex={ selectedIndex }
                                        />
                                    ) }
                            </Column>
                            { menuCollapse &&
                                <Column className="SideMenuCollapsedDescription">
                                    { selectedTitle[ 0 ] + ( selectedTitle[ 1 ] !== "" ? " - " + selectedTitle[ 1 ] : "" ) }
                                </Column>
                            }
                        </Row>
                    </Column>
                </Row>
            </Column>
            <Column className="SideMenuComponentColumn">
                <Row className="SideMenuComponentRow">
                    <Column>
                        { selected }
                    </Column>
                </Row>
            </Column>
        </Row>
    );
}

export default SideMenuPage;