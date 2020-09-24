import { useState, useLayoutEffect } from "react";

export const useWindowWidth: () => number = () => {
  const [ width, setWidth ] = useState(0);

  useLayoutEffect( () => {
    const updateSize: () => void = () => {
      if(width !== window.innerWidth)
        setWidth(window.innerWidth);
    }

    window.addEventListener( 'resize', updateSize );

    updateSize();

    return () => window.removeEventListener( 'resize', updateSize );
    // eslint-disable-next-line
  }, [] );

  return width;
}

export const useWindowHeight: () => number = () => {
  const [ height, setHeight ] = useState(0);

  useLayoutEffect( () => {
    const updateSize: () => void = () => {
      if(height !== window.innerHeight)
        setHeight(window.innerHeight);
    }

    window.addEventListener( 'resize', updateSize );

    updateSize();

    return () => window.removeEventListener( 'resize', updateSize );
    // eslint-disable-next-line
  }, [] );

  return height;
}