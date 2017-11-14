import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class CustomInputCheckbox extends PureComponent {
    static propTypes = {
      label: PropTypes.string,
      input: PropTypes.object.isRequired,
      meta: PropTypes.object,
    };

    render() {
      const { label, input, id } = this.props;

      return (
        <div className="wrap-fcustominp">
          <div className="fcustominp">
            <input
              type="checkbox"
              checked={input.value}
              id={id || ''}
              {...input}
            />
            <label htmlFor={input.name} />
          </div>
          {label ? <label htmlFor={input.name} className="fcustominp-label">{label}</label> : null}
        </div>
      )
    }
}
