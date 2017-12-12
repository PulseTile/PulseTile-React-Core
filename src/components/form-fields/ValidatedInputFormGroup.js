import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CustomInputCheckbox from './CustomInputCheckbox';

export default class ValidatedInputFormGroup extends PureComponent {
    static propTypes = {
      label: PropTypes.string.isRequired,
      labelCheckbox: PropTypes.string,
      placeholder: PropTypes.string,
      input: PropTypes.object.isRequired,
      meta: PropTypes.shape({
        active: PropTypes.bool,
        error: PropTypes.string,
      }).isRequired,
    };

    state = {
      isChanged: false,
    };

    componentWillReceiveProps(nextProps) {
      if (nextProps.meta.dirty) {
        this.setState({ isChanged: true })
      }
    }

    render() {
      const { label, labelCheckbox, placeholder, input, type, meta: { error, touched }, id, disabled, isSubmit, isNotValidate, isAdvancedSearch } = this.props;
      const { isChanged } = this.state;
      const showError = ((touched || isChanged || isSubmit) && error);

      return (
        <div className={classNames('form-group', { 'has-error': showError && !isNotValidate }, { 'has-success': isChanged && !error && !isNotValidate })}>
          <label htmlFor={id} className="control-label">{label}</label>
          <div className="input-holder">
            {
              type === 'checkbox' ? <CustomInputCheckbox
                labelCheckbox={labelCheckbox}
                name={name}
                id={id}
                input={input}
                disabled={disabled}
              /> : <input
                className="form-control input-sm"
                placeholder={placeholder}
                id={id}
                type={type}
                disabled={disabled}
                {...input}
              />
            }
          </div>
          {(showError && !isNotValidate && isAdvancedSearch) ? <span className="required-label">{error}</span> : null}
          {(showError && !isNotValidate && !isAdvancedSearch) ? <span className="help-block animate-fade">{error}</span> : null}
        </div>
      )
    }
}
