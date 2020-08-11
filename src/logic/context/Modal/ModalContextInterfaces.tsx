import React from 'react';
import { ModalSize, ModalOverlay } from './ModalContextEnum';

export interface IModalContext {
    Modal: React.ComponentType<ModalComponentType<any>>;
    modalProps?: any;
    overlayColor?: ModalOverlay;
    hideClose?: boolean;
    size?: ModalSize;
}

export type ModalContextType = {
    modal?: IModalContext;
    openModal: (modalParams: IModalContext) => void;
    closeModal: () => void;
}

export type ModalComponentType<T> = T & {
    close: () => void;
}