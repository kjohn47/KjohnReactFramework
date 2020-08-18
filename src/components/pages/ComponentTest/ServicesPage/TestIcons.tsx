import React from 'react';
import Column from '../../../common/structure/Column';
import Row from '../../../common/structure/Row';
import FieldSet from '../../../common/presentation/wrapper/FieldSet';
import { DownloadIcons } from '../../../common/presentation/icons/downloadIcons/DownloadIcons';
import { IconCode } from '../../../../logic/functions/getExtensionIcon';
import { ModalIcons, ModalIconEnum } from '../../../common/presentation/icons/modalIcons/ModalIcons';

const TestIcons: React.FC = () => {
    return (
        <Row>
            <Column>
                <FieldSet Title = "Download Icons">
                    <Row>
                        <Column>
                            {DownloadIcons[IconCode.Archive]}
                        </Column>
                        <Column>
                            {DownloadIcons[IconCode.Audio]}
                        </Column>
                        <Column>
                            {DownloadIcons[IconCode.Binary]}
                        </Column>
                        <Column>
                            {DownloadIcons[IconCode.Code]}
                        </Column>
                        <Column>
                            {DownloadIcons[IconCode.Doc]}
                        </Column>
                        <Column>
                            {DownloadIcons[IconCode.Img]}
                        </Column>
                        <Column>
                            {DownloadIcons[IconCode.Important]}
                        </Column>
                        <Column>
                            {DownloadIcons[IconCode.Pdf]}
                        </Column>
                        <Column>
                            {DownloadIcons[IconCode.Ppt]}
                        </Column>
                        <Column>
                            {DownloadIcons[IconCode.Txt]}
                        </Column>
                        <Column>
                            {DownloadIcons[IconCode.Unknown]}
                        </Column>
                        <Column>
                            {DownloadIcons[IconCode.Video]}
                        </Column>
                        <Column>
                            {DownloadIcons[IconCode.Xls]}
                        </Column>
                    </Row>
                </FieldSet>
                <FieldSet Title="Modal Icons">
                    <Row>
                        <Column>
                            {ModalIcons[ModalIconEnum.Danger]}
                        </Column>
                        <Column>
                            {ModalIcons[ModalIconEnum.Warning]}
                        </Column>
                        <Column>
                            {ModalIcons[ModalIconEnum.Stop]}
                        </Column>
                        <Column>
                            {ModalIcons[ModalIconEnum.Forbidden]}
                        </Column>
                        <Column>
                            {ModalIcons[ModalIconEnum.Error]}
                        </Column>
                        <Column>
                            {ModalIcons[ModalIconEnum.Human]}
                        </Column>
                        <Column>
                            {ModalIcons[ModalIconEnum.HumanGrp]}
                        </Column>
                    </Row>
                </FieldSet>
            </Column>
        </Row>
    )
}

export default TestIcons;