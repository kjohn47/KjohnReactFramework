import React from 'react';
import { ModalSize, ModalOverlay } from './ModalContextEnum';

export interface IModalContext {
    Modal: React.ComponentType<ModalComponentType<any>>;
    modalProps?: any;
    overlayColor?: ModalOverlay;
    hideClose?: boolean;
    size?: ModalSize;
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