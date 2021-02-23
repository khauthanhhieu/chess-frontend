import React, { Component } from 'react'
import Blog from './Blog'
import Profile from './Profile'
import { Route } from 'react-router-dom';
import { PrivateRoute } from '../../elements';

interface Props { }

interface State { }

export default class Dashboard extends Component<Props, State> {
  render() {
    return (
      <div className="dashboard">
        <Route>
          { this.props.children }
          <PrivateRoute exact path='/' component={Blog} />
          <PrivateRoute path='/blog' component={Blog} />
          <PrivateRoute path='/profile' component={Profile} />
        </Route>
      </div>
    )
  }
}