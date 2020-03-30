import React from 'react';
import Row from '../../../common/Row';
import Column from '../../../common/Column';
import Loader from '../../../common/Loader';

const TestLoader: React.FC = () => {
    return (
        <Row>
            <Column>
                <Loader isLoading bigLoader paddingTop/>
            </Column>
            <Column>
                <Loader isLoading bigLoader withoutText paddingTop/>
            </Column>
            <Column>
                <Loader isLoading paddingTop/>
            </Column>
            <Column>
                <Loader isLoading withoutText paddingTop/>
            </Column>
        </Row>
    )
}

export default TestLoader;