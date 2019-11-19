import React from 'react';
import Column from './Column';
import Row from './Row';

interface IFieldSet {
    Title: string;
}

const FieldSet: React.FC<IFieldSet> = ( props ) => {
    return (
        <>
            <Row>
                <Column className="FieldSetTitle">{ props.Title }</Column>
            </Row>
            <Row>
                <Column className="FieldSetContent">
                    { props.children }
                </Column>
            </Row>
        </>
    )
}

export default FieldSet;