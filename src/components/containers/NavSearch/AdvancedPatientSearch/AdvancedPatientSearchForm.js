import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import classNames from 'classnames';
import { Field, reduxForm, formValueSelector } from 'redux-form'

import ValidatedInput from './fields/ValidatedInputFormGroup';
import SelectAge from './fields/SelectFormGroup';
import CustomInputCheckbox from './fields/CustomInputCheckbox';
import DateInput from './fields/DateInput';
import RangeInput from './fields/RangeInput';
import { nhsNumberValidation, isRequired, isDate, IS_VALID } from '../../../../utils/validation-helpers/validation.utils';
import { defaultFormValues } from './default-values.config';

@reduxForm({ form: 'advancedPatientSearchForm' })
export default class AdvancedPatientSearchForm extends PureComponent {
    static propTypes = {
      onClose: PropTypes.func.isRequired,
      initialize: PropTypes.func.isRequired,
    };

    componentDidMount() {
      this.props.initialize(defaultFormValues);
    }

    hasNhsNumber = () => {
      console.log(_.get('formState.values.nhsNumber')(this.props))
      return _.flow(_.get('formState.values.nhsNumber'), _.negate(_.isEmpty))(this.props);
    }

    validateName = _.cond([
      [this.hasNhsNumber, _.constant(IS_VALID)],
      [_.T, isRequired],
    ]);

    render() {
      const { onClose } = this.props;

      return (
        <div className="panel-body">
          <div className="panel-body-inner">
            <form name="advancedSearchForm" className="form ng-pristine ng-invalid ng-invalid-required">
              <div className="form-group-wrapper">
                <div className="row">
                  <div className="col-xs-12 col-sm-6 ng-scope">
                    <Field
                      label="NHS Number"
                      name="nhsNumber"
                      placeholder="e.g. 123 456 7890"
                      type="text"
                      component={ValidatedInput}
                      validate={[nhsNumberValidation]}
                    />
                  </div>
                </div>
                <div className="row ng-scope">
                  <div className="col-xs-12 col-sm-6">
                    <Field
                      label="Last Name"
                      name="surname"
                      placeholder="e. g. Smith"
                      type="text"
                      component={ValidatedInput}
                      validate={[this.validateName]}
                    />
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <Field
                      label="First Name"
                      name="forename"
                      placeholder="e.g. John"
                      type="text"
                      component={ValidatedInput}
                      validate={[this.validateName]}
                    />
                  </div>
                </div>
                <div className="row ng-scope">
                  <div className="col-xs-12 col-sm-4">
                    <Field
                      name="selectAgeField"
                      label="Select Age Params"
                      type="checkbox"
                      component={SelectAge}
                    />
                  </div>
                </div>
                <div className="row ng-scope" >
                  <div className="col-xs-12 col-sm-6">
                    <Field
                      label="Date of Birth"
                      name="dateOfBirth"
                      type="text"
                      component={DateInput}
                      validate={[isDate]}
                    />
                  </div>
                </div>
                <Field
                  label="Age Range (Years)"
                  name="ageRange"
                  type="text"
                  component={RangeInput}
                  validate={[isDate]}
                />
                <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <div className="form-group" >
                      <label htmlFor="gender" className="control-label">Gender</label>
                      <div className="input-holder">
                        <div className="wrap-fcustominps-inline">
                          <Field
                            label="Male"
                            name="sexMale"
                            component={CustomInputCheckbox}
                          />
                          <Field
                            label="Female"
                            name="sexFemale"
                            component={CustomInputCheckbox}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>

          </div>
          <div className="panel-control">
            <div className="wrap-control-group hide-indent-bottom">
              <div className="control-group with-indent right">
                <button className="btn btn-danger btn-icon-normal" onClick={onClose}><i className="btn-icon fa fa-times" /> <span className="btn-text">Close</span></button>
                <button className="btn btn-success btn-icon-normal" ><i className="btn-icon fa fa-search" /> <span className="btn-text">Search</span></button>
              </div>
            </div>
          </div>
        </div>)
    }
}
