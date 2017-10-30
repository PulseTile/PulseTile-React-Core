import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash/fp';
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

    render() {
      const { label, labelCheckbox, placeholder, input, type, meta: { active, error }, id, disabled } = this.props;
      const hasError = !_.isEmpty(error);

			return (
        <div className={classNames('form-group', { 'has-error': hasError }, { 'has-success': !hasError && active })}>
          <label htmlFor={input.name} className="control-label">{label}</label>
          <div className="input-holder">
						{
							type === 'checkbox' ? <CustomInputCheckbox
                labelCheckbox={labelCheckbox}
                name={name}
                id={id}
                input={input}
              /> : <input
                className="form-control input-sm"
                disabled={disabled}
                placeholder={placeholder}
                id={id}
                type={type}
								{...input}
              />
						}
          </div>
					{hasError && <span className="required-label">{error}</span>}
        </div>
			)

			// console.log('this.props', this.props);
			// console.log('input', {...input});
    }
}
