import { noop } from 'rxjs';
import BaseAPI from './base.api';

export default class AuthAPI extends BaseAPI {
  constructor(toast: Object) {
    super(toast);
    this.module = 'auth';
  }

  login(username: string, password: string, next: Function, done: Function = noop) {
    this.post('/login', { username, password }, res => next(res), () => done());
  }
}
