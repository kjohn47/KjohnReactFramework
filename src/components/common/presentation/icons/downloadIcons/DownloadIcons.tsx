import React from 'react';
import { IconCode } from '../../../../../logic/functions/getExtensionIcon';

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

export const DownloadIcons = {
    [IconCode.Archive]: <ArchieveSvg />,
    [IconCode.Audio]: <AudioSvg />,
    [IconCode.Binary]: <BinarySvg />,
    [IconCode.Code]: <CodeSvg />,
    [IconCode.Doc]: <DocSvg />,
    [IconCode.Img]: <ImgSvg />,
    [IconCode.Important]: <ImportantSvg />,
    [IconCode.Pdf]: <PdfSvg />,
    [IconCode.Ppt]: <PptSvg />,
    [IconCode.Txt]: <TxtSvg />,
    [IconCode.Unknown]: <UnknownSvg />,
    [IconCode.Video]: <VideoSvg />,
    [IconCode.Xls]: <XlsSvg />
}