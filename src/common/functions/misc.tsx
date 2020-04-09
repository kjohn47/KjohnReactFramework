import React from 'react';
import { KnownPages } from '../context/routeContextEnums';

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
