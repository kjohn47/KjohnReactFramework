import React from 'react';
import '../../styles/index.scss';
import { AppProvider } from '../../logic/config/AppProvider';
import PageHandler, { IPageHandleProps } from './PageHandler';
import Layout from './Layout';
import SessionHandler from './SessionHandler';
import { injectProps } from '../../logic/functions/misc';
import Footer from './Footer';
import Menu, { IMenuProps } from './Menu';
import CookieModal, { INeededCookieModal } from './CookieModal';
import { IKnownServices } from '../../logic/services/serviceCallerInterfaces';

export interface IKRFProps {
  Routes: IPageHandleProps;
  CustomMenuComponent?: React.ComponentType;
  CustomFooterComponent?: React.ComponentType;
  MenuProps?: IMenuProps;
  FooterProps?: any;
  CookieModalSettings?: INeededCookieModal;
  KnownServices?: IKnownServices;
}

const KRFApp: React.FC<IKRFProps> = (props) =>
  <div className="KRFApp">
    <AppProvider knownServices = {props.KnownServices}>
      <SessionHandler>
        <Layout 
          MenuComponent={ props.CustomMenuComponent ? props.CustomMenuComponent : props.MenuProps != null ? injectProps(Menu, props.MenuProps) : Menu } 
          FooterComponent={ props.CustomFooterComponent ? props.CustomFooterComponent : injectProps(Footer, props.FooterProps) } 
          IsCustomMenu={ props.CustomMenuComponent !== undefined }
          IsCustomFooter={ props.CustomFooterComponent !== undefined }
        >
          {props.CookieModalSettings && <CookieModal {...props.CookieModalSettings} />}
          <PageHandler
            {...props.Routes}
          />
        </Layout>
      </SessionHandler>
    </AppProvider>
  </div>


export default KRFApp;