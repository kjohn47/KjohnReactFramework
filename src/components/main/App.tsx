import React from 'react';
import { AppProvider } from '../../common/config/appConfig';
import PageHandler from './PageHandler';
import Layout from './Layout';
import SessionHandler from './SessionHandler';
import Menu from './Menu';
import Footer from './Footer';

const App: React.FC = () =>
  <AppProvider>
    <SessionHandler>
      <Layout MenuComponent={ Menu } FooterComponent={ Footer } >
        <PageHandler />
      </Layout>
    </SessionHandler>
  </AppProvider>


export default App;