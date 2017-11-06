import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class CustomInputInline extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    input: PropTypes.object.isRequired,
  };

  render() {
    const { label, input, className, type, id } = this.props;
    return (
      <div className="wrap-fcustominp">
        <div className="fcustominp">
          <input
            type={type}
            id={id}
            name={input.name}
            value={input.value}
            {...input}
          />
          <label htmlFor={id}></label>
        </div>
        <label htmlFor={id} className={className}>{label}</label>
      </div>
    )
  }
}
