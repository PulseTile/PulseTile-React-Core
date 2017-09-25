import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash/fp';

export default class DateInput extends PureComponent {
    static propTypes = {
      label: PropTypes.string.isRequired,
      input: PropTypes.object.isRequired,
      meta: PropTypes.shape({
        active: PropTypes.bool,
        error: PropTypes.bool,
      }).isRequired,
    };

    render() {
      const { label, input, meta: { active, error } } = this.props;
      const hasError = !_.isEmpty(error);

      return (
        <div className={classNames('form-group form-group-sm', { 'has-error': hasError }, { 'has-success': !hasError && active })}>
          <label htmlFor={input.name} className="control-label">{label}</label>
          <div className="inner-addon addon-left">
            <div className="addon">
              <i className="fa fa-calendar" />
            </div>
            <input
              className="form-control popupinputs ng-pristine ng-isolate-scope ng-empty ng-valid ng-valid-required ng-valid-date ng-touched"
              placeholder="03/08/1970"
              {...input}
            />
            {hasError && <span className="help-block animate-fade">{error}</span>}
          </div>
        </div>
      )
    }
}
