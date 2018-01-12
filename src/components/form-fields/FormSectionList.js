import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class FormSectionList extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const { title, children } = this.props;

    return (
      <div className="form-group-section-list">
        <div className="form-group-section-heading">
          <label className="control-label">{title}</label>
        </div>
        {children}
      </div>
    )
  }
}

