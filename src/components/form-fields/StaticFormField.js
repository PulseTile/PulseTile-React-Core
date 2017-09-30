import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class StaticFormField extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    staticInformation: PropTypes.string.isRequired,
  };

  render() {
    const { label, staticInformation } = this.props;
    return (
      <div className="form-group">
        <label className="control-label">{label}</label>
        <div className="form-control-static">{staticInformation}</div>
      </div>
    )
  }
}
