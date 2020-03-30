import React from 'react';
import Column from './Column';
import Row from './Row';

interface IFieldSet {
    Title: string;
}

const FieldSet: React.FC<IFieldSet> = ( props ) => {
    return (
        <div className="FieldSet">
            <Row>
                <Column className="FieldSetTitle">
                    <div>
                        <span>{ props.Title }</span>
                    </div>
                </Column>
            </Row>
            <Row>
                <Column className="FieldSetContent">
                    { props.children }
                </Column>
            </Row>
        </div>
    )
}

export default FieldSet;