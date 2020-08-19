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

export interface INeededCookie {
    CookieKey: string;
    CookieDescription: string;
}

export interface INeededCookieModal {
    Description: string;
    Title: string;
    Cookies: INeededCookie[];
}

const CookieModalDescription: React.FC<{Cookies: INeededCookie[]}> = ({Cookies, children}) => {
    const {getTranslation} = useTranslation();

    return <>
        <Row>
            <Column>
                {children}
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
    const {AllowCookies} = useAppHandler();
    const {getTranslation} = useTranslation();

    return <DialogModal 
                Title={getTranslation("_cookieModal", Title)} 
                Icon={ModalIconEnum.Cookie} 
                DisableEntry 
                Content={<CookieModalDescription Cookies = {Cookies}>{getTranslation("_cookieModal", Description)}</CookieModalDescription>}
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