import React, { FormEvent, Component } from 'react'
import { RouteComponentProps, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import cookie from 'react-cookies';
import { toast } from 'react-toastify';

import { AxiosResponse } from 'axios';

import AuthAPI from '../../api/auth.api';

import './style.css'

interface Props extends RouteComponentProps { };

interface State { };

export default class Register extends Component<Props, State> {
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
        <form className="form col-sm-8 col-12 shadow-lg bg-white rounded" onSubmit={this.handleSubmit}>
          <div className="row form-group">
            <div className="col-sm input-group">
              <input className="form-control" name="lastname" placeholder="Họ" />
            </div>
            <div className="col-sm input-group">
              <input className="form-control" name="middlename" placeholder="Tên lót" />
            </div>
            <div className="col-sm input-group">
              <input className="form-control" name="firstname" placeholder="Tên" />
            </div>
          </div>

          <div className="row form-group">
            <div className="col-sm input-group">
              <input className="form-control" name="contact" placeholder="Số điện thoại hoặc địa chỉ email" />
            </div>
          </div>

          <div className="row form-group">
            <div className="col-sm input-group">
              <input className="form-control" name="password" type="password" placeholder="Mật khẩu" />
            </div>
            <div className="col-sm input-group">
              <input className="form-control" name="repassword" type="password" placeholder="Xác nhận" />
            </div>
          </div>

          <div className="row d-flex justify-content-around">
            <Link to="/login">Đăng nhập</Link>
            <Button className="row" variant="primary" type="submit">
              Tiếp theo
            </Button>
          </div>
        </form>
      </div>
    );
  }
}