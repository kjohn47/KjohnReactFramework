import { useContext } from 'react';
import { ModalContext } from '../../config/AppProvider';
import { ModalContextType } from './ModalContextInterfaces';

const useModalHandler = (): ModalContextType => {
    const modalContext = useContext(ModalContext);
    return {
        openModal: modalContext.openModal,
        closeModal: modalContext.closeModal
    }
}

export default useModalHandler;