import React from 'react';

import './index.less';

// interface IUserIndexProps {}

const UserIndex: React.FC = (props: any) => {
  console.log('UserIndex props', props);

  return <div className='index'>Hello UserIndex</div>;
};

export default UserIndex;
