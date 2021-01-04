import React from 'react';
import ReactDOM from 'react-dom';
import KRFApp from './components/main/KRFApp';
import { pageComponents } from './logic/config/pageComponents';

ReactDOM.render( <KRFApp {...pageComponents}/>, document.getElementById( 'krfRoot' ) );