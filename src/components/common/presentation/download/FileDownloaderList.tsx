import React from 'react';
import Row from '../../structure/Row';
import FileDownloader, { IFileDownloaderProps } from './FileDownloader';
import Column, { ColumnNumber } from '../../structure/Column';

export interface IFileDownloaderListProps {
    fileList: IFileDownloaderProps[];
    showTwoColumn?: boolean;
}

const FileDownloaderList: React.FC<IFileDownloaderListProps> = ({fileList, showTwoColumn}) => {
    return (
        <Row>
            {
                fileList.map( ( file, i) => (
                    <Column key = {`file_${i}`} full={showTwoColumn ? ColumnNumber.C10 : ColumnNumber.C20}>
                        <FileDownloader {...file} />
                    </Column>
                ) )
            }
        </Row>
    )
}

export default FileDownloaderList;