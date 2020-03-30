import React from 'react';
import TabGroup, { ITabItem } from '../../../common/TabGroup';

const TestTabGroup: React.FC = () => {

    const tabItem: ITabItem<{Content: string;}> = {
        Component: (props) => {
            return <>{props.Content}</> 
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
                        Component: () => <>1</>,
                        Title: "Tab 1"
                    },
                    {
                        Component: () => <>2</>,
                        Title: "Tab 2"
                    },
                    {
                        Component:() => <>3</>,
                        Title: "Tab 3"
                    }
                ]
            }/>
        </div>)
}
export default TestTabGroup;