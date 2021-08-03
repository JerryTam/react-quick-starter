import { RouteProps } from 'react-router-dom';

export interface IRouteProps extends RouteProps {
  auth?: false | undefined | string;
  // regexp?: RegExp; // 正则匹配
  childrens?: IRouteProps[];
}
