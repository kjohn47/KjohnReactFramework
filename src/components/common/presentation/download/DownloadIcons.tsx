import React from 'react';
import { ReactComponent as ArchieveSvg } from '../../../../assets/svg/downloadIcons/Archieve.svg';
import { ReactComponent as AudioSvg } from '../../../../assets/svg/downloadIcons/Audio.svg';
import { ReactComponent as BinarySvg } from '../../../../assets/svg/downloadIcons/Binary.svg';
import { ReactComponent as CodeSvg } from '../../../../assets/svg/downloadIcons/Code.svg';
import { ReactComponent as DocSvg } from '../../../../assets/svg/downloadIcons/Doc.svg';
import { ReactComponent as ImageSvg } from '../../../../assets/svg/downloadIcons/Image.svg';
import { ReactComponent as ImportantSvg } from '../../../../assets/svg/downloadIcons/Important.svg';
import { ReactComponent as PdfSvg } from '../../../../assets/svg/downloadIcons/Pdf.svg';
import { ReactComponent as PptSvg } from '../../../../assets/svg/downloadIcons/Ppt.svg';
import { ReactComponent as TxtSvg } from '../../../../assets/svg/downloadIcons/Txt.svg';
import { ReactComponent as UnknownSvg } from '../../../../assets/svg/downloadIcons/Unknown.svg';
import { ReactComponent as VideoSvg } from '../../../../assets/svg/downloadIcons/Video.svg';
import { ReactComponent as XlsSvg } from '../../../../assets/svg/downloadIcons/Xls.svg';

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

export const DownloadIcons = {
    [FileDownloaderIcon.Archive]: <ArchieveSvg />,
    [FileDownloaderIcon.Audio]: <AudioSvg />,
    [FileDownloaderIcon.Binary]: <BinarySvg />,
    [FileDownloaderIcon.Code]: <CodeSvg />,
    [FileDownloaderIcon.Doc]: <DocSvg />,
    [FileDownloaderIcon.Img]: <ImageSvg />,
    [FileDownloaderIcon.Important]: <ImportantSvg />,
    [FileDownloaderIcon.Pdf]: <PdfSvg />,
    [FileDownloaderIcon.Ppt]: <PptSvg />,
    [FileDownloaderIcon.Txt]: <TxtSvg />,
    [FileDownloaderIcon.Unknown]: <UnknownSvg />,
    [FileDownloaderIcon.Video]: <VideoSvg />,
    [FileDownloaderIcon.Xls]: <XlsSvg />
}