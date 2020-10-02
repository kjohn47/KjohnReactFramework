import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Column, { ColumnNumber } from './Column';
import Row from './Row';
import { injectProps, handleClickOutDiv } from '../../../logic/functions/misc';
import { useMobileWidth } from '../../../logic/functions/windowResize';
import { mobileWidthMenu } from '../../../logic/config/configuration';

export interface ITabGroup {
    Tabs: ITabItem<any>[]
    DefaultIndex?: number;
}

export interface ITabItem<TProps> {
        Title: string;
        Component: React.ComponentType<TProps>
        Props?: TProps;
}

const TabGroup: React.FC<ITabGroup> = (props) => {
    const [selectedIndex, setSelectedIndex] = useState<number>( props.DefaultIndex ? props.DefaultIndex : 0);
    const [selectedComponent, setSelectedComponent] = useState<React.ComponentType | undefined>(undefined);
    const [collapsedTabs, setCollapsedTabs] = useState<boolean>(false);
    const collapsedMenuRef = useRef<HTMLDivElement>(null);
    
    const maxWith = useMemo(() => {
        const numMenus: number = props.Tabs !== undefined ? props.Tabs.length : 0;
        return numMenus <= 2 ? mobileWidthMenu : mobileWidthMenu + ( 150 * (numMenus - 2) );
      }, [props.Tabs])

    const isCollapsed = useMobileWidth(maxWith).isCustomWidth;

    const indexHandle = useCallback((index: number, closeCollapse?: boolean): void =>
    {
        if(index !== selectedIndex)
        {
            setSelectedIndex(index);
        }

        if(closeCollapse)
        {
            setCollapsedTabs(false);
        }

    },[selectedIndex]);

    const generateTabs = useMemo(() => {
        return (
        <Row className="TabGroupTabRow">
        {
            props.Tabs.map( (tab, i) =>
                <Column 
                    key = {"Tab_" + i}
                    className = {"TabItem noselect" + (selectedIndex !== i ? " pointer_cursor" : " SelectedTab")}
                    onClick = {() => indexHandle(i)}
                >
                    {
                        tab.Title
                    }
                </Column>
            )
        }
        </Row>
    )}, [props.Tabs, selectedIndex, indexHandle])

    const generateCollapsedTabs = useMemo(() => {
        return (
        <div className="CollapsedTabMenu">
        {
            props.Tabs.map( (tab, i) =>
                <div 
                    key = {"CollapsedTab_" + i}
                    className = {"CollapsedTabItem noselect" + (selectedIndex !== i ? " pointer_cursor" : " CollapsedTabSelected")}
                    onClick = {() => indexHandle(i, true)}
                >
                    {
                        tab.Title
                    }
                </div>
            )
        }
        </div>
    )}, [props.Tabs, selectedIndex, indexHandle])

    const handleClickOutTabGrp = useCallback( (event: any) => handleClickOutDiv(event, collapsedMenuRef, isCollapsed && collapsedTabs, () => setCollapsedTabs(false) ), [isCollapsed, collapsedTabs]);

    useEffect(() => {
        if(props.Tabs.length > 0 && (!props.DefaultIndex || props.DefaultIndex < props.Tabs.length))
        {
            setSelectedComponent(injectProps(props.Tabs[selectedIndex].Component, props.Tabs[selectedIndex].Props));
        }
    },[props, selectedIndex])

    useEffect(() => {
        // add when mounted
        document.addEventListener( "mousedown", handleClickOutTabGrp );
        // return function to be called when unmounted
        return () => {
        document.removeEventListener( "mousedown", handleClickOutTabGrp );
        };
    }, [handleClickOutTabGrp]);

    useEffect(() => {
        if(!isCollapsed)
        {
            setCollapsedTabs(false);
        }
    }, [isCollapsed])

    return (
        <Row className="TabGroup">
            <Column>
                {isCollapsed ? 
                    <Row className="TabGroupTabRowCollapsed">
                        <Column full={ColumnNumber.C2} reference={collapsedMenuRef}>
                            <span className = {`TabMenuEntry pointer_cursor${(collapsedTabs ? " TabEntrySelected": "")}`} onClick = {() => setCollapsedTabs(prev => !prev)}>|||</span>
                            {collapsedTabs ? generateCollapsedTabs : null}
                        </Column>
                        <Column full={ColumnNumber.C18}>
                            {props.Tabs[selectedIndex].Title}
                        </Column>
                    </Row>
                    : generateTabs}
                <Row className="TabGroupContentRow">
                    <Column>
                        {selectedComponent}
                    </Column>
                </Row>
            </Column>
        </Row>
    )
}

export default TabGroup;