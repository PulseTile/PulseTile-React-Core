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
			error: PropTypes.string,
		}).isRequired,
  };

	state={
		isChanged: false,
	};

	defaultProps={
    placeholder: ''
  };

	componentWillReceiveProps(nextProps) {
		if (nextProps.meta.dirty) {
			this.setState({ isChanged: true })
		}
	}

  render() {
    const { label, name, options, input, id, meta: { error, touched }, disabled, isSubmit,isNotValidate, placeholder } = this.props;
		const { isChanged } = this.state;
		const showError = ((touched || isChanged || isSubmit) && error);

    return (
      <div className={classNames('form-group', { 'has-error': showError && !isNotValidate }, { 'has-success': isChanged && !error && !isNotValidate })}>
        <label htmlFor="selectAgeField" className="control-label">{label}</label>
        <select
          className="form-control input-sm"
          name={name}
          id={id ? id : ''}
          disabled={disabled}
          {...input}
        >
          <option>{placeholder}</option>
          {options.map(({ value, title }) =>
            <option key={_.uniqueId('__SelectFormGroupOption__')} value={value}>{title}</option>
          )};
        </select>
				{showError && <span className="required-label">{error}</span>}
      </div>
    )
  }
}
