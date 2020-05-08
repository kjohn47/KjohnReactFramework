import React from 'react';
import ReactDOM from 'react-dom';
import KRFApp from './components/main/KRFApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<KRFApp Routes = {
    {
      Routes: {
        Home: {
           Component: () => <></>
        }
      }
    }
  }/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
