import React, { useContext } from 'react';
import { ModalContext } from '../../logic/config/AppProvider';
import { ModalSize, ModalOverlay } from '../../logic/context/Modal/ModalContextEnum';

const ModalWrapper: React.FC = ({children}) => {
    const {modal, closeModal} = useContext(ModalContext);
    return (
        <>
            {modal && modal.Modal ?
                <div className={"ModalWrapper" + (modal.overlayColor !== undefined && !(modal.overlayColor === ModalOverlay.Default) ? ` ${modal.overlayColor}` : "") }>
                    <div className = {"ModalContent" + ((modal.size !== undefined && !(modal.size === ModalSize.Default)) ? ` ${modal.size}` : "")}>
                        {!modal.hideClose && <div onClick={closeModal} className = "ModalClose">X</div>}
                        <modal.Modal close = {closeModal} {...modal.modalProps}/>
                    </div>
                </div>
            : null}
            {children}
        </>
    )
}

export default ModalWrapper;