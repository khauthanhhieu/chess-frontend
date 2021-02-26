import React, { FormEvent, Component, FocusEvent } from 'react'
import { RouteComponentProps, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import cookie from 'react-cookies';
import { toast } from 'react-toastify';

import { AxiosResponse } from 'axios';

import AuthAPI from '../../api/auth.api';
import { FloatingLabelInput } from '../../elements';

import './style.css';

interface Props extends RouteComponentProps { };

interface State {
  errorMsg: {
    username?: string,
    contact?: string,
    password?: string,
    repassword?: string,
  }
};

export default class Register extends Component<Props, State> {
  private authAPI = new AuthAPI(toast);

  constructor(props: Props) {
    super(props);

    this.state = {
      errorMsg: {}
    };

    this.handleFocusPassword = this.handleFocusPassword.bind(this);
    this.handleBlurPassword = this.handleBlurPassword.bind(this);

    this.handleFocusRepassword = this.handleFocusRepassword.bind(this);

    this.handleFocusContact = this.handleFocusContact.bind(this);
    this.handleBlurContact = this.handleBlurContact.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleBlurPassword(event: FocusEvent<HTMLInputElement>) {
    event.preventDefault();

    const { value } = event.target;
    if (value.length > 0 && value.length < 8) {
      const { errorMsg } = this.state;
      errorMsg.password = 'Mật khẩu phải có nhiều hơn 7 kí tự';
      this.setState({ errorMsg });
    }
  }

  handleFocusPassword(event: FocusEvent<HTMLInputElement>) {
    event.preventDefault();

    const { errorMsg } = this.state;
    errorMsg.password = undefined;
    errorMsg.repassword = undefined;
    this.setState({ errorMsg });
  }

  handleFocusRepassword(event: FocusEvent<HTMLInputElement>) {
    event.preventDefault();

    const { errorMsg } = this.state;
    errorMsg.repassword = undefined;
    this.setState({ errorMsg });
  }

  handleBlurContact(event: FocusEvent<HTMLInputElement>) {
    event.preventDefault();

    const { value } = event.target;
    if (value.length === 0) {
      return;
    }

    const isEmail = value[0].match(/[a-zA-Z]/) !== null
    const { errorMsg } = this.state

    if (isEmail) {
      if (!value.includes('@')) {
        errorMsg.contact = 'Địa chỉ email không hợp lệ';
        this.setState({ errorMsg })
      }
    } else {
      if (value.length !== 10) {
        errorMsg.contact = 'Số điện thoại phải đúng 10 số';
        this.setState({ errorMsg })
      }
    }
  }

  handleFocusContact(event: FocusEvent<HTMLInputElement>) {
    event.preventDefault();

    const { errorMsg } = this.state;
    errorMsg.contact = undefined;
    this.setState({ errorMsg });
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (event.target) {
      const data = new FormData(event.target as HTMLFormElement);

      const info = {
        lastname: data.get('lastname'),
        middlename: data.get('middlename'),
        firstname: data.get('firstname'),
        contact: data.get('contact'),
        password: data.get('password'),
        repassword: data.get('repassword')
      }

      if (info.password !== info.repassword) {
        const { errorMsg } = this.state;
        errorMsg.repassword = "Xác nhận mật khẩu không khớp"
        this.setState({ errorMsg })
      }

      // const username = data.get('username');
      // const password = data.get('password');

      // if (!username || !password) {
      //   toast.error('Dữ liệu đầu vào không hợp lệ');
      // } else {
      //   this.authAPI.login(username.toString(), password.toString(), (res: AxiosResponse) => {
      //     const isRemember = data.get('is-remember') === 'on';
      //     const token = res.data['access_token'];
      //     if (isRemember) {
      //       // save token in cookie
      //       const expires = new Date();
      //       expires.setDate(expires.getDate() + 1);
      //       cookie.save('token', token, { path: '/', expires });
      //     } else {
      //       // TODO: fix when add redux
      //       cookie.save('token', token, { path: '/' });
      //     }
      //     this.props.history.push('/');
      //   }, () => console.log('done'));
      // }

      this.props.history.push('/register/more');
    }
  }

  render() {
    const { errorMsg } = this.state;

    const curr = new Date();
    curr.setFullYear(curr.getFullYear() - 18);
    const date = curr.toISOString().substr(0,10);

    return (
      <div className="parent container">
        <form className="form col-sm-8 col-12 shadow-lg bg-white rounded go-top" onSubmit={this.handleSubmit}>
          <div className="row form-group">
            <div className="col-sm-4 input-group">
              <FloatingLabelInput label="Họ" id="lastname" name="lastname"></FloatingLabelInput>
            </div>
            <div className="col-sm-4 input-group">
              <FloatingLabelInput label="Tên lót" id="middlename" name="middlename"></FloatingLabelInput>
            </div>
            <div className="col-sm-4 input-group">
              <FloatingLabelInput label="Tên" id="firstname" name="firstname"></FloatingLabelInput>
            </div>
          </div>

          <div className="row form-group">
            <div className="col-sm">
              <FloatingLabelInput
                id="username"
                name="username"
                label="Tên người dùng"
                error={errorMsg.username}>
              </FloatingLabelInput>
            </div>
          </div>

          <div className="row form-group">
            <div className="col-sm">
              <FloatingLabelInput
                id="contact"
                name="contact"
                label="Số điện thoại hoặc địa chỉ email"
                error={errorMsg.contact}
                onFocus={this.handleFocusContact}
                onBlur={this.handleBlurContact}>
              </FloatingLabelInput>
            </div>
          </div>

          <div className="row form-group">
            <div className="col-sm-6 input-group">
              <FloatingLabelInput
                label="Mật khẩu"
                id="password"
                name="password"
                type="password"
                error={errorMsg.password}
                onFocus={this.handleFocusPassword}
                onBlur={this.handleBlurPassword}>
              </FloatingLabelInput>
            </div>
            <div className="col-sm-6 input-group">
              <FloatingLabelInput
                error={errorMsg.repassword}
                label="Xác nhận"
                id="repassword"
                name="repassword"
                type="password"
                onFocus={this.handleFocusRepassword}>
              </FloatingLabelInput>
            </div>
          </div>

          <div className="row form-group">
            <div className="col-sm-6">
              <FloatingLabelInput
                id="birth"
                name="birth"
                label="Ngày sinh"
                type="date"
                error={errorMsg.contact}
                onFocus={this.handleFocusContact}
                onBlur={this.handleBlurContact}>
              </FloatingLabelInput>
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