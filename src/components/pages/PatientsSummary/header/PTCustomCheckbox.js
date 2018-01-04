import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Col } from 'react-bootstrap';

export default class PTCustomCheckbox extends PureComponent {
	static propTypes = {
		title: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		isChecked: PropTypes.bool.isRequired,
		onChange: PropTypes.func,
		disabled: PropTypes.bool,
	};

	toggleCheckbox = () => {
	  const { disabled = false, onChange } = this.props;
		return !disabled && onChange(name);
  };

	render() {
		const { title, name, isChecked, disabled = false } = this.props;

		return (
      <Col xs={6} sm={4}>
        <div className="wrap-fcustominp">
          <div className={classNames('fcustominp-state', { disabled })} onClick={this.toggleCheckbox} >
            <div className="fcustominp">
              <input type="checkbox" id={`dashboard-${name}`} name={`dashboard-${name}`} checked={isChecked} onChange={this.toggleCheckbox} />
              <label htmlFor={`dashboard-${name}`} />
            </div>
            <label htmlFor={`dashboard-${name}`} className="fcustominp-label">{title}</label>
          </div>
        </div>
      </Col>
    )
  }
};
