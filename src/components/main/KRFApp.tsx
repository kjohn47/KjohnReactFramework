import React from 'react';
import { AppProvider } from '../../common/config/appConfig';
import PageHandler, { IPageHandleProps } from './PageHandler';
import Layout from './Layout';
import SessionHandler from './SessionHandler';

export interface IKRFProps {
  Routes: IPageHandleProps;
  Menu: React.ComponentType;
  Footer: React.ComponentType;
}

const KRFApp: React.FC<IKRFProps> = (props) =>
  <AppProvider>
    <SessionHandler>
      <Layout MenuComponent={ props.Menu } FooterComponent={ props.Footer } >
        <PageHandler
          {...props.Routes}
        />
      </Layout>
    </SessionHandler>
  </AppProvider>


export default KRFApp;