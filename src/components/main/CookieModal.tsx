import React from 'react';
import DialogModal, { DialogModalType } from '../common/presentation/modal/DialogModal';
import { ModalIconEnum } from '../common/presentation/icons/modalIcons/ModalIcons';
import { ModalSize } from '../../logic/context/Modal/ModalContextEnum';
import { ButtonTypes } from '../common/inputs/Button';
import useTranslation from '../../logic/functions/getTranslation';
import useAppHandler from '../../logic/context/App/AppContextHandler';
import Column from '../common/structure/Column';
import Row from '../common/structure/Row';
import Table, { ITableCell } from '../common/presentation/display/Table';
import useLoginHandler from '../../logic/context/Login/LoginContextHandler';

export interface INeededCookie {
    CookieKey: string;
    CookieDescription: string;
}

export interface INeededCookieModal {
    Description: string;
    Title?: string;
    Cookies: INeededCookie[];
}

const CookieModalDescription: React.FC<{Cookies: INeededCookie[], Description: string}> = ({Cookies, Description}) => {
    const {getTranslation} = useTranslation();

    return <>
        <Row className="CookieModalDescription">
            <Column>
                {getTranslation("_cookieModal", Description)}
            </Column>
        </Row>
        <Row>
            <Column>{Cookies && Cookies.length > 0 &&
                <Table
                    hideScroll
                    header = {[
                        getTranslation("_cookieModal","#(CookieKey)"),
                        getTranslation("_cookieModal","#(CookieDescription)")
                    ]}
                    rows = {
                        [...Cookies.map((cookie): ITableCell[] => {
                            return [
                                    {
                                        text: cookie.CookieKey
                                    },
                                    {
                                        text: getTranslation("_cookieModal", cookie.CookieDescription)
                                    }
                                ]
                            })
                        ]
                    }
                />}
            </Column>
        </Row>
    </>
}

const CookieModal: React.FC<INeededCookieModal> = ({Title, Description, Cookies}) => {
    const {App, AllowCookies} = useAppHandler();
    const {Login} = useLoginHandler();

    return (
        App.allowCookies !== undefined  && ( ( !Login && App.allowCookies === false ) || ( Login && Login.allowCookies === undefined ) ) ?
            <DialogModal 
                Title={Title? Title : "#(CookiesModal)"} 
                TitleTranslationProcess="_cookieModal"
                Icon={ModalIconEnum.Cookie} 
                DisableEntry 
                Content={<CookieModalDescription Cookies = {Cookies} Description = {Description}/>}
                StartOpened 
                Size={ModalSize.Default} 
                Scrollable 
                ModalType={DialogModalType.YesNo}
                OkButtonType={ButtonTypes.Confirmation}
                CancelButtonType={ButtonTypes.Cancelation}
                OkMethod={() => AllowCookies(true)}
                CancelMethod={() => AllowCookies(false)}
                HideCloseCross
                ShowLanguageSelector>
            </DialogModal>
            : null 
        )
}
export default CookieModal;