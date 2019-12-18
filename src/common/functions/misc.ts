import React from 'react';

export const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => { 
    if( ref !== null && ref.current !== null && ref.current.parentElement)
        ref.current.parentElement.scrollTop = ref.current.offsetTop; 
};