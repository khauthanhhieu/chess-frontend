import React, { Component } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import BlogAPI from '../api/blog.api'

interface Props { }

interface State { }

export default class Blog extends Component<Props, State> {
  private blogAPI = new BlogAPI()

  render() {
    this.blogAPI.getAll((res: object) => console.log(res))

    return (
      <div>
        abc
      </div>
    )
  }
}