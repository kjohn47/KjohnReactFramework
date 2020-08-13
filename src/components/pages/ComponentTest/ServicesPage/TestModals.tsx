import React from 'react';
import Column from '../../../common/structure/Column';
import Row from '../../../common/structure/Row';
import { ButtonTypes } from '../../../common/inputs/Button';
import DialogModal, { DialogModalType } from '../../../common/presentation/modal/DialogModal';

const TestModals: React.FC = () => {
    return (
            <Row>
                <Column>
                    <DialogModal 
                        Title = "Y/N Modal" 
                        Content = "This is a Y/N Modal Type" 
                        OkButtonType = {ButtonTypes.Confirmation}
                        OkMethod = {() => {console.log("Clicked Yes on Modal")}}
                        CancelMethod = {() => {console.log("Clicked No on Modal")}}
                        OpenModalText = "Open Yes/No Modal"
                        ModalType = {DialogModalType.YesNo}
                        //Scrollable
                        //OpenModalButton = {ButtonTypes.Default}
                        //CancelButtonType = {ButtonTypes.Danger}
                        //DoNotCloseAfterOk
                        //StartOpened
                        //DisableEntry
                        />
                </Column>
            </Row>
    );
}

export default TestModals;