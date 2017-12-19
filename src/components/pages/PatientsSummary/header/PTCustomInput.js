import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const PTCustomCheckbox = ({ type, title, id, name, isChecked, disabled = false, onChange, value }) => {
  const toggleCheckbox = () => !disabled && onChange(value || name);

  return <div className="wrap-fcustominp">
      <div className={classNames('fcustominp-state', { disabled })} onClick={toggleCheckbox} >
        <div className="fcustominp">
          <input type={type}
                 id={`dashboard-${id}`}
                 name={`dashboard-${name}`}
                 checked={isChecked}
                 onChange={toggleCheckbox}
                 value={value ? value : ''}
          />
          <label htmlFor={`dashboard-${id}`} />
        </div>
        <label htmlFor={`dashboard-${id}`} className="fcustominp-label">{title}</label>
      </div>
    </div>
}

PTCustomCheckbox.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default PTCustomCheckbox
