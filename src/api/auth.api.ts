import BaseAPI from './base.api';

export default class AuthAPI extends BaseAPI {
  constructor() {
    super();
    this.module = 'auth';
  }

  login(username: string, password: string, callback: Function) {
    this.post('/login', { username, password }, res => callback(res));
  }
}
