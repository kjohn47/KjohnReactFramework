import React from 'react';
import Row from '../../../common/Row';
import Column from '../../../common/Column';
import FieldSet from '../../../common/FieldSet';

const TestFieldSet: React.FC = () => {
    return (
        <Row>
            <Column>
                <FieldSet Title="FieldSet Title">
                    <Row>
                        <Column>
                            FieldSet Content
                        </Column>
                    </Row>
                </FieldSet>
            </Column>
        </Row>
    )
}

export default TestFieldSet;