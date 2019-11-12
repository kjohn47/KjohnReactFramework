import React from 'react';
import Row from './Row';
import Column from './Column';

interface IPageHeader {
    className?: string;
}

const PageHeader: React.FC<IPageHeader> = ( props ) => {
    return (
        <Row>
            <Column className = { "PageHeaderDiv" + ( props.className ? " " + props.className : "" ) }>
                {props.children}
            </Column>
        </Row>
    )
}

export default PageHeader;