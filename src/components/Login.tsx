import React, { FormEvent, Component } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { AxiosResponse } from 'axios';
import cookie from 'react-cookies';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import AuthAPI from '../api/auth.api';

interface Props extends RouteComponentProps { };

interface State { };

export default class Login extends Component<Props, State> {
  private authAPI = new AuthAPI(toast);

  constructor(props: Props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (event.target) {
      const data = new FormData(event.target as HTMLFormElement);
      const username = data.get('username');
      const password = data.get('password');

      if (!username || !password) {
        toast.error('Dữ liệu đầu vào không hợp lệ');
      } else {
        this.authAPI.login(username.toString(), password.toString(), (res: AxiosResponse) => {
          const isRemember = data.get('is-remember') === 'on';
          const token = res.data['access_token'];
          if (isRemember) {
            // save token in cookie
            const expires = new Date();
            expires.setDate(expires.getDate() + 1);
            cookie.save('token', token, { path: '/', expires });
          } else {
            // TODO: fix when add redux
            cookie.save('token', token, { path: '/' });
          }
          this.props.history.push('/');
        }, () => console.log('done'));
      }

      // axios.post('http://localhost:8080/auth/login', {
      //   username: data.get('username'),
      //   password: data.get('password')
      // }).then(res => {
      //   const isRemember = data.get("is-remember") === 'on'
      //   const token = res.data['access_token']
      //   if (isRemember) {
      //     // save token in cookie
      //     const expires = new Date()
      //     expires.setDate(expires.getDate() + 1)
      //     cookie.save('token', token, { path: '/', expires })
      //   } else {
      //     // TODO: fix when add redux
      //     cookie.save('token', token, { path: '/' })
      //   }
      // }).catch(error => {
      //   if (error.response) {
      //     // client received an error response (5xx, 4xx)
      //     const { status } = error.response
      //     if (status === 401) {
      //       toast.error('Thông tin đăng nhập không đúng');
      //     }
      //   } else if (error.request) {
      //     // client never received a response, or request never left
      //     toast.error('Máy chủ không có phản hồi');
      //   } else {
      //     // only God knows
      //     console.log('Error', error.message);
      //   }
      // })
    }
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className='container'>
          <Form.Group className='row'>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <Icon icon={faUser} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control name="username" placeholder="Username or email" />
            </InputGroup>
          </Form.Group>

          <Form.Group className='row'>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <Icon icon={faLock} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control name="password" type="password" placeholder="Password" />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox">
            <Form.Check name="is-remember" type="checkbox" label="Remember me" />
          </Form.Group>
          <Button className='row' variant="primary" type="submit">
            Submit
        </Button>
        </Form>
      </div>
    );
  }
}