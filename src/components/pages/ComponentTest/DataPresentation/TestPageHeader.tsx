import React from 'react';
import Column from '../../../common/structure/Column';
import Row from '../../../common/structure/Row';
import PageHeader from '../../../common/presentation/display/PageHeader';

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