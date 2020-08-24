import React, { useMemo } from 'react';
import Column from '../../structure/Column';
import Row from '../../structure/Row';
import { ModalComponentType } from '../../../../logic/context/Modal/ModalContextInterfaces';
import Button, { ButtonTypes } from '../../inputs/Button';
import { ModalSize } from '../../../../logic/context/Modal/ModalContextEnum';
import useTranslation from '../../../../logic/functions/getTranslation';

export interface IGenericModalProps {
    Title: string;
    TitleTranslationProcess?: string;
    Content?: React.ReactNode;
    Buttons?: IGenericModalButton[];
    Scrollable?: boolean;
    ModalId: string;
    Size?: ModalSize;
}

export interface IGenericModalButton {
    Text: string;
    Method?: () => void | (() => Promise<() => void>);
    CloseAfterMethod?: boolean;
    ButtonType: ButtonTypes;
    ButtonTranslationProcess?: string;
}

const GenericModal: React.FC<ModalComponentType<IGenericModalProps>> = ({
    Title, 
    TitleTranslationProcess,
    Content, 
    Buttons, 
    ModalId,
    Scrollable,
    close, 
    children,
    Size
}) => {
    const {getTranslation} = useTranslation();

    const modalSizeClass = useMemo(() => {
        let size = (Size === undefined || Size === ModalSize.Default) ? 
                        "_Default" 
                    : (Size === ModalSize.Small) ? 
                        "_Small" 
                    : (Size === ModalSize.Big) ?
                        "_Big"
                    :   "_Long"
        return size;
    }, [Size])

    const buttonHandle = (button: IGenericModalButton) => {
        if(!button.Method)
        {
            if(button.CloseAfterMethod)
            {
                close(ModalId);
            }
        }
        else
        {
            Promise.resolve(button.Method())
            .finally(() => {
                if(button.CloseAfterMethod)
                {
                    close(ModalId);
                }
            })
        }
    }

    return (
        <Row className = "Modal_Generic">
            <Column className = "Modal_Generic_Col">
                <Row className= {`Modal_Header Modal_Header${modalSizeClass}`}>
                    <Column>
                        {getTranslation((TitleTranslationProcess ? TitleTranslationProcess : "_modal"), Title)}
                    </Column>
                </Row>
                <Row className={`Modal_Content Modal_Content${modalSizeClass}` + (Buttons === undefined ? ` Modal_Content_NoFooter${modalSizeClass}` : "" ) + (Scrollable ? " Modal_Content_Scroll KRFScroll" : "")}>
                    <Column>
                        {Content ? Content : children}
                    </Column>
                </Row>
                {Buttons && <Row className = {`Modal_Footer Modal_Footer${modalSizeClass} Modal_Footer_Centered`}>
                    {
                        Buttons.map((button, index) => 
                        <Column key = {`btn_${index}`}>
                            <Button onClick={() => buttonHandle(button)} buttonType={button.ButtonType}>{getTranslation((button.ButtonTranslationProcess ? button.ButtonTranslationProcess : "_modal"), button.Text)}</Button>
                        </Column>
                        )
                    }
                </Row>}
            </Column>
        </Row>
    )
}

export default GenericModal;