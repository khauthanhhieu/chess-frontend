import config from './config.api';
import axios from 'axios-observable';
import { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { noop } from 'rxjs';
import cookie from 'react-cookies';
import { toast } from 'react-toastify';

type Toast = typeof toast

type Next = (value: AxiosResponse<any>) => void
type Complete = () => void

export default class BaseAPI {
  private _url: URL | undefined;
  private _toast: Toast | undefined;
  protected module: string = '';

  constructor(toast?: Object) {
    this._toast = toast as Toast
  }

  private setPath(path: string) {
    if (!path.startsWith('/')) {
      path = `/${path}`
    }
    this._url = new URL(this.module + path, config.BASE_URL);
  }

  private request(path: string, method: Method, params: object, body: object | undefined, next: Next = noop, complete: Complete = noop) {
    this.setPath(path)

    const requestConfig: AxiosRequestConfig = {
      url: this._url?.href,
      method,
      params,
      data: body
    };
    const token = cookie.load('token')
    if (token) {
      requestConfig.headers = { Authorization: `Bearer ${token}` };
    }
    
    axios.request(requestConfig).subscribe(
      response => next(response),
      error => {
        if (error.response) {
          // client received an error response (5xx, 4xx)
          const { status } = error.response
          if (status === 401) {
            this._toast?.error('Thông tin đăng nhập không đúng');
          }
        } else if (error.request) {
          // client never received a response, or request never left
          this._toast?.error('Máy chủ không có phản hồi');
        } else {
          // only God knows
          this._toast?.error('Lỗi không xác định');
        }
      }, () => complete()
    )
  }

  protected get(path: string, params: object, next?: Next, complete?: Complete) {
    this.request(path, 'GET', params, undefined, next, complete);
  }

  protected post(path: string, body: object, next?: Next, complete?: Complete) {
    this.request(path, 'POST', {}, body, next, complete);
  }
}