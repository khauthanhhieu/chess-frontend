import { Blog } from '../schema/blog.schema';
import BaseAPI from './base.api';

export default class BlogAPI extends BaseAPI {
  constructor() {
    super();
    this.module = 'blogs';
  }

  getAll(callback: Function) {
    this.get('/all', {}, res => callback(res))
  }

  create(blog: Blog, callback: Function) {
    this.post('/create', blog, res => callback(res))
  }
}
