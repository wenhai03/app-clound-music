import React from 'react';
import { Provider } from 'react-redux'
import { IconStyle } from './assets/iconfont/iconfont';
import { GlobalStyle } from  './style';

import { Data } from './application/Singers/data'

import store from './store/index'

import { renderRoutes } from 'react-router-config'; // renderRoutes读取路由配置转化为Route标签

import routes from './routes/index.js';
import { HashRouter } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
  
        <Data>
          { renderRoutes(routes) }
        </Data>
  
      </HashRouter>
    </Provider>
  );
}

export default App;
