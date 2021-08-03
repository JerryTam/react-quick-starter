import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';

import Home from '@src/pages/home';
import Login from '@src/pages/login';

import { IRouteProps } from '@src/typings/route';
import Unauthorized from '@src/pages/unauthorized';
import userRoutes from './userRoute';

/*
  export interface RouterConfigModel {
    path: string;
    component?:
      | React.ComponentType<RouteComponentProps<any>>
      | React.ComponentType<any>
      | undefined;
    auth?: boolean;
  }
*/

export const routes: IRouteProps[] = [
  {
    path: '/users',
    childrens: userRoutes,
    auth: 'user',
    // exact: true,
  },
  {
    path: '/login',
    component: Login,
    // exact: true,
  },
  {
    path: '/401',
    component: Unauthorized,
    // exact: true,
  },
  {
    path: '/',
    component: Home,
  },
];

/* const filterPath = (path: string) => {

}; */

const SwitchItemWrapper = (
  routers: IRouteProps[],
  parentPath: string | null = null
): JSX.Element[] => {
  const location = useLocation();
  // const { pathname } = location;
  const isAuthenticated = false;
  const isLogin = false;

  let routeNodes: JSX.Element[] = [];
  for (const val of routers) {
    const path = `${parentPath || ''}${val.path}`;
    if (val.auth && (isLogin === false || isAuthenticated === false)) {
      routeNodes.push(
        <Route {...val} path={path}>
          <Redirect
            key={path}
            to={{
              pathname: isLogin === false ? '/login' : '/401',
              state: { from: location },
            }}
          />
        </Route>
      );
    } else if (val.childrens && val.childrens.length > 0) {
      routeNodes = [
        ...routeNodes,
        ...SwitchItemWrapper(val.childrens, `${val.path}`),
      ];
    } else {
      routeNodes.push(<Route {...val} path={path} />);
    }
  }
  return routeNodes;
};

const RouteWrapper: React.FC = (props: React.ReactNode) => {
  console.log('props', props, routes);
  return <Switch>{SwitchItemWrapper(routes)}</Switch>;
};

export default RouteWrapper;
// const a = () => (
//   <Switch>
//     <Switch>
//       <Route path='/users/update' component={UserUpdate} />
//       <Route path='/users' component={UserIndex} />
//     </Switch>
//     <Route path='/login' component={Login} />
//     <Route path='/' component={Home} />
//   </Switch>
// );

// export default a;
