import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

export default class DateInput extends PureComponent {
    static propTypes = {
      label: PropTypes.string.isRequired,
      input: PropTypes.object.isRequired,
      placeholder: PropTypes.string,
      meta: PropTypes.shape({
        active: PropTypes.bool,
        error: PropTypes.any,
      }).isRequired,
    };

    state = {
      isChanged: false,
    };

    componentWillReceiveProps(nextProps) {
      if (nextProps.meta.dirty) {
        this.setState({ isChanged: true })
      }
    }

    render() {
      const { label, placeholder, input, meta: { error, touched }, disabled, value, format, isSubmit, showTimeSelect, timeFormat, minDate, timeIntervals } = this.props;
      const { isChanged } = this.state;
      const showError = ((touched || isChanged || isSubmit) && error);
      if (value !== undefined) {
        input.value = value;
      }
      return (
        <div className={classNames('form-group form-group-sm', { 'has-error': showError }, { 'has-success': isChanged && !error })}>
          <label htmlFor={input.name} className="control-label">{label}</label>
          <div className="inner-addon addon-left">
            <div className="addon">
              <i className="fa fa-calendar" />
            </div>
            <DatePicker
              readOnly={!disabled}
              className="form-control popupinputs ng-pristine ng-isolate-scope ng-empty ng-valid ng-valid-required ng-valid-date ng-touched"
              selected={input.value ? moment(input.value) : moment()}
              placeholderText={placeholder}
              disabled={disabled}
              showTimeSelect={showTimeSelect}
              timeFormat={timeFormat}
              timeIntervals={timeIntervals}
              minDate={minDate}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              {...input}
              value={input.value ? moment(input.value).format(format) : ''}
            />
            {showError && <span className="help-block animate-fade">{error}</span>}
          </div>
        </div>
      )
    }
}
