import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

export default class RangeInput extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    input: PropTypes.object.isRequired,
  };

  state = {
    value: [0, 100],
  };

  onSliderChange = (value) => {
    this.setState({
      value,
    });
  };

  render() {
    const { value } = this.state;
    const { label, input } = this.props;
    const marks = {
      0: '0',
      10: '10',
      20: '20',
      30: '30',
      40: '40',
      50: '50',
      60: '60',
      70: '70',
      80: '80',
      90: '90',
      100: '100+',
    };
    return (
      <div className="form-group">
        <label htmlFor={input.name} className="control-label">{label}</label>
        <div className="wrap-rzslider-search">
          <Range
            defaultValue={[0, 100]}
            value={value}
            marks={marks}
            onChange={this.onSliderChange}
          />
        </div>
      </div>
    )
  }
}
