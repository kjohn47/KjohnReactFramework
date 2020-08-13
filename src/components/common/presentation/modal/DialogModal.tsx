import React, { useMemo, useCallback, useEffect } from 'react';
import useModalHandler from '../../../../logic/context/Modal/ModalContextHandler';
import GenericModal, { IGenericModalProps, IGenericModalButton } from './GenericModal';
import Button, { ButtonTypes } from '../../inputs/Button';
import { ModalSize } from '../../../../logic/context/Modal/ModalContextEnum';
import useTranslation from '../../../../logic/functions/getTranslation';
import useAppLanguageHandler from '../../../../logic/context/App/AppLanguageContextHandler';

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
    OkMethod: () => void;
    CancelMethod?: () => void;
    ShowIcon?: boolean;
    ModalType?: DialogModalType;
    DisableEntry?: boolean;
    Title: string;
    Content: React.ReactNode;
    OkButtonType: ButtonTypes;
    CancelButtonType?: ButtonTypes;
    DoNotCloseAfterOk?: boolean;
    Size?: ModalSize;
    Scrollable?: boolean;
    CustomButtonArray?: IGenericModalButton[];
}

const DialogModal: React.FC<IDialogModalProps> = ({
    OpenModalButton,
    OpenModalText,
    StartOpened,
    Title,
    Content,
    DisableEntry,
    ShowIcon,
    ModalType,
    OkButtonType,
    CancelButtonType,
    DoNotCloseAfterOk,
    Size,
    Scrollable,
    CustomButtonArray,
    OkMethod,
    CancelMethod,
    children
}) => {
    const {modal, openModal, updateModal} = useModalHandler();
    const {getTranslation} = useTranslation();
    const {appLanguage} = useAppLanguageHandler();
    const GenericModalProps = useMemo((): IGenericModalProps => {
        return {
            Title: Title,
            Content: Content,
            Scrollable: Scrollable,
            Buttons: ModalType === DialogModalType.CustomButtons ? 
                            CustomButtonArray ? 
                                CustomButtonArray.slice(0, 6) 
                                : undefined
                            : ModalType === DialogModalType.OkOnly ? [
                                {
                                    Text: getTranslation("_modal", "#(Ok)"),
                                    ButtonType: OkButtonType,
                                    Method: OkMethod,
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
                                    ButtonType: OkButtonType,
                                    Method: OkMethod,
                                    CloseAfterMethod: !DoNotCloseAfterOk
                                }
                            ]
        }
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
        getTranslation]);

    const newModal = useMemo(() => {
        return {
            Modal: GenericModal,
            modalProps: GenericModalProps,
            size: Size ? 
                    Size 
                    : ( ModalType && ModalType === DialogModalType.CustomButtons && CustomButtonArray ) ?
                        CustomButtonArray.length > 4 ? 
                            ModalSize.Long 
                            : CustomButtonArray.length > 3 ? 
                                ModalSize.Default
                                : ModalSize.Small
                        : ModalSize.Small
        }
        // eslint-disable-next-line
    }, [GenericModalProps, 
        Size, 
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
            updateModal(modal, newModal);
        // eslint-disable-next-line
    }, [appLanguage])

    return (
        OpenModalText ? 
            OpenModalButton ? 
                <Button buttonType = {OpenModalButton} onClick={() => openHandler()} disabled = {DisableEntry}>{OpenModalText}</Button>
            : <span className = {DisableEntry ? undefined : "pointer_cursor PageSelector_Highlight"} onClick={() => openHandler()}>{OpenModalText}</span>
        : children ? 
            <div className = {DisableEntry ? undefined : "pointer_cursor"} onClick={() => openHandler()}>
                {children}
            </div>
        : null
    )
}

export default DialogModal;