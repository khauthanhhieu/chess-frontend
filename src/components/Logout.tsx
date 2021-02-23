import { Component } from 'react'
import { Redirect } from 'react-router-dom';
import cookie from 'react-cookies';

interface Props { }

interface State { }

export default class Logout extends Component<Props, State> {
  render() {
    cookie.remove('token')
    return <Redirect to="/login" />
  }
}