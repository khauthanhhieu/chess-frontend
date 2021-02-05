import BaseAPI from './base.api';

export default class ProfileAPI extends BaseAPI {
  constructor() {
    super();
    this.module = 'auth';
  }

  getProfile(callback: Function) {
    this.get('/', {}, res => callback(res));
  }
}
