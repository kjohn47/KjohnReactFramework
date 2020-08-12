import React from 'react';
import Column from '../../structure/Column';
import Row from '../../structure/Row';
import { ModalComponentType } from '../../../../logic/context/Modal/ModalContextInterfaces';
import Button, { ButtonTypes } from '../../inputs/Button';

export interface IGenericModalProps {
    Title: string;
    Description?: string;
    Icon?: string;
    Buttons?: IGenericModalButton[];
}

export interface IGenericModalButton {
    Text: string;
    Method?: () => void;
    CloseAfterMethod?: boolean;
    ButtonType: ButtonTypes;
}

const GenericModal: React.FC<ModalComponentType<IGenericModalProps>> = ({Title, Description, Buttons, Icon, close}) => {
    const buttonHandle = (button: IGenericModalButton) => {
        if(button.Method)
        {
            button.Method();
        }

        if(button.CloseAfterMethod)
        {
            close();
        }
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
                {Buttons && <Row className = "Modal_Footer Modal_Footer_Centered">
                    {
                        Buttons.map((button, index) => 
                        <Column key = {`btn_${index}`}>
                            <Button onClick={() => buttonHandle(button)} buttonType={button.ButtonType}>{button.Text}</Button>
                        </Column>
                        )
                    }
                </Row>}
            </Column>
        </Row>
    )
}

export default GenericModal;