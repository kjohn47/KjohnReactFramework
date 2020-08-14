import { useState } from 'react';
import { ModalContextType, IModalContext } from './ModalContextInterfaces';

const useModal = (): ModalContextType => {
    const [modalList, setModal] = useState<IModalContext[]>([]);
    const openModal = (modalParams: IModalContext): void => 
    {
        setModal((prevState) => [...prevState, modalParams]);
    }

    const closeModal = (id: string): void => 
    {
        if(modalList && modalList.length > 1)
        {
            let modalListReduced = modalList.filter(m => m.id !== id);
            setModal(modalListReduced);
        }
        else
            setModal([]);
    }

    const updateModal = (id: string, newModal: IModalContext): void => {
        if(modalList && modalList.length > 0)
        {
            let modalListTemp = [...modalList];
            modalListTemp[modalListTemp.findIndex(m => m.id === id)] = newModal;
            setModal(modalListTemp);
        }

    }

    return {
        modal: modalList.length > 0 ? modalList[modalList.length - 1] : undefined,
        openModal,
        closeModal,
        updateModal
    }
}

export default useModal;

export const defaultModalContext: ModalContextType = {
    modal: undefined,
    openModal: () => {},
    closeModal: () => {},
    updateModal: () => {}
}