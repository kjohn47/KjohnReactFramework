import React from 'react';
import { IdownloadArgs, useDocumentDownloader } from '../../../../logic/services/fetchHandler';
import Loader from '../loading/Loader';
import CircleProgressBar, { CPBSize } from '../loading/CircleProgressBar';

export enum FileDownloaderIcon {
    Img,
    Txt,
    Doc,
    Xls,
    Ppt,
    Pdf,
    Audio,
    Video,
    Archive,
    Important,
    Binary,
    Code,
    Unknown
}

export interface IFileDownloaderProps {
    FileName: string;
    DownloaderData: IdownloadArgs;
    FileIcon?: FileDownloaderIcon;
    progressBar?: boolean;
}

const FileDownloader: React.FC<IFileDownloaderProps> = ({FileName, DownloaderData, FileIcon, progressBar}) => 
{
    const { download, abort, downloadProgress, isDownloading } = useDocumentDownloader(DownloaderData);

    return (
        <div className = "FileDownloader">
            <div className = "FileIcon">
                { isDownloading ?
                    !DownloaderData.loadProgress ?
                        <Loader isLoading withoutText />
                            :   progressBar ?
                                    <CircleProgressBar
                                        progress = { downloadProgress }
                                        size = { CPBSize.Small }
                                    />
                                : 
                                    <div>{downloadProgress} %</div>
                        :   FileIcon ?
                                <div>
                                    {
                                        FileIcon.toString() 
                                    }
                                </div>
                            : 
                                <div className = "IconDot"/>
                }
            </div>
            <div onClick = { () => download() }>
                <span>Download File - { FileName }</span>
                {isDownloading && <span onClick={ () => abort() }>Cancel</span>}
            </div>
        </div>
    )
}

export default FileDownloader;