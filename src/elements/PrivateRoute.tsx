import { Route, Redirect, RouteProps } from 'react-router-dom';
import cookie from 'react-cookies';

interface IProps extends RouteProps {
  component: any
  path: string
  exact?: boolean
}

const PrivateRoute = ({ component: Component, ...rest }: IProps) => (
  <Route
    {...rest}
    render={(props) => (
      cookie.load('token') !== undefined
        ? <Component {...props} />
        : <Redirect to="/login" />
    )}
  />
);

export default PrivateRoute;
