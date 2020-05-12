import React from 'react';

const ArchieveSvg = React.lazy( () => import('./ArchieveDownload') );
const AudioSvg = React.lazy( () => import('./AudioDownload') );
const BinarySvg = React.lazy( () => import('./BinaryDownload') );
const CodeSvg = React.lazy( () => import('./CodeDownload') );
const DocSvg = React.lazy( () => import('./DocDownload') );
const ImgSvg = React.lazy( () => import('./ImgDownload') );
const ImportantSvg = React.lazy( () => import('./ImportantDownload') );
const PdfSvg = React.lazy( () => import('./PdfDownload') );
const PptSvg = React.lazy( () => import('./PptDownload') );
const TxtSvg = React.lazy( () => import('./TxtDownload') );
const UnknownSvg = React.lazy( () => import('./UnknownDownload') );
const VideoSvg = React.lazy( () => import('./VideoDownload') );
const XlsSvg = React.lazy( () => import('./XlsDownload') );

export enum DownloadIconCode {
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

export const DownloadIcons = {
    [DownloadIconCode.Archive]: <ArchieveSvg />,
    [DownloadIconCode.Audio]: <AudioSvg />,
    [DownloadIconCode.Binary]: <BinarySvg />,
    [DownloadIconCode.Code]: <CodeSvg />,
    [DownloadIconCode.Doc]: <DocSvg />,
    [DownloadIconCode.Img]: <ImgSvg />,
    [DownloadIconCode.Important]: <ImportantSvg />,
    [DownloadIconCode.Pdf]: <PdfSvg />,
    [DownloadIconCode.Ppt]: <PptSvg />,
    [DownloadIconCode.Txt]: <TxtSvg />,
    [DownloadIconCode.Unknown]: <UnknownSvg />,
    [DownloadIconCode.Video]: <VideoSvg />,
    [DownloadIconCode.Xls]: <XlsSvg />
}