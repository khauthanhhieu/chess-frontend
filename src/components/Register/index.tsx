import React, { FormEvent, Component } from 'react'
import { RouteComponentProps, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import cookie from 'react-cookies';
import { toast } from 'react-toastify';

import { AxiosResponse } from 'axios';

import AuthAPI from '../../api/auth.api';
import { FloatingLabelInput } from '../../elements'

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
        <form className="form col-sm-8 col-12 shadow-lg bg-white rounded go-top" onSubmit={this.handleSubmit}>
          <div className="row form-group">
            <div className="col-sm input-group">
              <FloatingLabelInput label="Họ" id="lastname" name="lastname"></FloatingLabelInput>
            </div>
            <div className="col-sm input-group">
              <FloatingLabelInput label="Tên lót" id="middlename" name="middlename"></FloatingLabelInput>
            </div>
            <div className="col-sm input-group">
              <FloatingLabelInput label="Tên" id="firstname" name="firstname"></FloatingLabelInput>
            </div>
          </div>

          <div className="row form-group">
            <div className="col-sm input-group">
              <FloatingLabelInput label="Số điện thoại hoặc địa chỉ email" id="contact" name="contact"></FloatingLabelInput>
            </div>
          </div>

          <div className="row form-group">
            <div className="col-sm input-group">
              <FloatingLabelInput label="Mật khẩu" id="password" name="password" type="password"></FloatingLabelInput>
            </div>
            <div className="col-sm input-group">
              <FloatingLabelInput label="Xác nhận" id="repassword" name="repassword" type="password"></FloatingLabelInput>
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