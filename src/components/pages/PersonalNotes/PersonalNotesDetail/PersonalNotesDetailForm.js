import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'

import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import ValidatedTextareaFormGroup from '../../../form-fields/ValidatedTextareaFormGroup';
import DateInput from '../../../form-fields/DateInput';
import { valuesNames, valuesLabels } from '../forms.config';
import { validateForm } from '../forms.validation';

@reduxForm({
  form: 'personalNotesPanelFormSelector',
  validate: validateForm,
})
export default class PersonalNotesDetailForm extends PureComponent {
  componentDidMount() {
    const { detail, initialize } = this.props;
    initialize(this.defaultValuesForm(detail));
  }
  defaultValuesForm(value) {
    const defaultFormValues = {
      [valuesNames.TYPE]: value[valuesNames.TYPE],
      [valuesNames.NOTES]: value[valuesNames.NOTES],
      [valuesNames.AUTHOR]: value[valuesNames.AUTHOR],
    };

    return defaultFormValues;
  }
  render() {
    const { detail, isSubmit } = this.props;
    return (
      <div className="panel-body-inner">
        <form name="personalNotesPanelForm" className="form">
          <div className="form-group-wrapper">
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.TYPE}
                  name={valuesNames.TYPE}
                  id={valuesNames.TYPE}
                  type="text"
                  placeholder=""
                  component={ValidatedInput}
                  props={{ isSubmit }}
                />
                <Field
                  label={valuesLabels.NOTES}
                  name={valuesNames.NOTES}
                  id={valuesNames.NOTES}
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
                  props={{ disabled: true }}
                />
              </div>
              <div className="col-expand-right">
                <Field
                  label={valuesLabels.DATE}
                  name={valuesNames.DATE}
                  id={valuesNames.DATE}
                  component={DateInput}
                  props={{ disabled: true, value: detail[valuesNames.DATE], format: 'DD-MMM-YYYY' }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>)
  }
}
