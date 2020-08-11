import React from 'react';
import Column from '../../structure/Column';
import Row from '../../structure/Row';
import { ModalComponentType } from '../../../../logic/context/Modal/ModalContextInterfaces';
import Button, { ButtonTypes } from '../../inputs/Button';

export interface IYesNoModalProps {
    Title: string;
    Description?: string;
    Yes: () => void;
    No?: () => void; 
}

const YesNoModal: React.FC<ModalComponentType<IYesNoModalProps>> = ({Title, Description, Yes, No, close}) => {

    const noHandler = () => {
        if(No !== undefined)
        {
            No();
        }
        close();
    }

    const yesHandler = () => {
        Yes();
        close();
    }

    return (
        <Row className = "Modal_Generic">
            <Column>
                <Row className="Modal_Header">
                    <Column>
                        {Title}
                    </Column>
                </Row>
                <Row className="Modal_Content">
                    <Column>
                        {Description}
                    </Column>
                </Row>
                <Row className = "Modal_Footer Modal_Footer_Centered">
                    <Column>
                        <Button onClick={() => noHandler()} buttonType={ButtonTypes.Cancelation}>No</Button>
                    </Column>
                    <Column>
                        <Button onClick={() => yesHandler()} buttonType={ButtonTypes.Confirmation}>Yes</Button>
                    </Column>
                </Row>
            </Column>
        </Row>
    )
}

export default YesNoModal;