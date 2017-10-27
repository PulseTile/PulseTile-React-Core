import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'

import ValidatedInput from '../../../../form-fields/ValidatedInputFormGroup';
import ValidateTextareaFormGroup from '../../../../form-fields/ValidateTextareaFormGroup';
import DateInput from '../../../../form-fields/DateInput';
import { validateContactsForm } from '../../ContactsCreate/ContactsCreateForm/validation';
import { valuesNames, valuesLabels } from '../../ContactsCreate/ContactsCreateForm/values-names.config';
import { getDDMMMYYYY } from '../../../../../utils/time-helpers.utils';

@reduxForm({
  form: 'contactPanelFormSelector',
  validate: validateContactsForm,
})
export default class ContactPanelForm extends PureComponent {
  componentDidMount() {
    const { detail, initialize } = this.props;
    initialize(this.defaultValuesForm(detail));
  }
  defaultValuesForm(value) {
    const defaultFormValues = {
      [valuesNames.CAUSE]: value.cause,
      [valuesNames.REACTION]: value.reaction,
      [valuesNames.AUTHOR]: value.author,
    };

    return defaultFormValues;
  }
  render() {
    const { detail } = this.props;
    const dateCreated = getDDMMMYYYY(detail.dateCreated);
    return (
      <div className="panel-body-inner">
        <form name="contactPanelForm" className="form">
          <div className="form-group-wrapper">
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.CAUSE}
                  name={valuesNames.CAUSE}
                  id={valuesNames.CAUSE}
                  type="text"
                  placeholder=""
                  component={ValidatedInput}
                />
                <Field
                  label={valuesLabels.REACTION}
                  name={valuesNames.REACTION}
                  id={valuesNames.REACTION}
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
            </div>
            <div className="row-expand">
              <div className="col-expand-right">
                <Field
                  label={valuesLabels.DATE}
                  name={valuesNames.DATE}
                  id={valuesNames.DATE}
                  component={DateInput}
                  props={{ disabled: true, value: dateCreated }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>)
  }
}
