import React from 'react';
import { AppProvider } from '../../common/config/appConfig';
import PageHandler, { IPageHandleProps } from './PageHandler';
import Layout from './Layout';
import SessionHandler from './SessionHandler';
import Menu from './Menu';
import Footer from './Footer';

const App: React.FC<IPageHandleProps> = (props) =>
  <AppProvider>
    <SessionHandler>
      <Layout MenuComponent={ Menu } FooterComponent={ Footer } >
        <PageHandler
          {...props}
        />
      </Layout>
    </SessionHandler>
  </AppProvider>


export default App;