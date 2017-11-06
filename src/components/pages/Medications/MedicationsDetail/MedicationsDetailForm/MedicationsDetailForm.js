import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'

import ValidatedInput from '../../../../form-fields/ValidatedInputFormGroup';
import ValidatedTextareaFormGroup from '../../../../form-fields/ValidatedTextareaFormGroup';
import CustomInputInline from '../../../../form-fields/CustomInputInline';
import DateInput from '../../../../form-fields/DateInput';
import { validateMedicationsForm } from '../../MedicationsCreate/MedicationsCreateForm/validation';
import { valuesNames, valuesLabels } from '../../MedicationsCreate/MedicationsCreateForm/values-names.config';

const PRESCRIPTION_PANEL = 'prescriptionPanel';

@reduxForm({
  form: 'medicationsDetailFormSelector',
  validate: validateMedicationsForm,
})
export default class MedicationsDetailForm extends PureComponent {
  componentDidMount() {
    const { detail, initialize } = this.props;
    initialize(this.defaultValuesForm(detail));
  }
  defaultValuesForm(value) {
    const defaultFormValues = {
      [valuesNames.NAME]: value.name,
      [valuesNames.DOSE_AMOUNT]: value.doseAmount,
      [valuesNames.DOSE_TIMING]: value.doseTiming,
      [valuesNames.DOSE_DIRECTIONS]: value.doseDirections,
      [valuesNames.MEDICATION_CODE]: value.medicationCode,
      [valuesNames.MEDICATION_TERMINOLOGY]: value.medicationTerminology,
      [valuesNames.ROUTE]: value.route,
      [valuesNames.AUTHOR]: value.author,
    };

    return defaultFormValues;
  }
  render() {
    const { detail, isSubmit, onShow } = this.props;
    return (
      <div className="panel-body-inner">
        <form name="medicationsDetailForm" className="form">
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
                <div className="form-group">
                  <div className="wrap-control-group">
                    <div className="control-group left">
                      <button type="button" className="btn btn-primary btn-inverse" onClick={() => onShow(PRESCRIPTION_PANEL)}><span className="btn-text">Prescription</span></button>
                    </div>
                  </div>
                </div>

                <Field
                  label={valuesLabels.DOSE_DIRECTIONS}
                  name={valuesNames.DOSE_DIRECTIONS}
                  id={valuesNames.DOSE_DIRECTIONS}
                  component={ValidatedTextareaFormGroup}
                  props={{ isSubmit }}
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
                  props={{ disabled: true, value: detail.startDate, format: 'DD-MMM-YYYY', isSubmit }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>)
  }
}
