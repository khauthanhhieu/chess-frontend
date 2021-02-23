import React, { Component } from 'react'
import './style.css'

interface Props {
  label: string
};

interface State { }

export default class FloatingLabelInput extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <input placeholder={this.props.label}></input>
    )
  }
}