import React from 'react';

import './index.less';

// interface IHomeProps {}

const Home: React.FC = (props: any) => {
  console.log('props 111', props);

  return <div className='index1'>Hello Home</div>;
};

export default Home;
