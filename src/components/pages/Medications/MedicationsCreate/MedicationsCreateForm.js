import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'

import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import ValidatedTextareaFormGroup from '../../../form-fields/ValidatedTextareaFormGroup';
import SelectFormGroup from '../../../form-fields/SelectFormGroup';
import DateInput from '../../../form-fields/DateInput';
import CustomInputInline from '../../../form-fields/CustomInputInline';
import { validateMedicationsCreateForm } from '../forms.validation';
import { valuesNames, valuesLabels, routeOptions } from '../forms.config';
import { defaultFormValues } from './default-values.config';
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';

@reduxForm({
  form: 'medicationsCreateFormSelector',
  validate: validateMedicationsCreateForm,
})
export default class MedicationsCreateForm extends PureComponent {
  componentDidMount() {
    this.props.initialize(defaultFormValues);
  }
  render() {
    const { isSubmit } = this.props;
    const date = new Date();
    const dateCreated = getDDMMMYYYY(date.getTime());

    return (
      <div className="panel-body-inner">
        <form name="medicationsCreateForm" className="form">
          <div className="form-group-wrapper">
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.NAME}
                  name={valuesNames.NAME}
                  id={valuesNames.NAME}
                  type="text"
                  component={ValidatedInput}
                  props={{ isSubmit }}
                />
              </div>
              <div className="col-expand-right">
                <div className="row">
                  <div className="col-xs-12 col-md-6">
                    <Field
                      label={valuesLabels.DOSE_AMOUNT}
                      name={valuesNames.DOSE_AMOUNT}
                      id={valuesNames.DOSE_AMOUNT}
                      type="text"
                      component={ValidatedInput}
                      props={{ isSubmit }}
                    />
                  </div>
                  <div className="col-xs-12 col-md-6">
                    <div className="form-group">
                      <label className="control-label"></label>
                      <div className="input-holder">
                        <Field
                          label="Variable"
                          name="doseAmountVariable"
                          id="doseAmountVariable"
                          type="checkbox"
                          className="fcustominp-label"
                          component={CustomInputInline}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.DOSE_TIMING}
                  name={valuesNames.DOSE_TIMING}
                  id={valuesNames.DOSE_TIMING}
                  type="text"
                  component={ValidatedInput}
                  props={{ isSubmit }}
                />
                <Field
                  label={valuesLabels.DOSE_DIRECTIONS}
                  name={valuesNames.DOSE_DIRECTIONS}
                  id={valuesNames.DOSE_DIRECTIONS}
                  component={ValidatedTextareaFormGroup}
                  props={{ isSubmit }}
                />
                <Field
                  label={valuesLabels.ROUTE}
                  name={valuesNames.ROUTE}
                  id={valuesNames.ROUTE}
                  options={routeOptions}
                  component={SelectFormGroup}
                  props={{ isSubmit, placeholder: '-- Route --' }}
                />
              </div>
            </div>
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.AUTHOR}
                  name={valuesNames.AUTHOR}
                  id={valuesNames.AUTHOR}
                  component={ValidatedInput}
                  props={{ disabled: true, isSubmit }}
                />
              </div>
              <div className="col-expand-right">
                <Field
                  label={valuesLabels.START_DATE}
                  name={valuesNames.START_DATE}
                  id={valuesNames.START_DATE}
                  component={DateInput}
                  props={{ disabled: true, value: dateCreated, format: 'DD-MMM-YYYY', isSubmit }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>)
  }
}
