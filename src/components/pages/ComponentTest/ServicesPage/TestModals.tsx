import React from 'react';
import Column, { ColumnNumber } from '../../../common/structure/Column';
import Row from '../../../common/structure/Row';
import { ButtonTypes } from '../../../common/inputs/Button';
import DialogModal, { DialogModalType } from '../../../common/presentation/modal/DialogModal';
import FieldSet from '../../../common/presentation/wrapper/FieldSet';
import Balloon, { BalloonColorEnum, BallonArrowEnum } from '../../../common/presentation/display/Balloon';
import { ModalSize } from '../../../../logic/context/Modal/ModalContextEnum';
import { ModalIconEnum } from '../../../common/presentation/icons/modalIcons/ModalIcons';

const TestModals: React.FC = () => {
    return (
            <Row className  ="ModalTest">
                <Column>
                    <DialogModal 
                        Title = "#(ModalTest1)" 
                        Content = "This is a Dialog Modal that open after mount. It has no entry point" 
                        OkButtonType = {ButtonTypes.Information}
                        OkMethod = {() => {console.log("Clicked Ok on Modal")}}
                        StartOpened
                        DisableEntry
                        ModalType={DialogModalType.OkOnly}
                        Icon = {ModalIconEnum.Warning}
                        Size = {ModalSize.Small}
                        ShowLanguageSelector
                    />
                    <DialogModal 
                        Title = "#(ModalTest2)" 
                        Content = "This is a Dialog Modal that open after mount. It has no entry point" 
                        OkButtonType = {ButtonTypes.Information}
                        OkMethod = {() => {console.log("Clicked Ok on Modal")}}
                        StartOpened
                        DisableEntry
                        ModalType={DialogModalType.OkOnly}
                        Size = {ModalSize.Small}
                        Icon = {ModalIconEnum.HumanGrp}
                        ShowLanguageSelector
                    />
                    <FieldSet Title="Dialog modals">
                        <Row>
                        <Column className = "ModalTest_Col" medium={ColumnNumber.C20}>
                                <DialogModal 
                                    Title = "Modal From Child Component" 
                                    Content = "This is a Dialog Modal that opened from a child Component" 
                                    OkButtonType = {ButtonTypes.Default}
                                    OkMethod = {() => {console.log("Clicked Ok on Modal")}}
                                    CancelMethod = {() => {console.log("Clicked Cancel on Modal")}}
                                    OpenModalButton = {ButtonTypes.Default}
                                    Size = {ModalSize.Small}
                                >
                                    <Balloon Color={BalloonColorEnum.Information} Title="Balloon" Arrow = {BallonArrowEnum.Bottom}>This Balloon will open modal on click</Balloon>
                                </DialogModal>
                            </Column>
                            <Column className = "ModalTest_Col" medium={ColumnNumber.C20}>
                                <DialogModal 
                                    Title = "Modal from link" 
                                    Content = "This is a Dialog Modal that open from link" 
                                    OkButtonType = {ButtonTypes.Confirmation}
                                    OkMethod = {() => {console.log("Clicked Ok on Modal")}}
                                    CancelMethod = {() => {console.log("Clicked Cancel on Modal")}}
                                    OpenModalText = "Open Dialog Modal From Link"
                                    Size = {ModalSize.Small}
                                />
                            </Column>
                            <Column className = "ModalTest_Col" medium={ColumnNumber.C20}>
                                <DialogModal 
                                    Title = "Modal From Button" 
                                    Content = "This is a Dialog Modal that open from button click" 
                                    OkButtonType = {ButtonTypes.Default}
                                    OkMethod = {() => {console.log("Clicked Ok on Modal")}}
                                    CancelMethod = {() => {console.log("Clicked Cancel on Modal")}}
                                    OpenModalText = "Open Dialog"
                                    OpenModalButton = {ButtonTypes.Default}
                                    Size = {ModalSize.Small}
                                />
                            </Column>
                        </Row>
                        <Row>
                            <Column className = "ModalTest_Col" medium={ColumnNumber.C20}>
                                <DialogModal 
                                    Title = "Modal Button Disabled" 
                                    Content = "This Modal is Disabled" 
                                    OkButtonType = {ButtonTypes.Default}
                                    OkMethod = {() => {console.log("Clicked Ok on Modal")}}
                                    OpenModalText = "Disabled Modal Entry"
                                    OpenModalButton = {ButtonTypes.Default}
                                    DisableEntry
                                />
                            </Column>
                            <Column className = "ModalTest_Col" medium={ColumnNumber.C20}>
                                <DialogModal 
                                    Title = "Modal Type Yes / No" 
                                    Content = "This Modal uses buttons Yes and No instead of Ok and Cancel" 
                                    OkButtonType = {ButtonTypes.Confirmation}
                                    OkMethod = {() => {console.log("Clicked Ok on Modal")}}
                                    CancelMethod = {() => {console.log("Clicked Cancel on Modal")}}
                                    OpenModalText = "Open Yes/No Modal"
                                    ModalType = {DialogModalType.YesNo}
                                    Size = {ModalSize.Small}
                                />
                            </Column>
                            <Column className = "ModalTest_Col" medium={ColumnNumber.C20}>
                                <DialogModal 
                                    Title = "Modal Type Ok only" 
                                    Content = "This Modal uses buttons only single Ok button" 
                                    OkButtonType = {ButtonTypes.Danger}
                                    OkMethod = {() => {console.log("Clicked Ok on Modal")}}
                                    OpenModalText = "Open Ok Only Modal"
                                    ModalType = {DialogModalType.OkOnly}
                                    Size = {ModalSize.Small}
                                />
                            </Column>
                        </Row>
                        <Row>
                            <Column className = "ModalTest_Col" medium={ColumnNumber.C20}>
                                <DialogModal 
                                    Title = "Modal Type Custom Buttons" 
                                    Content = "This Modal uses dinamic buttons"
                                    OpenModalText = "Custom Btn Modal"
                                    ModalType = {DialogModalType.CustomButtons}
                                    CustomButtonArray = {[
                                        {
                                            ButtonType: ButtonTypes.Information,
                                            Text: "Custom Btn 1",
                                            CloseAfterMethod: true,
                                            Method: () => {console.log("Clicked custom Btn 1")}
                                        },
                                        {
                                            ButtonType: ButtonTypes.Danger,
                                            Text: "Custom Btn 2",
                                            CloseAfterMethod: false,
                                            Method: () => {console.log("Clicked custom Btn 2")}
                                        },
                                        {
                                            ButtonType: ButtonTypes.Warning,
                                            Text: "Custom Btn 3",
                                            CloseAfterMethod: true,
                                            Method: () => {console.log("Clicked custom Btn 3")}
                                        }
                                    ]}
                                    Size = {ModalSize.Small}
                                />
                            </Column>
                            <Column className = "ModalTest_Col" medium={ColumnNumber.C20}>
                                <DialogModal 
                                    Title = "Modal Type Custom Buttons auto sizing" 
                                    Content = "This Modal uses dinamic buttons but has so many that size adapted :)"
                                    OpenModalText = "Custom Btn Modal +"
                                    ModalType = {DialogModalType.CustomButtons}
                                    CustomButtonArray = {[
                                        {
                                            ButtonType: ButtonTypes.Information,
                                            Text: "Custom Btn 1",
                                            CloseAfterMethod: true,
                                            Method: () => {console.log("Clicked custom Btn 1")}
                                        },
                                        {
                                            ButtonType: ButtonTypes.Danger,
                                            Text: "Custom Btn 2",
                                            CloseAfterMethod: false,
                                            Method: () => {console.log("Clicked custom Btn 2")}
                                        },
                                        {
                                            ButtonType: ButtonTypes.Warning,
                                            Text: "Custom Btn 3",
                                            CloseAfterMethod: true,
                                            Method: () => {console.log("Clicked custom Btn 3")}
                                        },
                                        {
                                            ButtonType: ButtonTypes.Cancelation,
                                            Text: "Custom Btn 4",
                                            CloseAfterMethod: false,
                                            Method: () => {console.log("Clicked custom Btn 4")}
                                        }
                                    ]}
                                />
                            </Column>
                            <Column className = "ModalTest_Col" medium={ColumnNumber.C20}>
                                <DialogModal 
                                    Title = "Modal With Scroll Content" 
                                    Content = {longText}
                                    OkButtonType = {ButtonTypes.Confirmation}
                                    OkMethod = {() => {console.log("Clicked Ok on Modal")}}
                                    OpenModalText = "Dialog Modal with scroll"
                                    Scrollable
                                    ModalType = {DialogModalType.OkOnly}
                                    Size = {ModalSize.Small}
                                />
                            </Column>
                        </Row>
                        <Row>
                            <Column className = "ModalTest_Col" medium={ColumnNumber.C20}>
                                <DialogModal 
                                    Title = "Modal size default/medium" 
                                    Content = {<h1>Text from h1 component.<br /> this is default size, dialog uses small size as default</h1>}
                                    OkButtonType = {ButtonTypes.Confirmation}
                                    OkMethod = {() => {console.log("Clicked Ok on Modal")}}
                                    OpenModalText = "Default Sizing"
                                    ModalType = {DialogModalType.OkOnly}
                                    Size = {ModalSize.Default}
                                />
                            </Column>
                            <Column className = "ModalTest_Col" medium={ColumnNumber.C20}>
                                <DialogModal 
                                    Title = "Modal size big" 
                                    Content = "This is a big dialog modal"
                                    OkButtonType = {ButtonTypes.Confirmation}
                                    OkMethod = {() => {console.log("Clicked Ok on Modal")}}
                                    OpenModalText = "Big Sizing"
                                    ModalType = {DialogModalType.OkOnly}
                                    Size = {ModalSize.Big}
                                />
                            </Column>
                            <Column className = "ModalTest_Col" medium={ColumnNumber.C20}>
                                <DialogModal 
                                    Title = "Modal size long" 
                                    Content = "This is a long dialog modal"
                                    OkButtonType = {ButtonTypes.Confirmation}
                                    OkMethod = {() => {console.log("Clicked Ok on Modal")}}
                                    OpenModalText = "Long Sizing"
                                    ModalType = {DialogModalType.OkOnly}
                                    Size = {ModalSize.Long}
                                />
                            </Column>
                        </Row>
                    </FieldSet>
                </Column>
            </Row>
    );
}

export default TestModals;

const longText = "This is a Dialog Modal has a long text so it has scroll flag enabled. "
+ "The text is so long it was stored on a constant outside :) check it out "
+ "all this configurations available for the modals, open a modal and change window dimension "
+ "the dialog will adapt to the width of the page. It has yet some stuff that might need to "
+ "be solved but sort of works correctly. The system also updates the language of the modal automatically "
+ "but for doing it, the modal needs to be able to change language. The system also allows to pile modals in "
+ "opening order and when closing you will pass by them on reverse order since they are stored on one array. "
+ "The modals use a specific hook and context to be displayed so it is on top layer of the layout and it "
+ "will make the possibility to use z-index on all application without having the problem of overlay and "
+ "modal be under other component div. This could happen if it was not on most top layer. This app has "
+ "z-index setted on menu and footer so it would not cover them. Side Menu component also has z-index on it's " 
+ "menu and same problem would happen when using the modal. The modal also allows it's content to be a component "
+ "so it is possible to make custom interior for the modal box. Awesome isn't it? :)"