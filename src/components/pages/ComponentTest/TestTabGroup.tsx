import React from 'react';
import TabGroup from '../../common/TabGroup';

const TestTabGroup: React.FC = () => <TabGroup Tabs = {
    [
        {
            Component: (props: any) => {
            return <>{props.Title}</> 
            },
            Title: "Tab 0",
            Props: {
                Title: "Test Tab 0 with props injecion"
            }
        },
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

export default TestTabGroup;