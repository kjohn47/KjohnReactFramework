import React, { useMemo, useCallback, useEffect } from 'react';
import useModalHandler from '../../../../logic/context/Modal/ModalContextHandler';
import GenericModal, { IGenericModalProps, IGenericModalButton } from './GenericModal';
import Button, { ButtonTypes } from '../../inputs/Button';
import { ModalSize } from '../../../../logic/context/Modal/ModalContextEnum';
import useTranslation from '../../../../logic/functions/getTranslation';
import useAppLanguageHandler from '../../../../logic/context/App/AppLanguageContextHandler';

export enum YNModalType {
    YesNo,
    OkCancel,
    OkOnly,
    CustomButtons
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
    Size?: ModalSize;
    Scrollable?: boolean;
    CustomButtonArray?: IGenericModalButton[];
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
    Size,
    Scrollable,
    CustomButtonArray,
    YesMethod,
    NoMethod,
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
            Buttons: ModalType === YNModalType.CustomButtons ? CustomButtonArray : 
            ModalType === YNModalType.OkOnly ? [
                {
                    Text: getTranslation("_modal", "#(Ok)"),
                    ButtonType: YesButtonType,
                    Method: YesMethod,
                    CloseAfterMethod: !DoNotCloseAfterYes
                }
            ] :
            [
                {
                    Text: getTranslation("_modal", ( ModalType && ModalType === YNModalType.OkCancel ) ? "#(Cancel)": "#(No)"),
                    ButtonType: NoButtonType ? NoButtonType : ButtonTypes.Cancelation,
                    Method: NoMethod ? NoMethod : () => {},
                    CloseAfterMethod: true
                },
                {
                    Text: getTranslation("_modal", ( ModalType && ModalType === YNModalType.OkCancel ) ? "#(Ok)": "#(Yes)"),
                    ButtonType: YesButtonType,
                    Method: YesMethod,
                    CloseAfterMethod: !DoNotCloseAfterYes
                }
            ]
        }
    }, [Title, 
        Content, 
        YesButtonType, 
        NoButtonType, 
        YesMethod, 
        NoMethod, 
        DoNotCloseAfterYes, 
        Scrollable,
        ModalType,
        CustomButtonArray,
        getTranslation]);

    const openHandler = useCallback(() => {
        if(!DisableEntry)
        {
            openModal({
                Modal: GenericModal,
                modalProps: GenericModalProps,
                size: Size ? Size : ModalSize.Small
            });
        }
        // eslint-disable-next-line
    }, [GenericModalProps, DisableEntry, Size]);

    useEffect(() => {
        if(StartOpened)
        {
            openHandler();
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(modal)
            updateModal(modal, {
                Modal: GenericModal,
                modalProps: GenericModalProps,
                size: Size ? Size : ModalSize.Small
            });
        // eslint-disable-next-line
    }, [appLanguage])

    return (
        OpenModalText ? 
            OpenModalButton ? 
                <Button buttonType = {OpenModalButton} onClick={() => openHandler()} disabled = {DisableEntry}>{OpenModalText}</Button>
            : <span className = "pointer_cursor PageSelector_Highlight" onClick={() => openHandler()}>{OpenModalText}</span>
        : children ? 
            <div className = "pointer_cursor" onClick={() => openHandler()}>
                {children}
            </div>
        : null
    )
}

export default YNModal;