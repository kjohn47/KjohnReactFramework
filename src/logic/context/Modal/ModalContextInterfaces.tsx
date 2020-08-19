import React from 'react';
import { ModalSize, ModalOverlay } from './ModalContextEnum';
import { ModalIconEnum } from '../../../components/common/presentation/icons/modalIcons/ModalIcons';

export interface IModalContext {
    Modal: React.ComponentType<ModalComponentType<any>>;
    modalProps?: any;
    overlayColor?: ModalOverlay;
    hideClose?: boolean;
    size?: ModalSize;
    icon?: ModalIconEnum;
    showLanguageSelector?: boolean;
    id: string;
}

export type ModalContextType = {
    modal?: IModalContext;
    openModal: (modalParams: IModalContext) => void;
    closeModal: (id: string) => void;
    updateModal: (id: string, newModal: IModalContext) => void;
}

export type ModalComponentType<T> = T & {
    close: (id: string) => void;
}