import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'

import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import ValidatedTextareaFormGroup from '../../../form-fields/ValidatedTextareaFormGroup';
import DateInput from '../../../form-fields/DateInput';
import StaticFormField from '../../../form-fields/StaticFormField';
import { validateForm } from '../forms.validation';
import { valuesNames, valuesLabels } from '../forms.config';

@reduxForm({
  form: 'vaccinationsPanelFormSelector',
  validate: validateForm,
})
export default class VaccinationDetailForm extends PureComponent {
  componentDidMount() {
    const { detail, initialize } = this.props;
    initialize(this.defaultValuesForm(detail));
  }
  defaultValuesForm(value) {
    const defaultFormValues = {
      [valuesNames.NAME]: value[valuesNames.NAME],
      [valuesNames.DATE_TIME]: value[valuesNames.DATE_TIME],
      [valuesNames.SOURCE]: value[valuesNames.SOURCE],
      [valuesNames.SERIES_NUMBER]: value[valuesNames.SERIES_NUMBER],
      [valuesNames.COMMENT]: value[valuesNames.COMMENT],
      [valuesNames.AUTHOR]: value[valuesNames.AUTHOR],
    };

    return defaultFormValues;
  }
  render() {
    const { detail, isSubmit } = this.props;
    return (
      <div className="panel-body-inner">
        <form name="vaccinationsPanelForm" className="form">
          <div className="form-group-wrapper">
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.NAME}
                  name={valuesNames.NAME}
                  id={valuesNames.NAME}
                  component={ValidatedInput}
                  props={{ isSubmit }}
                />
              </div>
              <div className="col-expand-right">
                <div className="row">
                  <div className="col-xs-12 col-md-6">
                    <Field
                      label={valuesLabels.DATE_TIME}
                      name={valuesNames.DATE_TIME}
                      id={valuesNames.DATE_TIME}
                      component={DateInput}
                      props={{ format: 'DD-MMM-YYYY', isSubmit }}
                    />
                  </div>
                  <div className="col-xs-12 col-md-6">
                    <Field
                      label={valuesLabels.SOURCE}
                      name={valuesNames.SOURCE}
                      id={valuesNames.SOURCE}
                      component={StaticFormField}
                      props={{ className: 'non-edit-value ng-binding' }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.SERIES_NUMBER}
                  name={valuesNames.SERIES_NUMBER}
                  id={valuesNames.SERIES_NUMBER}
                  component={ValidatedInput}
                  props={{ isSubmit }}
                />
              </div>
            </div>
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.COMMENT}
                  name={valuesNames.COMMENT}
                  id={valuesNames.COMMENT}
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
                  label={valuesLabels.DATE}
                  name={valuesNames.DATE}
                  id={valuesNames.DATE}
                  component={DateInput}
                  props={{ disabled: true, value: detail[valuesNames.DATE], format: 'DD-MMM-YYYY', isSubmit }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>)
  }
}
