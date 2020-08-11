import React, { useMemo } from 'react';
import Column from '../../../common/structure/Column';
import Row from '../../../common/structure/Row';
import Button from '../../../common/inputs/Button';
import useModalHandler from '../../../../logic/context/Modal/ModalContextHandler';
import YesNoModal, { IYesNoModalProps } from '../../../common/presentation/modal/YesNoModal';
import { ModalSize } from '../../../../logic/context/Modal/ModalContextEnum';

const TestModals: React.FC = () => {
    const modalHandler = useModalHandler();
    const YNModalProps = useMemo((): IYesNoModalProps => {
        return {
            Title: "Yes/No Modal",
            Description: "This is a Yes/No Modal type",
            Yes: () => {console.log("Pressed Yes button")},
            No: () => {console.log("Pressed No button")}
        }
    }, []);

    return (
            <Row>
                <Column>
                    <Button 
                        onClick={() => 
                            modalHandler.openModal({
                                Modal: YesNoModal,
                                modalProps: YNModalProps,
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