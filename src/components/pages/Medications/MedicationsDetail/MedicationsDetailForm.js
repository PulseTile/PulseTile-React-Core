import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'

import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import ValidatedTextareaFormGroup from '../../../form-fields/ValidatedTextareaFormGroup';
import CustomInputInline from '../../../form-fields/CustomInputInline';
import DateInput from '../../../form-fields/DateInput';
import StaticFormField from '../../../form-fields/StaticFormField';
import { validateMedicationsForm } from '../forms.validation';
import { valuesNames, valuesLabels } from '../forms.config';

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
      [valuesNames.NAME]: value[valuesNames.NAME],
      [valuesNames.DOSE_AMOUNT]: value[valuesNames.DOSE_AMOUNT],
      [valuesNames.DOSE_TIMING]: value[valuesNames.DOSE_TIMING],
      [valuesNames.DOSE_DIRECTIONS]: value[valuesNames.DOSE_DIRECTIONS],
      [valuesNames.MEDICATION_CODE]: value[valuesNames.MEDICATION_CODE],
      [valuesNames.MEDICATION_TERMINOLOGY]: value[valuesNames.MEDICATION_TERMINOLOGY],
      [valuesNames.ROUTE]: value[valuesNames.ROUTE],
      [valuesNames.AUTHOR]: value[valuesNames.AUTHOR],
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
                  name={valuesNames.DOSE_TIMING}
                  label={valuesLabels.DOSE_TIMING}
                  component={StaticFormField}
                  props={{ className: 'form-control-static' }}
                />
                <div className="form-group">
                  <div className="wrap-control-group">
                    <div className="control-group left">
                      <button type="button" aria-label="Prescription" className="btn btn-primary btn-inverse" onClick={() => onShow(PRESCRIPTION_PANEL)}><span className="btn-text">Prescription</span></button>
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

            {detail[valuesNames.ISIMPORT] ?
              <Field
                label={valuesLabels.IMPORT}
                name={valuesNames.IMPORT}
                id={valuesNames.IMPORT}
                component={ValidatedInput}
                props={{ disabled: true, isSubmit }}
              />
              : null
            }

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
                  label={valuesLabels.DATE_CREATED}
                  name={valuesNames.DATE_CREATED}
                  id={valuesNames.DATE_CREATED}
                  component={DateInput}
                  props={{ disabled: true, value: detail[valuesNames.DATE_CREATED], format: 'DD-MMM-YYYY', isSubmit }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>)
  }
}
