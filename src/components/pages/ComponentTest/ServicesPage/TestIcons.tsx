import React from 'react';
import Column from '../../../common/structure/Column';
import Row from '../../../common/structure/Row';
import FieldSet from '../../../common/presentation/wrapper/FieldSet';
import { DownloadIcons, FileDownloaderIcon } from '../../../common/presentation/download/DownloadIcons';

const TestIcons: React.FC = () => {
    return (
        <Row>
            <Column>
                <FieldSet Title = "Download Icons">
                    <Row>
                        <Column>
                            {DownloadIcons[FileDownloaderIcon.Archive]}
                        </Column>
                        <Column>
                            {DownloadIcons[FileDownloaderIcon.Audio]}
                        </Column>
                        <Column>
                            {DownloadIcons[FileDownloaderIcon.Binary]}
                        </Column>
                        <Column>
                            {DownloadIcons[FileDownloaderIcon.Code]}
                        </Column>
                        <Column>
                            {DownloadIcons[FileDownloaderIcon.Doc]}
                        </Column>
                        <Column>
                            {DownloadIcons[FileDownloaderIcon.Img]}
                        </Column>
                        <Column>
                            {DownloadIcons[FileDownloaderIcon.Important]}
                        </Column>
                        <Column>
                            {DownloadIcons[FileDownloaderIcon.Pdf]}
                        </Column>
                        <Column>
                            {DownloadIcons[FileDownloaderIcon.Ppt]}
                        </Column>
                        <Column>
                            {DownloadIcons[FileDownloaderIcon.Txt]}
                        </Column>
                        <Column>
                            {DownloadIcons[FileDownloaderIcon.Unknown]}
                        </Column>
                        <Column>
                            {DownloadIcons[FileDownloaderIcon.Video]}
                        </Column>
                        <Column>
                            {DownloadIcons[FileDownloaderIcon.Xls]}
                        </Column>
                    </Row>
                </FieldSet>
            </Column>
        </Row>
    )
}

export default TestIcons;