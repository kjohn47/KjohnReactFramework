import React, { Suspense, useRef, useEffect, useCallback } from 'react';
import { ModalSize, ModalOverlay } from '../../logic/context/Modal/ModalContextEnum';
import useModalHandler from '../../logic/context/Modal/ModalContextHandler';
import { ModalIcons } from '../common/presentation/icons/modalIcons/ModalIcons';
import LanguageSelector from '../common/inputs/LanguageSelector';
import { getFocusableList, trapFocusInElements } from '../../logic/functions/misc';

const ModalWrapper: React.FC = ({children}) => {
    const {modal, closeModal} = useModalHandler();
    const modalRef = useRef<HTMLDivElement>(null);

    const focusModal = useCallback((event?: KeyboardEvent) => {
        if(modal && modalRef.current)
        {
            const focusable = getFocusableList(modalRef.current);
            if(focusable && focusable.length > 0)
            {
                if(!event)
                {
                    focusable[0].focus();
                }
                else {
                    trapFocusInElements(event, focusable);
                }
            }
        }
    }, [modal]);

    useEffect(() => {
            focusModal();   
            document.addEventListener('keydown', focusModal);
        return () => {
            document.removeEventListener('keydown', focusModal);
        }
    }, [focusModal]);

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
                    }
                        ref={modalRef}
                    >
                        {!modal.hideClose && <div tabIndex={0} onClick={() => closeModal(modal.id)} className = "ModalClose">X</div>}
                        {modal.icon !== undefined && <div className="Modal_Icon">
                            <Suspense fallback = {<></>}>
                                <div className = "Modal_Icon_Img">
                                    {ModalIcons[modal.icon]}
                                </div>
                            </Suspense>
                        </div>}
                        {modal.showLanguageSelector && <div className = {"Modal_Language" + (!modal.hideClose ? " Modal_Language_Close" : "")}>
                            <LanguageSelector />
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