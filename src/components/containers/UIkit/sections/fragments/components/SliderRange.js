import React, { Component} from 'react';
import { Range } from 'rc-slider';

export default class SliderRange extends Component {

  state = {
    rangeForm: null,
    rangeTo: null,
  };

  changeRange = (value) => {
    this.setState({
      rangeForm: value[0],
      rangeTo: value[1]
    });
  };

  getMarksArray = (minValueRange, maxValueRange) => {
    const marks = {};
    const rangeAmountPart = 20;
    const different = maxValueRange - minValueRange;
    const markWeight = parseInt(different / rangeAmountPart);
    marks[minValueRange] = minValueRange;
    marks[maxValueRange] = maxValueRange;
    for (let i = 1; i < rangeAmountPart; i++) {
      const mark = minValueRange + markWeight * i;
      const markLabel = (0 === i % 2) ? mark : '';
      marks[mark] = { label: markLabel };
    }
    return marks;
  };

  render () {
    const minValueRange = 0;
    const maxValueRange = 100;
    return (
      <div id="slider-range" className="ui-section">
        <strong className="ui-title">Slider Range</strong>
        <div className="form-group-wrapper">
          <div className="form-group">
            <label className="control-label">Range (Years)</label>
            <div className="wrap-rzslider">
              <div className="wrap-rzslider-events">
                <Range
                  min={minValueRange}
                  max={maxValueRange}
                  defaultValue={[minValueRange, maxValueRange]}
                  marks={this.getMarksArray(minValueRange, maxValueRange)}
                  tipFormatter={value => value}
                  tipProps={{ placement: 'top', visible: true, defaultVisible: true }}
                  onChange={this.changeRange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
