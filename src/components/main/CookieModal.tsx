import React from 'react';
import DialogModal, { DialogModalType } from '../common/presentation/modal/DialogModal';
import { ModalIconEnum } from '../common/presentation/icons/modalIcons/ModalIcons';
import { ModalSize } from '../../logic/context/Modal/ModalContextEnum';
import { ButtonTypes } from '../common/inputs/Button';
import useTranslation from '../../logic/functions/getTranslation';
import useAppHandler from '../../logic/context/App/AppContextHandler';

export interface INeededCookie {
    CookieKey: string;
    CookieDescription: string;
}

export interface INeededCookieModal {
    Description: string;
    Title: string;
    Cookies: INeededCookie[];
}

const CookieModal: React.FC<INeededCookieModal> = ({Title, Description, Cookies}) => {
    const {AllowCookies} = useAppHandler();
    const {getTranslation} = useTranslation();

    return <DialogModal 
                Title={getTranslation("_cookieModal", Title)} 
                Icon={ModalIconEnum.Cookie} 
                DisableEntry 
                Content={getTranslation("_cookieModal", Description)}
                StartOpened 
                Size={ModalSize.Default} 
                Scrollable 
                ModalType={DialogModalType.YesNo}
                OkButtonType={ButtonTypes.Confirmation}
                CancelButtonType={ButtonTypes.Cancelation}
                OkMethod={() => AllowCookies(true)}
                CancelMethod={() => AllowCookies(false)}
                HideCloseCross>
            </DialogModal>
}
export default CookieModal;