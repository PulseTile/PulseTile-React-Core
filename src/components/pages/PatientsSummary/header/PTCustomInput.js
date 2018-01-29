import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


export default class PTCustomInput extends PureComponent {
  static propTypes = {
    type: PropTypes.string,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
  };

  toggleInput = () => {
    const { name, disabled = false, value, onChange } = this.props;
    return !disabled && onChange(value || name);
  };

  render() {
    const { type, title, id, name, isChecked, disabled = false, value } = this.props;

    return (
      <div className="wrap-fcustominp">
        <div className={classNames('fcustominp-state', { disabled })} onClick={this.toggleInput} >
          <div className="fcustominp">
            <input type={type}
                   id={`dashboard-${id}`}
                   name={`dashboard-${name}`}
                   checked={isChecked}
                   onChange={this.toggleInput}
                   value={value ? value : ''}
            />
            <label htmlFor={`dashboard-${id}`} />
          </div>
          <label htmlFor={`dashboard-${id}`} className="fcustominp-label">{title}</label>
        </div>
      </div>
    )
  }
};
