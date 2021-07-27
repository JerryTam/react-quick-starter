import React from 'react';
import ReactDOM from 'react-dom';

import './app.less';

const App = () => <h1 className='title'>My React and TypeScript App!</h1>;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector('#root')
);
