import React from 'react';
import ReactDOM from 'react-dom';

import 'src/index.less';

// todo: 局部刷新报错
// if (module && module.hot) {
//   module.hot.accept();
// }

const App = () => <h1 className='title'>My React and TypeScript App!</h1>;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector('#root')
);
