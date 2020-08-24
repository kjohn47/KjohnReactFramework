import React, { useMemo, useCallback, useEffect } from 'react';
import useModalHandler from '../../../../logic/context/Modal/ModalContextHandler';
import GenericModal, { IGenericModalProps, IGenericModalButton } from './GenericModal';
import Button, { ButtonTypes } from '../../inputs/Button';
import { ModalSize } from '../../../../logic/context/Modal/ModalContextEnum';
import { generateModalId } from '../../../../logic/functions/misc';
import { ModalIconEnum } from '../icons/modalIcons/ModalIcons';
import { IModalContext } from '../../../../logic/context/Modal/ModalContextInterfaces';

export enum DialogModalType {
    OkCancel,
    YesNo,   
    OkOnly,
    CustomButtons
}

export interface IDialogModalProps {
    OpenModalButton?: ButtonTypes;
    OpenModalText?: string;
    StartOpened?: boolean;
    OkMethod?: () => void;
    CancelMethod?: () => void;
    Icon?: ModalIconEnum;
    ModalType?: DialogModalType;
    DisableEntry?: boolean;
    Title: string;
    TitleTranslationProcess?: string;
    Content: React.ReactNode;
    OkButtonType?: ButtonTypes;
    CancelButtonType?: ButtonTypes;
    DoNotCloseAfterOk?: boolean;
    Size?: ModalSize;
    Scrollable?: boolean;
    CustomButtonArray?: IGenericModalButton[];
    HideCloseCross?: boolean;
    ShowLanguageSelector?: boolean;
}

const DialogModal: React.FC<IDialogModalProps> = ({
    OpenModalButton,
    OpenModalText,
    StartOpened,
    Title,
    TitleTranslationProcess,
    Content,
    DisableEntry,
    Icon,
    ModalType,
    OkButtonType,
    CancelButtonType,
    DoNotCloseAfterOk,
    Size,
    Scrollable,
    CustomButtonArray,
    OkMethod,
    CancelMethod,
    HideCloseCross,
    ShowLanguageSelector,
    children
}) => {
    const {openModal} = useModalHandler();
    const modalId = useMemo(() => generateModalId(), []);
    const GenericModalProps = useMemo((): IGenericModalProps => {
        return {
            Title: Title,
            TitleTranslationProcess: TitleTranslationProcess,
            Content: Content,
            Scrollable: Scrollable,
            Size: Size,
            ModalId: modalId,
            Buttons: ModalType === DialogModalType.CustomButtons ? 
                            CustomButtonArray ? 
                                CustomButtonArray.slice(0, 6) 
                                : undefined
                            : ModalType === DialogModalType.OkOnly ? [
                                {
                                    Text: "#(Ok)",
                                    ButtonType: OkButtonType ? OkButtonType : ButtonTypes.Default,
                                    Method: OkMethod ? OkMethod : () => {},
                                    CloseAfterMethod: !DoNotCloseAfterOk
                                }
                            ] 
                            : [
                                {
                                    Text: ( ModalType && ModalType === DialogModalType.YesNo ) ? "#(No)": "#(Cancel)",
                                    ButtonType: CancelButtonType ? CancelButtonType : ButtonTypes.Cancelation,
                                    Method: CancelMethod ? CancelMethod : () => {},
                                    CloseAfterMethod: true
                                },
                                {
                                    Text: ( ModalType && ModalType === DialogModalType.YesNo ) ? "#(Yes)": "#(Ok)",
                                    ButtonType: OkButtonType ? OkButtonType : ButtonTypes.Default,
                                    Method: OkMethod ? OkMethod : () => {},
                                    CloseAfterMethod: !DoNotCloseAfterOk
                                }
                            ]
        }
        // eslint-disable-next-line
    }, [Title, 
        Content, 
        OkButtonType, 
        CancelButtonType, 
        OkMethod, 
        CancelMethod, 
        DoNotCloseAfterOk, 
        Scrollable,
        ModalType,
        CustomButtonArray,
        TitleTranslationProcess]);

    const newModal: IModalContext = useMemo(() => {
        return {
            Modal: GenericModal,
            id: modalId,
            modalProps: GenericModalProps,
            icon: Icon,
            hideClose: HideCloseCross,
            showLanguageSelector: ShowLanguageSelector,
            size: Size !== undefined ? 
                    Size 
                    : ( ModalType && ModalType === DialogModalType.CustomButtons && CustomButtonArray && CustomButtonArray.length > 4 ) ?
                        ModalSize.Long
                        : ModalSize.Default
        }
        // eslint-disable-next-line
    }, [GenericModalProps, 
        Size, 
        Icon,
        HideCloseCross,
        ModalType, 
        ShowLanguageSelector,
        CustomButtonArray])

    const openHandler = useCallback(() => {
        if(!DisableEntry)
        {
            openModal(newModal);
        }
        // eslint-disable-next-line
    }, [newModal, DisableEntry]);

    useEffect(() => {
        if(StartOpened)
        {
            openModal(newModal);
        }
        // eslint-disable-next-line
    }, [])

    return (
        OpenModalText ? 
            OpenModalButton ? 
                <Button buttonType = {OpenModalButton} onClick={() => openHandler()} disabled = {DisableEntry}>{OpenModalText}</Button>
            : <div><span className = {DisableEntry ? undefined : "pointer_cursor PageSelector_Highlight"} onClick={() => openHandler()}>{OpenModalText}</span></div>
        : children ? 
            <div className = {DisableEntry ? undefined : "pointer_cursor"} onClick={() => openHandler()}>
                {children}
            </div>
        : null
    )
}

export default DialogModal;