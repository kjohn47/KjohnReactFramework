import { useState } from 'react';
import { ModalContextType, IModalContext } from './ModalContextInterfaces';

const useModal = (): ModalContextType => {
    const [modalList, setModal] = useState<IModalContext[] | undefined>(undefined);
    
    const openModal = (modalParams: IModalContext): void => 
    {
        if(modalList)
            setModal([...modalList, modalParams]);
        else
            setModal([modalParams]);
    }

    const closeModal = (): void => 
    {
        if(modalList && modalList.length > 1)
        {
            let modalListReduced = modalList.slice(0, modalList.length - 1);
            setModal(modalListReduced);
        }
        else
            setModal(undefined);
    }

    const updateModal = (modal: IModalContext, newModal: IModalContext): void => {
        if(modalList && modalList.length > 0)
        {
            let modalListTemp = [...modalList];
            modalListTemp[modalList.indexOf(modal)] = newModal;
            setModal(modalListTemp);
        }

    }

    let modal = modalList && modalList.length > 0 ? modalList[modalList.length - 1] : undefined;
    return {
        modal,
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