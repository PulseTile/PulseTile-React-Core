import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash/fp';

export default class ValidatedTextareaFormGroup extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    input: PropTypes.object.isRequired,
    meta: PropTypes.shape({
      active: PropTypes.bool,
      error: PropTypes.string,
    }).isRequired,
  };

  render() {
    const { label, input, meta: { active, error }, id } = this.props;
    const hasError = !_.isEmpty(error);

    return (
      <div className={classNames('form-group', { 'has-error': hasError }, { 'has-success': !hasError && active })}>
        <label htmlFor={input.name} className="control-label">{label}</label>
        <div className="input-holder">
          <textarea
            className="form-control textarea-big input-sm ng-pristine ng-empty ng-invalid ng-invalid-required ng-touched"
            id={id}
            {...input}
          />
        </div>
        {hasError && <span className="required-label">{error}</span>}
      </div>
    )
  }
}
