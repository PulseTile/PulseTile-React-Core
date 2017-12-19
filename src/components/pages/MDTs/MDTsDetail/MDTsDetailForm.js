import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'

import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import ValidatedTextareaFormGroup from '../../../form-fields/ValidatedTextareaFormGroup';
import DateInput from '../../../form-fields/DateInput';
import { valuesNames, valuesLabels } from '../forms.config';
import { validateForm } from '../forms.validation';

@reduxForm({
  form: 'mdtsPanelFormSelector',
  validate: validateForm,
})
export default class MDTsDetailForm extends PureComponent {
  componentDidMount() {
    const { detail, initialize } = this.props;
    initialize(this.defaultValuesForm(detail));
  }
  defaultValuesForm(value) {
    const defaultFormValues = {
      [valuesNames.TEAM]: value[valuesNames.TEAM],
      [valuesNames.LINK]: value[valuesNames.LINK],
      [valuesNames.QUESTION]: value[valuesNames.QUESTION],
      [valuesNames.NOTES]: value[valuesNames.NOTES],
      [valuesNames.DATE_OF_REQUEST]: value[valuesNames.DATE_OF_REQUEST],
      [valuesNames.DATE_OF_MEETING]: value[valuesNames.DATE_OF_MEETING],
    };

    return defaultFormValues;
  }
  render() {
    const { isSubmit } = this.props;
    return (
      <div className="panel-body-inner">
        <form name="mdtsPanelForm" className="form">
          <div className="form-group-wrapper">
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.TEAM}
                  name={valuesNames.TEAM}
                  id={valuesNames.TEAM}
                  type="text"
                  placeholder=""
                  component={ValidatedInput}
                  props={{ isSubmit }}
                />
              </div>
              <div className="col-expand-right">
                <Field
                  label={valuesLabels.DATE_OF_REQUEST}
                  name={valuesNames.DATE_OF_REQUEST}
                  id={valuesNames.DATE_OF_REQUEST}
                  component={DateInput}
                  props={{ format: 'DD-MMM-YYYY', isSubmit }}
                />
              </div>
            </div>

            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.DATE_OF_MEETING}
                  name={valuesNames.DATE_OF_MEETING}
                  id={valuesNames.DATE_OF_MEETING}
                  component={DateInput}
                  props={{ format: 'DD-MMM-YYYY', isSubmit }}
                />
              </div>
              <div className="col-expand-right">
                <Field
                  label={valuesLabels.LINK}
                  name={valuesNames.LINK}
                  id={valuesNames.LINK}
                  type="text"
                  placeholder=""
                  component={ValidatedInput}
                  props={{ isSubmit }}
                />
              </div>
            </div>

            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.QUESTION}
                  name={valuesNames.QUESTION}
                  id={valuesNames.QUESTION}
                  component={ValidatedTextareaFormGroup}
                  props={{ isSubmit }}
                />
              </div>
              <div className="col-expand-right">
                <Field
                  label={valuesLabels.NOTES}
                  name={valuesNames.NOTES}
                  id={valuesNames.NOTES}
                  component={ValidatedTextareaFormGroup}
                  props={{ isSubmit }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>)
  }
}
