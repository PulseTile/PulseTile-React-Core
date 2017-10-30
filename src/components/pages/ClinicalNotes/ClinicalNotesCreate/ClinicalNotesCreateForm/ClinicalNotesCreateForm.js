import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'

import ValidatedInput from '../../../../form-fields/ValidatedInputFormGroup';
import ValidateTextareaFormGroup from '../../../../form-fields/ValidateTextareaFormGroup';
import DateInput from '../../../../form-fields/DateInput';
import { validateClinicalNotesPanelForm } from './validation';
import { valuesNames, valuesLabels } from './values-names.config';
import { defaultFormValues } from './default-values.config';

@reduxForm({
  form: 'clinicalNotesCreateFormSelector',
  validate: validateClinicalNotesPanelForm,
})
export default class ProblemsDiagnosisCreateForm extends PureComponent {
  componentDidMount() {
    this.props.initialize(defaultFormValues);
  }
  render() {
    const date = new Date();
    const dateCreated = date.getTime();
    return (
      <div className="panel-body-inner">
        <form name="clinicalNoteCreateForm" className="form">
          <div className="form-group-wrapper">
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.CLINICAL_NOTES_TYPE}
                  name={valuesNames.CLINICAL_NOTES_TYPE}
                  id={valuesNames.CLINICAL_NOTES_TYPE}
                  type="text"
                  placeholder=""
                  component={ValidatedInput}
                />
              </div>
            </div>
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.NOTE}
                  name={valuesNames.NOTE}
                  id={valuesNames.NOTE}
                  component={ValidateTextareaFormGroup}
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
                  props={{ disabled: true, value: dateCreated, format: 'DD-MMM-YYYY' }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>)
  }
}
