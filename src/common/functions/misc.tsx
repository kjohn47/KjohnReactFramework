import React from 'react';
import { KnownPages } from '../context/routeContextEnums';
import { IdownloadDocument } from '../services/serviceCallerInterfaces';
import { getMimeTypeFromExtension } from '../services/mimeTypes';

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
        const file = new Blob( [fileBytes], { type: getMimeTypeFromExtension[extension] } );
        window.navigator.msSaveOrOpenBlob(file, fileName);
    } 
    else
    {
        const file = new File( [fileBytes], fileName, { type: getMimeTypeFromExtension[extension] } );
        let url = window.URL.createObjectURL(file);
        window.open(url, '_blank');
    }
}