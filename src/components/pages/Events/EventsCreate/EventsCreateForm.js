import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'
import moment from 'moment';

import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import ValidatedTextareaFormGroup from '../../../form-fields/ValidatedTextareaFormGroup';
import SelectFormGroup from '../../../form-fields/SelectFormGroup';
import DateInput from '../../../form-fields/DateInput';
import { validateEventsForm } from '../forms.validation';
import { valuesNames, valuesLabels, relationshipOptions } from '../forms.config';
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';

@reduxForm({
  form: 'eventsCreateFormSelector',
  validate: validateEventsForm,
})
export default class EventsCreateForm extends PureComponent {
  componentDidMount() {
    const { initialize } = this.props;
    initialize(this.defaultValuesForm());
  }
  defaultValuesForm() {
    const { eventsType } = this.props;
    const defaultFormValues = {
      [valuesNames.TYPE]: eventsType,
      [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
    };

    return defaultFormValues;
  }
  render() {
    const { isSubmit, eventsType } = this.props;
    const date = new Date();
    const dateCreated = getDDMMMYYYY(date.getTime());

    return (
      <div className="panel-body-inner">
        <form name="eventsCreateForm" className="form">
          <div className="form-group-wrapper">
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.NAME}
                  name={valuesNames.NAME}
                  id={valuesNames.NAME}
                  type="text"
                  placeholder=""
                  component={ValidatedInput}
                  props={{ isSubmit }}
                />
              </div>
              <div className="col-expand-right">
                <Field
                  label={valuesLabels.TYPE}
                  name={valuesNames.TYPE}
                  id={valuesNames.TYPE}
                  component={SelectFormGroup}
                  props={{ isSubmit, placeholder: eventsType, disabled: true }}
                />
              </div>
            </div>
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.DESCRIPTION}
                  name={valuesNames.DESCRIPTION}
                  id={valuesNames.DESCRIPTION}
                  component={ValidatedTextareaFormGroup}
                  props={{ isSubmit }}
                />
              </div>
              <div className="col-expand-right">
                <Field
                  label={valuesLabels.EVENT_DATE}
                  name={valuesNames.DATE_TIME}
                  id={valuesNames.DATE_TIME}
                  component={DateInput}
                  props={{ format: 'DD-MMM-YYYY HH:mm', isSubmit, showTimeSelect: true, timeFormat: 'HH:mm', timeIntervals: 5, minDate: moment() }}
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
                  name={valuesNames.DATE_CREATED}
                  id={valuesNames.DATE_CREATED}
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
