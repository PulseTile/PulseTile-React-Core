import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'
import moment from 'moment';

import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import ValidatedTextareaFormGroup from '../../../form-fields/ValidatedTextareaFormGroup';
import DateInput from '../../../form-fields/DateInput';
import SelectFormGroup from '../../../form-fields/SelectFormGroup';
import { valuesNames, valuesLabels } from '../forms.config';
import { validateEventsForm } from '../forms.validation';

@reduxForm({
  form: 'eventsDetailFormSelector',
  validate: validateEventsForm,
})
export default class EventsDetailForm extends PureComponent {
  componentDidMount() {
    const { detail, initialize } = this.props;
    initialize(this.defaultValuesForm(detail));
  }
  defaultValuesForm(value) {
    const defaultFormValues = {
      [valuesNames.NAME]: value[valuesNames.NAME],
      [valuesNames.TYPE]: value[valuesNames.TYPE],
      [valuesNames.DESCRIPTION]: value[valuesNames.DESCRIPTION],
      [valuesNames.AUTHOR]: value[valuesNames.AUTHOR],
      [valuesNames.DATE_TIME]: value[valuesNames.DATE_TIME],
    };

    return defaultFormValues;
  }
  render() {
    const { detail, isSubmit } = this.props;
    return (
      <div className="panel-body-inner">
        <form name="eventsPanelForm" className="form">
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
                  props={{ isSubmit, placeholder: detail[valuesNames.TYPE], disabled: true }}
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
                  label={valuesLabels.EVENT_DATE_TIME}
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
                  props={{ disabled: true, value: detail[valuesNames.DATE_CREATED], format: 'DD-MMM-YYYY', isSubmit }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>)
  }
}
