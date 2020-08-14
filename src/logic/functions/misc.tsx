import React from 'react';
import { KnownPages } from '../context/Routes/routeContextEnums';
import { IdownloadDocument } from '../services/serviceCallerInterfaces';
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

export const getFileFromBase64 = ( fileData: IdownloadDocument ) => {
    const fileString = atob(fileData.data);
    const fileBytes: Uint8Array = new Uint8Array(fileString.length);
    const extension = fileData.extension.toLowerCase();
    const fileName = `${fileData.name}.${extension}`;
    for( let i = 0; i < fileString.length; i++ )
    {
        fileBytes[i] = fileString.charCodeAt( i );
    }

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        const file = new Blob( [fileBytes], { type: getMimeTypeFromExtension(extension) } );
        window.navigator.msSaveOrOpenBlob(file, fileName);
    } 
    else
    {
        const file = new File( [fileBytes], fileName, { type: getMimeTypeFromExtension(extension) } );
        let url = window.URL.createObjectURL(file);
        var link = document.createElement("a");
        link.href = url;
        link.download = fileName;
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