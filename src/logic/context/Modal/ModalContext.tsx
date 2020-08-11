import { useState } from 'react';
import { ModalContextType, IModalContext } from './ModalContextInterfaces';

const useModal = (): ModalContextType => {
    const [modal, setModal] = useState<IModalContext | undefined>(undefined);
    
    const openModal = (modalParams: IModalContext): void => 
    {
        setModal(modalParams);
    }

    const closeModal = (): void => 
    {
        setModal(undefined);
    }

    return {
        modal,
        openModal,
        closeModal
    }
}

export default useModal;

export const defaultModalContext: ModalContextType = {
    modal: undefined,
    openModal: () => {},
    closeModal: () => {}
}