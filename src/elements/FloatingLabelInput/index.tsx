import React, { Component, FocusEvent } from 'react'
import './style.scss'

interface Props {
  label?: string
  type?: 'text' | 'password' | 'date',
  name?: string,
  id: string,
  error?: string,
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void,
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void,
};

interface State {
  type?: 'text' | 'password' | 'date',
  defaultValue?: string | number | readonly string[]
}

export default class FloatingLabelInput extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    if (this.props.type === 'date') {
      this.setState({ type: 'text' })
    }
  }

  handleClick() {
    if (this.props.type === 'date') {
      const curr = new Date();
      curr.setFullYear(curr.getFullYear() - 18);

      this.setState({
        type: 'date',
        defaultValue: curr.toISOString().substr(0, 10)
      })
    }
  }

  render() {
    return (
      <>
        <input
          id={this.props.id}
          name={this.props.name}
          className="form-control full-width"
          type={this.state?.type}
          aria-describedby={this.props.id + 'Help'}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          onClick={this.handleClick}
          defaultValue={this.state?.defaultValue}
          required/>
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <small id={this.props.id + 'Help'} className="form-text text-danger">{this.props.error}</small>
      </>
    )
  }
}
