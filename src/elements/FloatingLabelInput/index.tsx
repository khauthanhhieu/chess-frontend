import React, { Component } from 'react'
import './style.scss'

interface Props {
  label?: string
  type?: 'text' | 'password',
  name?: string,
  id: string,
};

interface State { }

export default class FloatingLabelInput extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <>
        <input id={this.props.id} name={this.props.name} className="form-control" type={this.props.type} required/>
        <label htmlFor={this.props.id}>{this.props.label}</label>
      </>
    )
  }
}
