import React, { useState } from 'react';
import { IdownloadArgs, useDocumentDownloader } from '../../../../logic/services/fetchHandler';
import Loader from '../loading/Loader';
import CircleProgressBar, { CPBSize } from '../loading/CircleProgressBar';
import { DownloadIcons } from '../icons/downloadIcons/DownloadIcons';
import { IconCode } from '../../../../logic/functions/getExtensionIcon';
import useTranslation from '../../../../logic/functions/getTranslation';
import { convertFileSizeToUnit } from '../../../../logic/functions/misc';

export interface IFileDownloaderProps {
    fileName: string;
    downloaderData: IdownloadArgs;
    fileIcon?: IconCode;
    progressBar?: boolean;
    bottomLine?: boolean;
    fileSize?: number;
}

const FileDownloader: React.FC<IFileDownloaderProps> = ({fileName, downloaderData, fileIcon, progressBar, bottomLine, fileSize}) => 
{
    const { download, abort, downloadProgress, isDownloading } = useDocumentDownloader(downloaderData);
    const {getTranslation} = useTranslation();
    const [hoverIcon, setHoverIcon] = useState<boolean>(false);

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
                                            <div>
                                                {downloadProgress} %
                                            </div>
                            :   fileIcon ?
                                    <span 
                                        onClick={() => download()} 
                                        className = "pointer_cursor DownloadIcon"
                                        onMouseEnter = { () => setHoverIcon(true) }
                                        onMouseLeave = { () => setHoverIcon(false) }
                                    >
                                        {DownloadIcons[fileIcon]}
                                    </span>
                                : 
                                    <div className = "IconDot"/>
                    }
                    {isDownloading && 
                        <div className = "FileNameCancel" onClick={ () => abort() }>
                            {
                                getTranslation("_generic", "#(cancel)")
                            }
                        </div>}
                </div>
                <div className = "FileName" >
                    <span 
                        className = "FileNameText" 
                        style = {
                            hoverIcon ? {
                                textDecoration: "underline"
                            } : undefined
                        } 
                        onClick = { () => download() }
                    >
                        { fileName }
                    </span>
                    {fileSize && <span className="FileSizeText">
                        {convertFileSizeToUnit(fileSize)}
                    </span>}
                </div>
            </div>
        </div>
    )
}

export default FileDownloader;