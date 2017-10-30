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
  };

  render() {
    const { label, name, options, input, id } = this.props;

    return (
      <div className="form-group">
        <label htmlFor="selectAgeField" className="control-label">{label}</label>
        <select
          className="form-control input-sm"
          name={name}
          id={id ? id : ''}
          {...input}
        >
          {options.map(({ value, title }) =>
            <option key={_.uniqueId('__SelectFormGroupOption__')} value={value}>{title}</option>
          )};
        </select>
      </div>
    )
  }
}
