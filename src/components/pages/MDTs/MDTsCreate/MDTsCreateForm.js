import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'

import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import ValidatedTextareaFormGroup from '../../../form-fields/ValidatedTextareaFormGroup';
import DateInput from '../../../form-fields/DateInput';
import { validateForm } from '../forms.validation';
import { valuesNames, valuesLabels } from '../forms.config';
import { defaultFormValues } from './default-values.config';

@reduxForm({
  form: 'mdtsCreateFormSelector',
  validate: validateForm,
})
export default class MDTsCreateForm extends PureComponent {
  componentDidMount() {
    this.props.initialize(defaultFormValues);
  }
  render() {
    const {isSubmit} = this.props;
    // const date = new Date();
    // const dateCreated = date.getTime();
    return (
      <div className="panel-body-inner">
        <form name="mdtCreateForm" className="form">
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
