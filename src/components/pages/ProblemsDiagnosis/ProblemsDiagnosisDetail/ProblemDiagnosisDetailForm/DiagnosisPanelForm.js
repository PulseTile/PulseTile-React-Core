import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'

import ValidatedInput from '../../../../form-fields/ValidatedInputFormGroup';
import ValidateTextareaFormGroup from '../../../../form-fields/ValidateTextareaFormGroup';
import DateInput from '../../../../form-fields/DateInput';
import StaticFormField from '../../../../form-fields/StaticFormField';
import { validateDiagnosisPanelForm } from '../../ProblemsDiagnosisCreate/ProblemsDiagnosisCreateForm/validation';
import { valuesNames, valuesLabels } from '../../ProblemsDiagnosisCreate/ProblemsDiagnosisCreateForm/values-names.config';

@reduxForm({
  form: 'diagnosesPanelFormSelector',
  validate: validateDiagnosisPanelForm,
})
export default class DiagnosisPanelForm extends PureComponent {
  componentDidMount() {
    const { detail, initialize } = this.props;
    initialize(this.defaultValuesForm(detail));
  }
  defaultValuesForm(value) {
    const defaultFormValues = {
      [valuesNames.PROBLEM]: value.problem,
      [valuesNames.DATE_OF_ONSET]: value.dateOfOnset,
      [valuesNames.DESCRIPTION]: value.description,
      [valuesNames.TERMINOLOGY]: value.terminology,
      [valuesNames.CODE]: value.code,
      [valuesNames.AUTHOR]: value.author,
    };

    return defaultFormValues;
  }
  render() {
    const { detail } = this.props;
    return (
      <div className="panel-body-inner">
        <form name="diagnosesPanelForm" className="form">
          <div className="form-group-wrapper">
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.PROBLEM}
                  name={valuesNames.PROBLEM}
                  id={valuesNames.PROBLEM}
                  type="text"
                  placeholder=""
                  component={ValidatedInput}
                />
              </div>
              <div className="col-expand-right">
                <Field
                  label={valuesLabels.DATE_OF_ONSET}
                  name={valuesNames.DATE_OF_ONSET}
                  id={valuesNames.DATE_OF_ONSET}
                  component={DateInput}
                  props={{ format: 'DD-MMM-YYYY' }}
                />
              </div>
            </div>
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.DESCRIPTION}
                  name={valuesNames.DESCRIPTION}
                  id={valuesNames.DESCRIPTION}
                  component={ValidateTextareaFormGroup}
                />
              </div>
              <div className="col-expand-right">
                <Field
                  label={valuesLabels.NHS_WEB_PAGE_URL}
                  placeholder="https://www.nhs.co.uk/Conditions/Hay-fever/Pages"
                  type="text"
                  component={ValidatedInput}
                />
              </div>
            </div>
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.TERMINOLOGY}
                  name={valuesNames.TERMINOLOGY}
                  id={valuesNames.TERMINOLOGY}
                  component={ValidatedInput}
                />
              </div>
              <div className="col-expand-right">
                <Field
                  name={valuesNames.CODE}
                  label={valuesLabels.CODE}
                  component={StaticFormField}
                  props={{ className: 'non-edit-value' }}
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
                  props={{ disabled: true }}
                />
              </div>
              <div className="col-expand-right">
                <Field
                  label={valuesLabels.DATE}
                  name={valuesNames.DATE}
                  id={valuesNames.DATE}
                  component={DateInput}
                  props={{ disabled: true, value: detail.dateCreated, format: 'DD-MMM-YYYY' }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>)
  }
}
