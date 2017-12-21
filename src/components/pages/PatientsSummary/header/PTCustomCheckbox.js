import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Col } from 'react-bootstrap';

const PTCustomCheckbox = ({ title, name, isChecked, disabled = false, onChange }) => {
  const toggleCheckbox = () => !disabled && onChange(name);

  return <Col xs={6} sm={4}>
    <div className="wrap-fcustominp">
      <div className={classNames('fcustominp-state', { disabled })} onClick={toggleCheckbox} >
        <div className="fcustominp">
          <input type="checkbox" id={`dashboard-${name}`} name={`dashboard-${name}`} checked={isChecked} onChange={toggleCheckbox} />
          <label htmlFor={`dashboard-${name}`} />
        </div>
        <label htmlFor={`dashboard-${name}`} className="fcustominp-label">{title}</label>
      </div>
    </div>
  </Col>
}

PTCustomCheckbox.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default PTCustomCheckbox
