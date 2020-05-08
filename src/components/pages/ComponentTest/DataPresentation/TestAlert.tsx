import React, { useState, useCallback } from 'react';
import Column from '../../../common/structure/Column';
import Row from '../../../common/structure/Row';
import Alert, { AlertColorEnum } from '../../../common/presentation/display/Alert';
import FieldSet from '../../../common/presentation/wrapper/FieldSet';

const AlertTestClosable: React.FC = () => {
    const [alert, setAlert] = useState<boolean>(false);
    return (<>
        <div style={{fontWeight:"bold"}}><span onClick={() => setAlert(true)} className="pointer_cursor">Click to open Alert here</span></div>
        <Alert IsVisible = {alert} Close={() => setAlert(false)}>This is a open Alert</Alert>
    </>)
}

const TestAlert: React.FC = () => {    
    const closeFunc = useCallback( () => {
        console.log("closed");
    }, [])

    return(
        <Row>
            <Column>
                <FieldSet Title="Alert Behaviour">
                    <AlertTestClosable />
                </FieldSet>
                <FieldSet Title="Alert Colors">
                    <Alert IsVisible Close={closeFunc} Color={AlertColorEnum.Default}>This is a Default Alert</Alert>
                    <Alert IsVisible Close={closeFunc} Color={AlertColorEnum.Danger}>This is a Danger Alert</Alert>
                    <Alert IsVisible Close={closeFunc} Color={AlertColorEnum.Information}>This is a Information Alert</Alert>
                    <Alert IsVisible Close={closeFunc} Color={AlertColorEnum.Confirmation}>This is a Confirmation Alert</Alert>
                    <Alert IsVisible Close={closeFunc} Color={AlertColorEnum.Warning}>This is a Warning Alert</Alert>
                    <Alert IsVisible Close={closeFunc} Color={AlertColorEnum.Cancelation}>This is a Cancelation Alert</Alert>
                </FieldSet>
            </Column>
        </Row>
    )
}

export default TestAlert;