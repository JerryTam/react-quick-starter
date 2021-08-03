import React from 'react';

// interface ILoginProps {}

import './index.less';

const Unauthorized: React.FC = (props: any) => {
  console.log('Login props', props);

  return <div className='index'>Hello Unauthorized</div>;
};

export default Unauthorized;
