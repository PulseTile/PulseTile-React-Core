import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { Field, reduxForm } from 'redux-form'

import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import SelectFormGroup from '../../../form-fields/SelectFormGroup';
import CustomInputCheckbox from '../../../form-fields/CustomInputCheckbox';
import DateInput from '../../../form-fields/DateInput';
import RangeInput from '../../../form-fields/RangeInput';
import { defaultFormValues } from './default-values.config';
import { optionsForAgeField } from './options-for-select.config';
import { validateAdvancedSearchValues } from './validation';
import { valuesNames } from './values-names.config';

@reduxForm({
  form: 'advancedPatientSearchForm',
  validate: validateAdvancedSearchValues,
})
export default class AdvancedPatientSearchForm extends PureComponent {
    static propTypes = {
      initialize: PropTypes.func,
      formValues: PropTypes.object,
    };

    componentDidMount() {
      this.props.initialize(defaultFormValues);
    }

    render() {
      const { formValues } = this.props;
      const isBirthDateSelected = _.flow(_.get('selectAgeField'), _.eq('birthday'))(formValues);

      return (
        <form name="advancedSearchForm" className="form ng-pristine ng-invalid ng-invalid-required">
          <div className="form-group-wrapper">
            <div className="row">
              <div className="col-xs-12 col-sm-6 ng-scope">
                <Field
                  label="NHS Number"
                  name={valuesNames.NHS_NUMBER}
                  placeholder="e.g. 123 456 7890"
                  type="text"
                  component={ValidatedInput}
                />
              </div>
            </div>
            <div className="row ng-scope">
              <div className="col-xs-12 col-sm-6">
                <Field
                  label="Last Name"
                  name={valuesNames.SURNAME}
                  placeholder="e. g. Smith"
                  type="text"
                  component={ValidatedInput}
                />
              </div>
              <div className="col-xs-12 col-sm-6">
                <Field
                  label="First Name"
                  name={valuesNames.FORENAME}
                  placeholder="e.g. John"
                  type="text"
                  component={ValidatedInput}
                />
              </div>
            </div>
            <div className="row ng-scope">
              <div className="col-xs-12 col-sm-4">
                <Field
                  label="Select Age Params"
                  name={valuesNames.SELECT_AGE}
                  component={SelectFormGroup}
                  options={optionsForAgeField}
                />
              </div>
            </div>
            {isBirthDateSelected ?
              <div className="row ng-scope" >
                <div className="col-xs-12 col-sm-6">
                  <Field
                    label="Date of Birth"
                    name={valuesNames.DATE_OF_BIRTH}
                    type="text"
                    component={DateInput}
                    placeholder="03/08/1970"
                    props={{ format: 'DD/MM/YYYY' }}
                  />
                </div>
              </div>
              :
              <Field
                label="Age Range (Years)"
                name={valuesNames.AGE_RANGE}
                component={RangeInput}
              />}
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <div className="form-group" >
                  <label htmlFor="gender" className="control-label">Gender</label>
                  <div className="input-holder">
                    <div className="wrap-fcustominps-inline">
                      <Field
                        label="Male"
                        name={valuesNames.MALE}
                        component={CustomInputCheckbox}
                      />
                      <Field
                        label="Female"
                        name={valuesNames.FEMALE}
                        component={CustomInputCheckbox}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )
    }
}
