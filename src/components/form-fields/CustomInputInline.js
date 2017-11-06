import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class CustomInputInline extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    input: PropTypes.object.isRequired,
  };

  render() {
    const { label, input, className, type, id, value } = this.props;
    return (
      <div className="wrap-fcustominp">
        <div className="fcustominp">
          <input type={type} id={id} name={input.name} value={value} />
          <label htmlFor={id}></label>
        </div>
        <label htmlFor={id} className={className}>{label}</label>
      </div>
    )
  }
}
