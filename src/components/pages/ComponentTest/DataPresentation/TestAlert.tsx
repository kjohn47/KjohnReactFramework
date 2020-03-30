import React, { useState } from 'react';
import Column from '../../../common/Column';
import Row from '../../../common/Row';
import Alert, { AlertColorEnum } from '../../../common/Alert';
import FieldSet from '../../../common/FieldSet';

const TestAlert: React.FC = () => {
    const [alert, setAlert] = useState<boolean>(false);
    
    return(
        <Row>
            <Column>
                <FieldSet Title="Alert Behaviour">
                    <div style={{fontWeight:"bold"}}><span onClick={() => setAlert(true)} className="pointer_cursor">Click to open Alert here</span></div>
                    <Alert IsVisible = {alert} Close={() => setAlert(false)}>This is a open Alert</Alert>
                </FieldSet>
                <FieldSet Title="Alert Colors">
                    <Alert IsVisible Close={() => {}} Color={AlertColorEnum.Default}>This is a Default Alert</Alert>
                    <Alert IsVisible Close={() => {}} Color={AlertColorEnum.Danger}>This is a Danger Alert</Alert>
                    <Alert IsVisible Close={() => {}} Color={AlertColorEnum.Information}>This is a Information Alert</Alert>
                    <Alert IsVisible Close={() => {}} Color={AlertColorEnum.Confirmation}>This is a Confirmation Alert</Alert>
                    <Alert IsVisible Close={() => {}} Color={AlertColorEnum.Warning}>This is a Warning Alert</Alert>
                    <Alert IsVisible Close={() => {}} Color={AlertColorEnum.Cancelation}>This is a Cancelation Alert</Alert>
                </FieldSet>
            </Column>
        </Row>
    )
}

export default TestAlert;