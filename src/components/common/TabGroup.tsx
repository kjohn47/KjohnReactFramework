import React, { useState, useEffect } from 'react';
import Column from './Column';
import Row from './Row';
import { injectProps } from '../../common/functions/misc';

export interface ITabGroup {
    Tabs: ITabItem<any>[]
}

export interface ITabItem<propType> {
        Title: string;
        Component: React.ComponentType<propType>
        Props?: propType;
}

const TabGroup: React.FC<ITabGroup> = (props) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [selectedComponent, setSelectedComponent] = useState<React.ComponentType | undefined>(undefined);
    const indexHandle: (index: number) => void = (index) =>
    {
        if(index !== selectedIndex)
        {
            setSelectedIndex(index);
        }
    }

    useEffect(() => {
        if(props.Tabs.length > 0)
        {
            setSelectedComponent(injectProps(props.Tabs[selectedIndex].Component, props.Tabs[selectedIndex].Props));
        }
    },[props, selectedIndex])

    return (
        <Row className="TabGroup">
            <Column>
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