import React, { useMemo, useCallback, useEffect } from 'react';
import useModalHandler from '../../../../logic/context/Modal/ModalContextHandler';
import GenericModal, { IGenericModalProps } from './GenericModal';
import Button, { ButtonTypes } from '../../inputs/Button';
import { ModalSize } from '../../../../logic/context/Modal/ModalContextEnum';

export enum YNModalType {
    YesNo,
    OkCancel,
    OkOnly
}

export interface IYNModalProps {
    OpenModalButton?: ButtonTypes;
    OpenModalText?: string;
    StartOpened?: boolean;
    YesMethod: () => void;
    NoMethod?: () => void;
    ShowIcon?: boolean;
    ModalType?: YNModalType;
    DisableEntry?: boolean;
    Title: string;
    Content: React.ReactNode;
    YesButtonType: ButtonTypes;
    NoButtonType?: ButtonTypes;
    DoNotCloseAfterYes?: boolean;
}

const YNModal: React.FC<IYNModalProps> = ({
    OpenModalButton,
    OpenModalText,
    StartOpened,
    Title,
    Content,
    DisableEntry,
    ShowIcon,
    ModalType,
    YesButtonType,
    NoButtonType,
    DoNotCloseAfterYes,
    YesMethod,
    NoMethod,
    children
}) => {
    const modalHandler = useModalHandler();
    const GenericModalProps = useMemo((): IGenericModalProps => {
        return {
            Title: Title,
            Content: Content,
            Buttons: [
                {
                    Text: "No",
                    ButtonType: NoButtonType ? NoButtonType : ButtonTypes.Cancelation,
                    Method: () => NoMethod ? NoMethod() : {},
                    CloseAfterMethod: true
                },
                {
                    Text: "Yes",
                    ButtonType: YesButtonType,
                    Method: () => YesMethod(),
                    CloseAfterMethod: !DoNotCloseAfterYes
                }
            ]
        }
    }, [Title, Content, YesButtonType, NoButtonType, YesMethod, NoMethod, DoNotCloseAfterYes]);

    const openModal = useCallback(() => {
        if(!DisableEntry)
        {
            modalHandler.openModal({
                Modal: GenericModal,
                modalProps: GenericModalProps,
                size: ModalSize.Small
            });
        }
        // eslint-disable-next-line
    }, [GenericModalProps, DisableEntry]);

    useEffect(() => {
        if(StartOpened)
        {
            openModal();
        }
        // eslint-disable-next-line
    }, [])

    return (
        OpenModalText ? 
            OpenModalButton ? 
                <Button buttonType = {OpenModalButton} onClick={() => openModal()} disabled = {DisableEntry}>{OpenModalText}</Button>
            : <span className = "pointer_cursor PageSelector_Highlight" onClick={() => openModal()}>{OpenModalText}</span>
        : children ? 
            <div className = "pointer_cursor" onClick={() => openModal()}>
                {children}
            </div>
        : null
    )
}

export default YNModal;