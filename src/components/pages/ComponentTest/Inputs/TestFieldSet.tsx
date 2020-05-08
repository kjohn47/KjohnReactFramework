import React from 'react';
import Row from '../../../common/structure/Row';
import Column from '../../../common/structure/Column';
import FieldSet from '../../../common/presentation/wrapper/FieldSet';

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