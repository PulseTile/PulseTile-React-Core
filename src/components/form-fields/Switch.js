import React, { PureComponent } from 'react';

export default class Switch extends PureComponent {
  render() {
    const { type, name, disabled, value, id, text, transitionValue, editOrCreate, input } = this.props;
    let checked;
    if (type === 'checkbox') {
      checked = value;
    } else if (type !== 'checkbox' && value === transitionValue) {
      checked = true;
    }
    return (
      <label className="switch">
        { editOrCreate ?
          <input
            type={type}
            name={name}
            checked={input.value}
            id={id}
            {...input}
          /> :
          <input
            type={type}
            name={name}
            disabled={disabled}
            value={value}
            checked={checked}
            id={id}
          /> }
        <div className={`slider ${disabled ? 'disabled' : ''}`}>
          { type === 'checkbox' ?
            <div>
              <span className="text text-check-true">Yes</span>
              <span className="text text-check-false">No</span>
            </div>
            : <span className="text">{text}</span> }
        </div>
      </label>
    )
  }
}
