import React, { useMemo } from 'react';
import Column from '../../../common/structure/Column';
import Row from '../../../common/structure/Row';
import Button, { ButtonTypes } from '../../../common/inputs/Button';
import useModalHandler from '../../../../logic/context/Modal/ModalContextHandler';
import { ModalSize } from '../../../../logic/context/Modal/ModalContextEnum';
import GenericModal, { IGenericModalProps } from '../../../common/presentation/modal/GenericModal';

const TestModals: React.FC = () => {
    const modalHandler = useModalHandler();
    const GenericModalProps = useMemo((): IGenericModalProps => {
        return {
            Title: "Yes/No Modal",
            Description: "This is a Yes/No Modal type",
            Buttons: [
                {
                    Text: "No",
                    ButtonType: ButtonTypes.Cancelation,
                    Method: () => {console.log("Pressed No button")},
                    CloseAfterMethod: true
                },
                {
                    Text: "Yes",
                    ButtonType: ButtonTypes.Confirmation,
                    Method: () => {console.log("Pressed Yes button")},
                    CloseAfterMethod: true
                }
            ]
        }
    }, []);

    return (
            <Row>
                <Column>
                    <Button 
                        onClick={() => 
                            modalHandler.openModal({
                                Modal: GenericModal,
                                modalProps: GenericModalProps,
                                size: ModalSize.Small
                            })}
                    >
                        Yes/No Modal
                    </Button>
                </Column>
            </Row>
    );
}

export default TestModals;