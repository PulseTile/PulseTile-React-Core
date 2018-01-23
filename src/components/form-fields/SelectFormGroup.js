import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash/fp';

export default class SelectFormGroup extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    input: PropTypes.object.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    name: PropTypes.string,
    meta: PropTypes.shape({
      active: PropTypes.bool,
      error: PropTypes.any,
    }).isRequired,
  };

  state={
    isChanged: false
  };

  defaultProps={
    placeholder: '',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.meta.dirty) {
      this.setState({ isChanged: true })
    }
  }

  handleChange = (...args) => {
    const { options, onChange } = this.props;
    const params = args;
    debugger;
    const indexOption = params[0].target.indexOption;
    if (options[indexOption].specialValue) {
      console.log(arguments[0].value);
      debugger
      onChange(specialValue);
    } else {
      onChange(...args);
    }
  };

  render() {
    const { label, name, options, input, id, meta: { error, touched }, disabled, isSubmit, isNotValidate, placeholder, isAdvancedSearch } = this.props;
    const { isChanged } = this.state;
    const showError = ((touched || isChanged || isSubmit) && error);

    return (
      <div className={classNames('form-group', { 'has-error': showError && !isNotValidate }, { 'has-success': isChanged && !error && !isNotValidate })}>
        <label htmlFor={id || ''} className="control-label">{label}</label>
        <select
          className="form-control input-sm"
          name={name}
          id={id || ''}
          disabled={disabled}
          onChange={this.handleChange}
          {...input}
        >
          { placeholder !== undefined ? <option>{placeholder || ''}</option> : null }
          {!_.isEmpty(options) ? options.map(({ value, title, spacialValue, disabled }, index) =>
            <option key={_.uniqueId('__SelectFormGroupOption__')} value={value} indexOption={index} disabled={disabled}>{title}</option>
          ) : null }
        </select>
        {(showError && !isNotValidate && isAdvancedSearch) ? <span className="required-label">{error}</span> : null}
        {(showError && !isNotValidate && !isAdvancedSearch) ? <span className="help-block animate-fade">{error}</span> : null}
      </div>
    )
  }
}
