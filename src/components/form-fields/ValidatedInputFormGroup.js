import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class ValidatedInputFormGroup extends PureComponent {
    static propTypes = {
      label: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      input: PropTypes.object.isRequired,
      meta: PropTypes.shape({
        active: PropTypes.bool,
        error: PropTypes.string,
      }).isRequired,
    };

    state={
      isChanged: false,
    };

    componentWillReceiveProps(nextProps) {
      if (nextProps.meta.dirty) {
        this.setState({ isChanged: true })
      }
    }

    render() {
      const { label, placeholder, input, meta: { error, touched }, id, disabled, isSubmit, isNotValidate } = this.props;
      const { isChanged } = this.state;
      const showError = ((touched || isChanged || isSubmit) && error);

      return (
        <div className={classNames('form-group', { 'has-error': showError && !isNotValidate }, { 'has-success': isChanged && !error && !isNotValidate })}>
          <label htmlFor={input.name} className="control-label">{label}</label>
          <div className="input-holder">
            <input
              className="form-control input-sm ng-pristine ng-empty ng-invalid ng-invalid-required ng-touched"
              disabled={disabled}
              placeholder={placeholder}
              id={id}
              {...input}
            />
          </div>
          {showError && <span className="required-label">{error}</span>}
        </div>
      )
    }
}
