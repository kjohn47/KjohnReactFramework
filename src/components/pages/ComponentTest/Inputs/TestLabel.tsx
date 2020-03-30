import React from 'react';
import Row from '../../../common/Row';
import Column from '../../../common/Column';
import WithLabel from '../../../common/WithLabel';
const TestLabel: React.FC = () => {
    return (
        <Row>
            <Column>
                <Row>
                    <Column>
                        <WithLabel text="This is an normal label on top of text">
                            <span style={{fontWeight:'bold'}}>
                                Labeled Text bellow
                            </span>
                        </WithLabel>
                    </Column>
                    <Column>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <WithLabel text="This is an inline label" inline>
                            <span style={{fontWeight:'bold', paddingTop:"8px"}}>
                                Labeled Text inline
                            </span>
                        </WithLabel>
                    </Column>
                    <Column>
                    </Column>
                </Row>
            </Column>
        </Row>
    )
}

export default TestLabel;