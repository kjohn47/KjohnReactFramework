import React from 'react';
import Column from '../../../common/structure/Column';
import Row from '../../../common/structure/Row';
import { ButtonTypes } from '../../../common/inputs/Button';
import YNModal from '../../../common/presentation/modal/YNModal';

const TestModals: React.FC = () => {
    return (
            <Row>
                <Column>
                    <YNModal 
                        Title = "Y/N Modal" 
                        Content = "This is a Y/N Modal Type" 
                        YesButtonType = {ButtonTypes.Confirmation}
                        YesMethod = {() => {console.log("Clicked Yes on Modal")}}
                        NoMethod = {() => {console.log("Clicked No on Modal")}}
                        OpenModalText = "Open Yes/No Modal"
                        //OpenModalButton = {ButtonTypes.Default}
                        //NoButtonType = {ButtonTypes.Danger}
                        //DoNotCloseAfterYes
                        //StartOpened
                        //DisableEntry
                        />
                </Column>
            </Row>
    );
}

export default TestModals;