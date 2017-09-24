import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class CustomInputCheckbox extends PureComponent {
    static propTypes = {
      label: PropTypes.string.isRequired,
      input: PropTypes.object.isRequired,
      meta: PropTypes.object.isRequired,
    };

    render() {
      const { label, input, meta } = this.props;

      return (
        <div className="wrap-fcustominp">
          <div>
            <input
              type="checkbox"
              checked={input.value}
              {...input}
            />
            <label htmlFor={input.name} />
          </div>
          <label htmlFor={input.name} className="fcustominp-label ng-binding">{label}</label>
        </div>
      )
    }
}
