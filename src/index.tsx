import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import KRFApp from './components/main/KRFApp';
import * as serviceWorker from './serviceWorker';
import { pageComponents } from './logic/config/pageComponents';

ReactDOM.render( <KRFApp {...pageComponents}/>, document.getElementById( 'krfRoot' ) );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
