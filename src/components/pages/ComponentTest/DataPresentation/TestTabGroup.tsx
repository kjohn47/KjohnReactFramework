import React from 'react';
import TabGroup, { ITabItem } from '../../../common/structure/TabGroup';

const TestTabGroup: React.FC = () => {

    const tabItem: ITabItem<{Content: string;}> = {
        Component: (props) => {
            return <TestTabItem>{props.Content}</TestTabItem> 
            },
        Title: "Tab 0",
        Props: {
            Content: "Test Tab 0 with props injecion"
        }
    };

    return (
        <div className="TestTabGroup">
            <TabGroup Tabs = {
                [
                    tabItem,
                    {
                        Component: () => <TestTabItem>1</TestTabItem>,
                        Title: "Tab 1"
                    },
                    {
                        Component: () => <TestTabItem>2</TestTabItem>,
                        Title: "Tab 2"
                    },
                    {
                        Component:() => <TestTabItem>3</TestTabItem>,
                        Title: "Tab 3"
                    }
                ]
            }/>
        </div>)
}

const TestTabItem: React.FC = ({children}) => {
    return (
        <div className="TestTabItem">
            {children}
        </div>
    )
}

export default TestTabGroup;