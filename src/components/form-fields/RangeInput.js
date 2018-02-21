import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import _ from 'lodash/fp';

export default class RangeInput extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    input: PropTypes.shape({
      value: PropTypes.string,
      onChange: PropTypes.func,
    }).isRequired,
  };

  static defaultProps = {
    marks: {
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
    },
    input: {
      value: [0, 100],
    },
    defaultValue: [0, 100],
  };

  componentDidMount() {
    this.props.input.onChange(this.props.input.value);
  }

  render() {
    const { label, input, marks, defaultValue } = this.props;

    return (
      <div className="form-group">
        <label htmlFor={input.name} className="control-label">{label}</label>
        <div className="wrap-rzslider-search">
          {!_.isEmpty(input.value) ? <Range
            defaultValue={defaultValue}
            marks={marks}
            value={input.value}
            {...input}
          /> : null}
        </div>
      </div>
    )
  }
}
