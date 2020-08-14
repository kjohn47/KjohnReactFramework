import React from 'react';
import { ModalSize, ModalOverlay } from '../../logic/context/Modal/ModalContextEnum';
import useModalHandler from '../../logic/context/Modal/ModalContextHandler';

const ModalWrapper: React.FC = ({children}) => {
    const {modal, closeModal} = useModalHandler();
    return (
        <>
            {modal && modal.Modal ?
                <div className={"ModalWrapper" + (modal.overlayColor !== undefined && !(modal.overlayColor === ModalOverlay.Default) ? ` ${modal.overlayColor}` : "") }>
                    <div className = {
                            "ModalContent" + 
                            ( ( modal.size !== undefined && modal.size !== ModalSize.Default ) ?
                                ` ${modal.size}` + 
                                ( modal.icon !== undefined ? 
                                    ` ${modal.size}_Icon` 
                                    : "") 
                            : ( modal.icon !== undefined ?
                                " ModalContent_Icon" 
                                : "" ) )
                    }>
                        {!modal.hideClose && <div onClick={() => closeModal(modal.id)} className = "ModalClose">X</div>}
                        {modal.icon !== undefined && <div className="Modal_Icon">
                            <div className = "Modal_Icon_Img">
                                IMG
                            </div>
                        </div>}
                        <modal.Modal close = {closeModal} {...modal.modalProps}/>
                    </div>
                </div>
            : null}
            {children}
        </>
    )
}

export default ModalWrapper;