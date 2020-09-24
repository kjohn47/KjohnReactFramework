import { useState, useLayoutEffect } from "react";
import { minHeight, mobileWidth, mobileWidthLoginForm, mobileWidthMenu } from "../config/configuration";

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

export const useMinimalHeight: () => boolean = () => {
  const [isMinHeght, setIsMinHeight] = useState(window.innerHeight <= minHeight);

  useLayoutEffect( () => {
    const updateState = () => {
      if(window.innerHeight <= minHeight)
      {
        setIsMinHeight(true);
      }
      else
      {
        setIsMinHeight(false);
      }
    }
    window.addEventListener('resize', updateState);
    updateState();

    return () => window.removeEventListener('resize', updateState);
  }, [])

  return isMinHeght;
}

export const useMobileWidth = (customWidth?: number) => {
  const [isMobileWidth, setIsMobileWidth] = useState<boolean>(window.innerWidth <= mobileWidth);
  const [isMobileWidthLoginForm, setIMobileWidthLoginForm] = useState<boolean>(window.innerWidth <= mobileWidthLoginForm);
  const [isMobileWidthMenu, setIsMobileWidthMenu] = useState<boolean>(window.innerWidth <= mobileWidthMenu);
  const [isCustomWidth, setIsCustomWidth] = useState<boolean>(customWidth ? window.innerWidth <= customWidth : false);

  useLayoutEffect( () => {
    const updateWidthState = () => {
      if(window.innerWidth <= mobileWidth)
      {
        setIsMobileWidth(true);
      }
      else
      {
        setIsMobileWidth(false);
      }

      if(window.innerWidth <= mobileWidthLoginForm)
      {
        setIMobileWidthLoginForm(true);
      }
      else
      {
        setIMobileWidthLoginForm(false);
      }

      if(window.innerWidth <= mobileWidthMenu)
      {
        setIsMobileWidthMenu(true);
      }
      else
      {
        setIsMobileWidthMenu(false);
      }

      if(customWidth)
      {
        if(window.innerWidth <= customWidth)
        {
          setIsCustomWidth(true);
        }
        else
        {
          setIsCustomWidth(false);
        }
      }
    }
    window.addEventListener('resize', updateWidthState);
    updateWidthState();

    return () => window.removeEventListener('resize', updateWidthState);
    // eslint-disable-next-line
  }, [])

  return {
    isMobileWidth,
    isMobileWidthLoginForm,
    isMobileWidthMenu,
    isCustomWidth
  };
}
