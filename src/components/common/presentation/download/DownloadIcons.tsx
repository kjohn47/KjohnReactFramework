import React from 'react';

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
    [FileDownloaderIcon.Archive]: 
        <svg className = "svgDownloadIconStyle">
            <g>
            </g>
        </svg>,
    [FileDownloaderIcon.Audio]: 
        <svg className = "svgDownloadIconStyle">
            <g>
            </g>
        </svg>,
    [FileDownloaderIcon.Binary]: 
        <svg className = "svgDownloadIconStyle">
            <g>
            </g>
        </svg>,
    [FileDownloaderIcon.Code]: 
        <svg className = "svgDownloadIconStyle">
            <g>
            </g>
        </svg>,
    [FileDownloaderIcon.Doc]: 
        <svg className = "svgDownloadIconStyle">
            <g>
            </g>
        </svg>,
    [FileDownloaderIcon.Img]: 
        <svg className = "svgDownloadIconStyle">
            <g>
            </g>
        </svg>,
    [FileDownloaderIcon.Important]: 
        <svg className = "svgDownloadIconStyle">
            <g>
            </g>
        </svg>,
    [FileDownloaderIcon.Pdf]: 
        <svg className = "svgDownloadIconStyle">
            <g>
            </g>
        </svg>,
    [FileDownloaderIcon.Ppt]: 
        <svg className = "svgDownloadIconStyle">
            <g>
            </g>
        </svg>,
    [FileDownloaderIcon.Txt]: 
        <svg className = "svgDownloadIconStyle">
            <g>
            </g>
        </svg>,
    [FileDownloaderIcon.Unknown]: 
        <svg className = "svgDownloadIconStyle">
            <g>
            </g>
        </svg>,
    [FileDownloaderIcon.Video]: 
        <svg className = "svgDownloadIconStyle">
            <g>
            </g>
        </svg>,
    [FileDownloaderIcon.Xls]: 
        <svg className = "svgDownloadIconStyle">
            <g>
            </g>
        </svg>
}