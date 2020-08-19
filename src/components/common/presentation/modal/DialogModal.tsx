import React, { useMemo, useCallback, useEffect } from 'react';
import useModalHandler from '../../../../logic/context/Modal/ModalContextHandler';
import GenericModal, { IGenericModalProps, IGenericModalButton } from './GenericModal';
import Button, { ButtonTypes } from '../../inputs/Button';
import { ModalSize } from '../../../../logic/context/Modal/ModalContextEnum';
import useTranslation from '../../../../logic/functions/getTranslation';
import useAppLanguageHandler from '../../../../logic/context/App/AppLanguageContextHandler';
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
    const {modal, openModal, updateModal} = useModalHandler();
    const {getTranslation} = useTranslation();
    const {appLanguage} = useAppLanguageHandler();
    const modalId = useMemo(() => generateModalId(), []);
    const GenericModalProps = useMemo((): IGenericModalProps => {
        return {
            Title: Title,
            Content: Content,
            Scrollable: Scrollable,
            Size: Size,
            ShowLanguageSelector: ShowLanguageSelector,
            ModalId: modalId,
            Buttons: ModalType === DialogModalType.CustomButtons ? 
                            CustomButtonArray ? 
                                CustomButtonArray.slice(0, 6) 
                                : undefined
                            : ModalType === DialogModalType.OkOnly ? [
                                {
                                    Text: getTranslation("_modal", "#(Ok)"),
                                    ButtonType: OkButtonType ? OkButtonType : ButtonTypes.Default,
                                    Method: OkMethod ? OkMethod : () => {},
                                    CloseAfterMethod: !DoNotCloseAfterOk
                                }
                            ] 
                            : [
                                {
                                    Text: getTranslation("_modal", ( ModalType && ModalType === DialogModalType.YesNo ) ? "#(No)": "#(Cancel)"),
                                    ButtonType: CancelButtonType ? CancelButtonType : ButtonTypes.Cancelation,
                                    Method: CancelMethod ? CancelMethod : () => {},
                                    CloseAfterMethod: true
                                },
                                {
                                    Text: getTranslation("_modal", ( ModalType && ModalType === DialogModalType.YesNo ) ? "#(Yes)": "#(Ok)"),
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
        ShowLanguageSelector,
        getTranslation]);

    const newModal: IModalContext = useMemo(() => {
        return {
            Modal: GenericModal,
            id: modalId,
            modalProps: GenericModalProps,
            icon: Icon,
            hideClose: HideCloseCross,
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

    useEffect(() => {
        if(modal)
            updateModal(modalId, newModal);
        // eslint-disable-next-line
    }, [appLanguage])

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