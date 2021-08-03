import { IRouteProps } from '@src/typings/route';

import Update from '@src/pages/user/update';
import Index from '@src/pages/user/index';

const userRoutes: IRouteProps[] = [
  {
    path: '/update',
    component: Update,
  },
  {
    path: '/',
    component: Index,
  },
];

export default userRoutes;
