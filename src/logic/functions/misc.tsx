import React from 'react';
import { KnownPages } from '../context/Routes/routeContextEnums';
import { getMimeTypeFromExtension } from './mimeTypes';

export interface IDictionary<TValue> {
    [key: string]: TValue;
}

export type PageType = KnownPages | string;

export const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => { 
    if( ref !== null && ref.current !== null && ref.current.parentElement)
        ref.current.parentElement.scrollTop = ref.current.offsetTop; 
};

export const trueFalseParser = (str: string) => str.toLowerCase() === 'true' ? true : false;

export const injectProps: <TProps extends JSX.IntrinsicAttributes>(Wrapped: React.ComponentType<TProps>, props: TProps) => React.ComponentType = ( Wrapped, props ) => () => <Wrapped {...props} />

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
    let nav = window.navigator as any;
    if (nav != null && nav.msSaveOrOpenBlob != null) {
        const file = new Blob( [bytes], { type: getMimeTypeFromExtension(fileExtension) } );
        nav.msSaveOrOpenBlob(file, `${fileName}${extension}`);
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
    return btoa(`${date.toJSON()}-${rand1}-${rand2}`);
}

export const handleClickOutDiv = (event: any, reference: React.RefObject<HTMLDivElement>, toogleFlag: boolean, callback: () => void): void => {
    if(toogleFlag && reference.current && !reference.current.contains(event.target))
    {
        callback();
    }
}

export const executeClickEnterSpace = (event: React.KeyboardEvent<HTMLElement>, callback: () => void): void => {
    if([13, 32].includes(event.keyCode))
    {
        event.preventDefault();
        callback();
    }
    else if(event.keyCode === 27)
    {
        event.preventDefault();
        event.currentTarget.blur();
    }
}

export const getFocusableList = (parentRef: HTMLElement) => {
    return parentRef.querySelectorAll<HTMLElement>('[href], input, button, select, textarea, [tabindex]:not([tabindex="-1"])');
}

export const trapFocusInElements = (event: React.KeyboardEvent | KeyboardEvent, focusable: NodeListOf<HTMLElement>) => {
    if(event.keyCode === 9)
    {
        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];
        if(event.shiftKey)
        {
            if(document.activeElement === firstElement)
            {
                event.preventDefault()
                lastElement.focus();
            }
        }
        else
        {
            if(document.activeElement === lastElement)
            {
                event.preventDefault()
                firstElement.focus();
            }
        }
    }
}

export const executeAfterLostFocusChild = (event: React.KeyboardEvent | KeyboardEvent, parentRef: HTMLElement, callback: () => void): void => {
    if(event.keyCode === 9)
    {
        const focusable = getFocusableList(parentRef);
        if(focusable && focusable.length > 0)
        {
            const active = document.activeElement;
            if(active && active !== parentRef && !Object.values(focusable).includes(active as HTMLElement))
            {
                callback();
            }
        }
    }
}