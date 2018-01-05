import React, { PureComponent } from 'react';

export default class Switch extends PureComponent {
  render() {
    const { type, name, disabled, children, className, value } = this.props;
    return (
      <label className={className}>
        <input
          type={type}
          name={name}
          disabled={disabled}
          value={value}
          checked={value}
        />
        <div className={`slider ${disabled ? 'disabled' : ''}`}>
          {children}
        </div>
      </label>
    )
  }
}
