import React from 'react';
import { KnownPages } from '../context/Routes/routeContextEnums';
import { getMimeTypeFromExtension } from './mimeTypes';
import SHA from "sha.js";

export interface IDictionary<TValue> {
    [key: string]: TValue;
}

export type PageType = KnownPages | string;

export const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => { 
    if( ref !== null && ref.current !== null && ref.current.parentElement)
        ref.current.parentElement.scrollTop = ref.current.offsetTop; 
};

export const trueFalseParser = (str: string) => str.toLowerCase() === 'true' ? true : false;

export const injectProps: <TProps>(Wrapped: React.ComponentType<TProps>, props: TProps) => React.ComponentType = ( Wrapped, props ) => () => <Wrapped {...props} />

export const delayedPromise = ( t: number ) => new Promise( resolve => setTimeout( resolve, t ) );

export const getFileFromBase64 = ( data: string ): Uint8Array => {
    const fileString = atob(data);
    const fileBytes: Uint8Array = new Uint8Array(fileString.length);

    for( let i = 0; i < fileString.length; i++ )
    {
        fileBytes[i] = fileString.charCodeAt( i );
    }

    return fileBytes;
}

export const decodeUnit8Blob = (chunks: Uint8Array) => {
    if (!("TextDecoder" in window))
    {
        let data: string = "";

        chunks.forEach( c => {
            data += String.fromCharCode( c );
        } );

        return data;
    }
    else
    {
        return new TextDecoder("utf-8").decode(chunks);
    }
}

export const downloadFile = (bytes: Uint8Array, fileName: string, fileExtension?: string): void => {
    const extension = fileExtension ? `.${fileExtension.toLocaleLowerCase()}` : "";
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        const file = new Blob( [bytes], { type: getMimeTypeFromExtension(fileExtension) } );
        window.navigator.msSaveOrOpenBlob(file, `${fileName}${extension}`);
    } 
    else
    {
        const file = new File( [bytes], fileName, { type: getMimeTypeFromExtension(fileExtension) } );
        let url = window.URL.createObjectURL(file);
        var link = document.createElement("a");
        link.href = url;
        link.download = `${fileName}${extension}`;
        link.target = "_blank";
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    }
}

export const convertFileSizeToUnit = ( byteSize: number ): string => {
    const byteValue: number = Math.round(byteSize);
    let numberPart: string = '';
    let unit: string = '';

    if (byteValue >= 1099511627776) {
        numberPart = (byteValue/1099511627776).toFixed(2);
        unit = 'TB';
    }
    else if (byteValue >= 1073741824) {
        numberPart = (byteValue/1073741824).toFixed(2);
        unit = 'GB';
    }
    else if (byteValue >= 1048576) {
        numberPart = (byteValue/1048576).toFixed(2);
        unit = 'MB';
    }
    else if (byteValue >= 1024) {
        numberPart = (byteValue/1024).toFixed(2);
        unit = 'KB';
    }
    else {
        numberPart = byteValue.toString();
        unit = "B";
    }

    return `${numberPart} ${unit}`;
}

export const generateModalId = (): string => {
    let date = new Date();
    let rand1 = Math.floor((Math.random() * date.getMilliseconds() * 100000 ));
    let rand2 = Math.floor((Math.random() * rand1));

    return SHA( 'sha256' ).update( `${date.toJSON()}-${rand1}-${rand2}` ).digest( 'hex' );
}

export const handleClickOutDiv = (event: any, reference: React.RefObject<HTMLDivElement>, toogleFlag: boolean, callback: () => void): void => {
    if(toogleFlag && reference.current && !reference.current.contains(event.target))
    {
        callback();
    }
}