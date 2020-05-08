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
    fileName: string;
    downloaderData: IdownloadArgs;
    fileIcon?: FileDownloaderIcon;
    progressBar?: boolean;
    bottomLine?: boolean;
}

const FileDownloader: React.FC<IFileDownloaderProps> = ({fileName, downloaderData, fileIcon, progressBar, bottomLine}) => 
{
    const { download, abort, downloadProgress, isDownloading } = useDocumentDownloader(downloaderData);

    return (
        <div className = "FileDownloader">
            <div className = {"FileDownloaderContent" + ( bottomLine ? " ContentWithLine" : "")}>
                <div className = "FileIcon">
                    { isDownloading ?
                            !downloaderData.loadProgress ?
                                <Loader isLoading withoutText />
                                    :   progressBar ?
                                            <CircleProgressBar
                                                progress = { downloadProgress }
                                                size = { CPBSize.Small }
                                            />
                                        : 
                                            <div>{downloadProgress} %</div>
                            :   fileIcon ?
                                    <div>
                                        {
                                            fileIcon.toString() 
                                        }
                                    </div>
                                : 
                                    <div className = "IconDot"/>
                    }
                    {isDownloading && <div className = "FileNameCancel" onClick={ () => abort() }>Cancel</div>}
                </div>
                <div className = "FileName" >
                    <span className = "FileNameText" onClick = { () => download() } >{ fileName }</span>
                </div>
            </div>
        </div>
    )
}

export default FileDownloader;