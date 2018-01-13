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
import { validateForm } from '../forms.validation';
import { valuesNames, valuesLabels, optionsForAgeField, optionsForSearchQuery, optionsForSearchType } from '../forms.config';

@reduxForm({
  form: 'clinicalQuerySearchForm',
  validate: validateForm,
})
export default class ClinicalQuerySearchForm extends PureComponent {
    static propTypes = {
      initialize: PropTypes.func,
      formValues: PropTypes.object,
    };

    componentDidMount() {
      this.props.initialize(defaultFormValues);
    }

    render() {
      const { formValues, handleSearch } = this.props;
      const isBirthDateSelected = _.flow(_.get('selectAgeField'), _.eq('birthday'))(formValues);

      return (
        <form onSubmit={handleSearch} name="clinicalQuerySearchForm" className="form ng-pristine ng-invalid ng-invalid-required">
          <div className="form-group-wrapper">
            <div className="row">
              <div className="col-xs-12 col-sm-6 ng-scope">
                <Field
                  label={valuesLabels.SEARCH_TYPE}
                  name={valuesNames.SEARCH_TYPE}
                  id={valuesNames.SEARCH_TYPE}
                  options={optionsForSearchType}
                  component={SelectFormGroup}
                  props={{ placeholder: '' }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-4">
                <Field
                  label={valuesLabels.QUERY_CONTAINS}
                  name={valuesNames.QUERY_CONTAINS}
                  id={valuesNames.QUERY_CONTAINS}
                  options={optionsForSearchQuery}
                  component={SelectFormGroup}
                />
              </div>
              <div className="col-xs-12 col-sm-8">
                <Field
                  name={valuesNames.QUERY_TEXT}
                  id={valuesNames.QUERY_TEXT}
                  type="text"
                  component={ValidatedInput}
                />
              </div>
            </div>
            <div className="row">
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
              <div className="row">
                <div className="col-xs-12 col-sm-6">
                  <Field
                    name={valuesNames.DATE_OF_BIRTH}
                    id={valuesNames.DATE_OF_BIRTH}
                    label="Date of Birth"
                    component={DateInput}
                    placeholder="03/08/1970"
                    props={{ format: 'MM/DD/YYYY' }}
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
                        id={valuesNames.MALE}
                        type="checkbox"
                        component={CustomInputCheckbox}
                      />
                      <Field
                        label="Female"
                        name={valuesNames.FEMALE}
                        id={valuesNames.FEMALE}
                        type="checkbox"
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
