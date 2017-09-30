import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash/fp';

export default class ValidatedInputFormGroup extends PureComponent {
    static propTypes = {
      label: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
      input: PropTypes.object.isRequired,
      meta: PropTypes.shape({
        active: PropTypes.bool,
        error: PropTypes.string,
      }).isRequired,
    };

    render() {
      const { label, placeholder, input, meta: { active, error }, id } = this.props;
      const hasError = !_.isEmpty(error);

      return (
        <div className={classNames('form-group', { 'has-error': hasError }, { 'has-success': !hasError && active })}>
          <label htmlFor={input.name} className="control-label">{label}</label>
          <div className="input-holder">
            <input
              className="form-control input-sm ng-pristine ng-empty ng-invalid ng-invalid-required ng-touched"
              placeholder={placeholder}
              id={id}
              {...input}
            />
          </div>
          {hasError && <span className="required-label">{error}</span>}
        </div>
      )
    }
}
