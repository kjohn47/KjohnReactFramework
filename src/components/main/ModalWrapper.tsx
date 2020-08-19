import React, { Suspense } from 'react';
import { ModalSize, ModalOverlay } from '../../logic/context/Modal/ModalContextEnum';
import useModalHandler from '../../logic/context/Modal/ModalContextHandler';
import { ModalIcons } from '../common/presentation/icons/modalIcons/ModalIcons';
import useAppHandler from '../../logic/context/App/AppContextHandler';
import CookieModal, { INeededCookieModal } from './CookieModal';
import useLoginHandler from '../../logic/context/Login/LoginContextHandler';

export interface IModalWrapper {
    CookieModalSettings?: INeededCookieModal;
}

const ModalWrapper: React.FC<IModalWrapper> = ({children, CookieModalSettings}) => {
    const {modal, closeModal} = useModalHandler();
    const {App} = useAppHandler();
    const {Login} = useLoginHandler();
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
                            <Suspense fallback = {<></>}>
                                <div className = "Modal_Icon_Img">
                                    {ModalIcons[modal.icon]}
                                </div>
                            </Suspense>
                        </div>}
                        <modal.Modal close = {closeModal} {...modal.modalProps}/>
                    </div>
                </div>
            : null}
            {App.allowCookies !== undefined && CookieModalSettings ?
                 ( ( !Login && App.allowCookies === false ) || ( Login && Login.allowCookies === undefined ) ) && <CookieModal {...CookieModalSettings}/>
                : null}
            {children}
        </>
    )
}

export default ModalWrapper;