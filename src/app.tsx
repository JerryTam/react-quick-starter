import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import '@src/index.less';
import RouteWrapper from './router';

// todo: 局部刷新报错
// if (module && module.hot) {
//   module.hot.accept();
// }

// const App = () => <h1 className='title'>My React and TypeScript App!</h1>;

ReactDOM.render(
  <Router>
    <RouteWrapper />
  </Router>,
  document.querySelector('#root')
);
