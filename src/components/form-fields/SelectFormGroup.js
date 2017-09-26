import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class SelectFormGroup extends PureComponent {
    static propTypes = {
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      input: PropTypes.object.isRequired,
    }

    render() {
      const { label, name, input } = this.props;

      return (
        <div className="form-group">
          <label htmlFor="selectAgeField" className="control-label">{label}</label>
          <select
            className="form-control input-sm"
            name={name}
            {...input}
          >
            <option value="birthday">Date of Birth</option>
            <option value="range">Age Range</option>
          </select>
        </div>
      )
    }
}
