import React from 'react';

import './index.less';
// interface ILoginProps {}

const Login: React.FC = (props: any) => {
  console.log('Login props', props);

  return <div className='index'>Hello Login</div>;
};

export default Login;
