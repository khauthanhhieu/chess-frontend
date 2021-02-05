import config from './config.api';
import axios from 'axios-observable';
import { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { noop } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import cookie from 'react-cookies';

type Next = (value: AxiosResponse<any>) => void
type Error = (error: any) => void
type Complete = () => void

export default class BaseAPI {
  private _url: URL | undefined;
  protected module: string = ''

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
          throw new Error(error.response.status)
        } else if (error.request) {
          // client never received a response, or request never left
          throw new Error('timeout')
        } else {
          // only God knows
          throw new Error('unknow')
        }
      },
      () => complete()
    )
  }

  protected get(path: string, params: object, next?: Next, complete?: Complete) {
    this.request(path, 'GET', params, undefined, next, complete);
  }

  protected post(path: string, body: object, next?: Next, complete?: Complete) {
    this.request(path, 'POST', {}, body, next, complete);
  }
}