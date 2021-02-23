import React, { FormEvent, Component } from 'react'
import { RouteComponentProps, Link } from 'react-router-dom';
import { Button, Form, InputGroup } from 'react-bootstrap';
import cookie from 'react-cookies';
import { toast } from 'react-toastify';

import { AxiosResponse } from 'axios';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

import AuthAPI from '../../api/auth.api';

import './style.css'

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
    }
  }

  render() {
    return (
      <div className="parent container">
        <Form className="form col-sm-6 col-12 shadow-lg bg-white rounded" onSubmit={this.handleSubmit}>
          <Form.Group className="row">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <Icon icon={faUser} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control name="username" placeholder="Tên đăng nhập hoặc địa chỉ email" />
            </InputGroup>
          </Form.Group>

          <Form.Group className="row">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <Icon icon={faLock} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control name="password" type="password" placeholder="Mật khẩu" />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox" className="row">
            <Form.Check name="is-remember" type="checkbox" label="Ghi nhớ đăng nhập" />
          </Form.Group>

          <div className="row d-flex justify-content-around">
            <Link to="/register">Tạo tài khoản</Link>
            <Button className="row" variant="primary" type="submit">
              Đăng nhập
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}