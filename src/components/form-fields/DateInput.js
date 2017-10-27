import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash/fp';
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
        error: PropTypes.bool,
      }).isRequired,
    };

    render() {
      const { label, placeholder, input, meta: { active, error }, disabled, value, format } = this.props;
      const hasError = !_.isEmpty(error);
      if (value !== undefined) {
        input.value = value;
      }
      return (
        <div className={classNames('form-group form-group-sm', { 'has-error': hasError }, { 'has-success': !hasError && active })}>
          <label htmlFor={input.name} className="control-label">{label}</label>
          <div className="inner-addon addon-left">
            <div className="addon">
              <i className="fa fa-calendar" />
            </div>
            <DatePicker
              className="form-control popupinputs ng-pristine ng-isolate-scope ng-empty ng-valid ng-valid-required ng-valid-date ng-touched"
              selected={input.value ? moment(input.value) : moment()}
              placeholderText={placeholder}
              disabled={disabled}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              {...input}
              value={input.value ? moment(input.value).format(format) : ''}
            />
            {hasError && <span className="help-block animate-fade">{error}</span>}
          </div>
        </div>
      )
    }
}
