import React from 'react';
import { AppProvider } from '../../logic/config/AppProvider';
import PageHandler, { IPageHandleProps } from './PageHandler';
import Layout from './Layout';
import SessionHandler from './SessionHandler';
import { injectProps } from '../../logic/functions/misc';
import Footer from './Footer';
import Menu, { IMenuProps } from './Menu';
import { INeededCookieModal } from './CookieModal';

export interface IKRFProps {
  Routes: IPageHandleProps;
  CustomMenuComponent?: React.ComponentType;
  CustomFooterComponent?: React.ComponentType;
  MenuProps?: IMenuProps;
  FooterProps?: any;
  CookieModalSettings?: INeededCookieModal;
}

const KRFApp: React.FC<IKRFProps> = (props) =>
  <AppProvider>
    <SessionHandler>
      <Layout 
        MenuComponent={ props.CustomMenuComponent ? props.CustomMenuComponent : injectProps(Menu, props.MenuProps) } 
        FooterComponent={ props.CustomFooterComponent ? props.CustomFooterComponent : injectProps(Footer, props.FooterProps) } 
        IsCustomMenu={ props.CustomMenuComponent !== undefined }
        IsCustomFooter={ props.CustomFooterComponent !== undefined }
        CookieModalSettings = {props.CookieModalSettings}
      >
        <PageHandler
          {...props.Routes}
        />
      </Layout>
    </SessionHandler>
  </AppProvider>


export default KRFApp;