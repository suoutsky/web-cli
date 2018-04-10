import './index.less';
import React from 'react';
import ReactDOM from 'react-dom';
// import App from './router/';
import Frame from './common/layout/Frame'

import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<Frame/>,document.getElementById('root'));
registerServiceWorker();
