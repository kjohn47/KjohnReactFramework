import React from 'react';
import Column from '../../../common/structure/Column';
import Row from '../../../common/structure/Row';
import FileDownloaderList from '../../../common/presentation/download/FileDownloaderList';
import FieldSet from '../../../common/presentation/wrapper/FieldSet';
import { IconCode, getIconCodeFromExtension } from '../../../../logic/functions/getExtensionIcon';
import { DocumentsDownloadSrvEnum } from '../../../../logic/config/pageComponents';

const TestFileDownloader: React.FC = () => {
    return (
        <Row>
            <Column>
            <FieldSet Title = "Single column list">
                <FileDownloaderList 
                    fileList = { [
                        {
                            fileName: "Test File 1",
                            fileIcon: IconCode.Unknown,
                            progressBar: true,
                            downloaderData: {
                                documentId: DocumentsDownloadSrvEnum.File,
                                documentPath: DocumentsDownloadSrvEnum.Action,
                                serviceUrl: DocumentsDownloadSrvEnum.Service,
                                loadProgress: true
                            },
                            fileSize: 100254,
                            bottomLine: true
                        },
                        {
                            fileName: "Test File 2",
                            fileIcon: getIconCodeFromExtension("doc"),
                            progressBar: true,
                            downloaderData: {
                                documentId: DocumentsDownloadSrvEnum.File,
                                documentPath: DocumentsDownloadSrvEnum.Action,
                                serviceUrl: DocumentsDownloadSrvEnum.Service,
                                loadProgress: true
                            },
                            bottomLine: true
                        }
                    ] }
                />
            </FieldSet>
            <FieldSet Title = "Two column list">
                <FileDownloaderList 
                    showTwoColumn
                    fileList = { [
                        {
                            fileName: "Test File 1",
                            fileIcon: getIconCodeFromExtension("txt"),
                            progressBar: true,
                            downloaderData: {
                                documentId: DocumentsDownloadSrvEnum.File,
                                documentPath: DocumentsDownloadSrvEnum.Action,
                                serviceUrl: DocumentsDownloadSrvEnum.Service,
                                loadProgress: true
                            },
                            fileSize: 134,
                            bottomLine: true
                        },
                        {
                            fileName: "Test File 2",
                            fileIcon: getIconCodeFromExtension("zip"),
                            progressBar: true,
                            downloaderData: {
                                documentId: DocumentsDownloadSrvEnum.File,
                                documentPath: DocumentsDownloadSrvEnum.Action,
                                serviceUrl: DocumentsDownloadSrvEnum.Service,
                            },
                            fileSize: 1002582282,
                            bottomLine: true
                        },
                        {
                            fileName: "Test File 3",
                            fileIcon: getIconCodeFromExtension("pdf"),
                            downloaderData: {
                                documentId: DocumentsDownloadSrvEnum.File,
                                documentPath: DocumentsDownloadSrvEnum.Action,
                                serviceUrl: DocumentsDownloadSrvEnum.Service,
                                loadProgress: true
                            },
                            fileSize: 10025482334,
                            bottomLine: true
                        },
                        {
                            fileName: "Test File 4",
                            progressBar: true,
                            downloaderData: {
                                documentId: DocumentsDownloadSrvEnum.File,
                                documentPath: DocumentsDownloadSrvEnum.Action,
                                serviceUrl: DocumentsDownloadSrvEnum.Service,
                                loadProgress: true
                            },
                            fileSize: 10025488222453,
                            bottomLine: true
                        }
                    ] }
                />
            </FieldSet>

            </Column>
        </Row>
    )
}

export default TestFileDownloader;