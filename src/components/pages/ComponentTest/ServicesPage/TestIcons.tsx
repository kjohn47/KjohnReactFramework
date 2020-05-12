import React from 'react';
import Column from '../../../common/structure/Column';
import Row from '../../../common/structure/Row';
import FieldSet from '../../../common/presentation/wrapper/FieldSet';
import { DownloadIcons, DownloadIconCode } from '../../../common/presentation/icons/downloadIcons/DownloadIcons';

const TestIcons: React.FC = () => {
    return (
        <Row>
            <Column>
                <FieldSet Title = "Download Icons">
                    <Row>
                        <Column>
                            {DownloadIcons[DownloadIconCode.Archive]}
                        </Column>
                        <Column>
                            {DownloadIcons[DownloadIconCode.Audio]}
                        </Column>
                        <Column>
                            {DownloadIcons[DownloadIconCode.Binary]}
                        </Column>
                        <Column>
                            {DownloadIcons[DownloadIconCode.Code]}
                        </Column>
                        <Column>
                            {DownloadIcons[DownloadIconCode.Doc]}
                        </Column>
                        <Column>
                            {DownloadIcons[DownloadIconCode.Img]}
                        </Column>
                        <Column>
                            {DownloadIcons[DownloadIconCode.Important]}
                        </Column>
                        <Column>
                            {DownloadIcons[DownloadIconCode.Pdf]}
                        </Column>
                        <Column>
                            {DownloadIcons[DownloadIconCode.Ppt]}
                        </Column>
                        <Column>
                            {DownloadIcons[DownloadIconCode.Txt]}
                        </Column>
                        <Column>
                            {DownloadIcons[DownloadIconCode.Unknown]}
                        </Column>
                        <Column>
                            {DownloadIcons[DownloadIconCode.Video]}
                        </Column>
                        <Column>
                            {DownloadIcons[DownloadIconCode.Xls]}
                        </Column>
                    </Row>
                </FieldSet>
            </Column>
        </Row>
    )
}

export default TestIcons;