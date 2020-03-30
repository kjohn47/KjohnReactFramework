import React from 'react';
import Column from '../../../common/Column';
import Row from '../../../common/Row';
import PageHeader from '../../../common/PageHeader';

const TestPageHeader: React.FC = () => {
    return (
        <Row>
            <Column>
                <PageHeader>
                    This is a page header component
                </PageHeader>
            </Column>
        </Row>
    );
}

export default TestPageHeader;