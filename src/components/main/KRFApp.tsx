import React from 'react';
import { AppProvider } from '../../common/config/appConfig';
import PageHandler, { IPageHandleProps } from './PageHandler';
import Layout from './Layout';
import SessionHandler from './SessionHandler';
import { injectProps } from '../../common/functions/misc';
import Footer from './Footer';
import Menu from './Menu';

export interface IKRFProps {
  Routes: IPageHandleProps;
  MenuProps: any;
  FooterProps: any;
}

const KRFApp: React.FC<IKRFProps> = (props) =>
  <AppProvider>
    <SessionHandler>
      <Layout MenuComponent={ injectProps(Menu, props.MenuProps) } FooterComponent={ injectProps(Footer, props.FooterProps) } >
        <PageHandler
          {...props.Routes}
        />
      </Layout>
    </SessionHandler>
  </AppProvider>


export default KRFApp;