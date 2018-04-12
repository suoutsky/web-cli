import './index.less';
import registerServiceWorker from './registerServiceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './stores';
import Frame from './common/layout/Frame'

const App = () => {
  return (
    <Frame/>
  )
} 

ReactDOM.render(
  <Provider store={store}>
     <App/>
  </Provider>
  ,document.getElementById('root'));
registerServiceWorker();
