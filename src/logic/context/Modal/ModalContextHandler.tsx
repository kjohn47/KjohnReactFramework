import { useContext } from 'react';
import { ModalContext } from '../../config/AppProvider';

const useModalHandler = () => {
    const modalContext = useContext(ModalContext);
    return { ...modalContext }
}

export default useModalHandler;