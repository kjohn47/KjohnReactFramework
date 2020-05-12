import React from 'react';
import Column from '../../../common/structure/Column';
import Row from '../../../common/structure/Row';
import { DownloadIconCode } from '../../../common/presentation/icons/downloadIcons/DownloadIcons';
import FileDownloaderList from '../../../common/presentation/download/FileDownloaderList';
import FieldSet from '../../../common/presentation/wrapper/FieldSet';

const TestFileDownloader: React.FC = () => {
    return (
        <Row>
            <Column>
            <FieldSet Title = "Single column list">
                <FileDownloaderList 
                    fileList = { [
                        {
                            fileName: "Test File 1",
                            fileIcon: DownloadIconCode.Unknown,
                            progressBar: true,
                            downloaderData: {
                                documentPath: "pdfFile",
                                serviceUrl: "Assets/",
                                loadProgress: true
                            },
                            bottomLine: true
                        },
                        {
                            fileName: "Test File 2",
                            fileIcon: DownloadIconCode.Doc,
                            progressBar: true,
                            downloaderData: {
                                documentPath: "pdfFile",
                                serviceUrl: "Assets/",
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
                            fileIcon: DownloadIconCode.Txt,
                            progressBar: true,
                            downloaderData: {
                                documentPath: "pdfFile",
                                serviceUrl: "Assets/",
                                loadProgress: true
                            },
                            bottomLine: true
                        },
                        {
                            fileName: "Test File 2",
                            fileIcon: DownloadIconCode.Archive,
                            progressBar: true,
                            downloaderData: {
                                documentPath: "pdfFile",
                                serviceUrl: "Assets/"
                            },
                            bottomLine: true
                        },
                        {
                            fileName: "Test File 3",
                            fileIcon: DownloadIconCode.Pdf,
                            downloaderData: {
                                documentPath: "pdfFile",
                                serviceUrl: "Assets/",
                                loadProgress: true
                            },
                            bottomLine: true
                        },
                        {
                            fileName: "Test File 4",
                            progressBar: true,
                            downloaderData: {
                                documentPath: "pdfFile",
                                serviceUrl: "Assets/",
                                loadProgress: true
                            },
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