import React, { PureComponent } from 'react';
import {connect} from "react-redux";
import { Field, reduxForm } from 'redux-form';
import moment from "moment";

import ValidatedTextareaFormGroup from '../../../form-fields/ValidatedTextareaFormGroup';
import TransfersOfCareRecordsEdit from "../transfers-of-care-components/TransfersOfCareRecordsEdit";
import SelectFormGroup from '../../../form-fields/SelectFormGroup';
import DateInput from '../../../form-fields/DateInput';
import { validateForm } from '../forms.validation';
import { valuesNames, valuesLabels, citiesOptions } from '../forms.config';
import { defaultFormValues } from './default-values.config';
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import {transfersOfCareCreateFormStateSelector} from "../selectors";


@reduxForm({
  form: 'transfersOfCareCreateFormSelector',
  validate: validateForm,
})
@connect(transfersOfCareCreateFormStateSelector)
export default class TransfersOfCareCreateForm extends PureComponent {
  componentDidMount() {
    this.props.initialize(defaultFormValues);
  }

  generateCitiesOptions = (selected) => {
    return citiesOptions.slice().map(item => ({
      ...item,
      disabled: (item.value === selected)
    }));
  };

  render() {
    const { isSubmit, transfersOfCareCreateFormState, match } = this.props;
    const date = new Date();
    const dateCreated = getDDMMMYYYY(date.getTime());

    const formState = transfersOfCareCreateFormState.values || {};
    const citiesFromOptions = this.generateCitiesOptions(formState[valuesNames.TO]);
    const citiesToOptions = this.generateCitiesOptions(formState[valuesNames.FROM]);

    return (
      <div className="panel-body-inner">
        <form name="transfersOfCareCreateForm" className="form">
          <div className="form-group-wrapper">

            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.FROM}
                  name={valuesNames.FROM}
                  id={valuesNames.FROM}
                  options={citiesFromOptions}
                  component={SelectFormGroup}
                  placeholder="-- Select from --"
                  props={{ isSubmit }}
                />
              </div>
              <div className="col-expand-right">
                <Field
                  label={valuesLabels.TO}
                  name={valuesNames.TO}
                  id={valuesNames.TO}
                  options={citiesToOptions}
                  component={SelectFormGroup}
                  placeholder="-- Select to --"
                  props={{ isSubmit }}
                />
              </div>
            </div>

            <Field
              label={valuesLabels.DATE_TIME}
              name={valuesNames.DATE_TIME}
              id={valuesNames.DATE_TIME}
              component={DateInput}
              showTimeSelect
              props={{
                format: 'DD-MMM-YYYY HH:mm', isSubmit, showTimeSelect: true,
                timeFormat: 'HH:mm', timeIntervals: 5, minDate: moment() }}
            />

            <Field
              name={valuesNames.RECORDS}
              id={valuesNames.RECORDS}
              component={TransfersOfCareRecordsEdit}
              props={{ match, isSubmit }}
            />

            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.REASON}
                  name={valuesNames.REASON}
                  id={valuesNames.REASON}
                  component={ValidatedTextareaFormGroup}
                  props={{ isSubmit }}
                />
              </div>
              <div className="col-expand-right">
                <Field
                  label={valuesLabels.CLINICAL}
                  name={valuesNames.CLINICAL}
                  id={valuesNames.CLINICAL}
                  component={ValidatedTextareaFormGroup}
                  props={{ isSubmit }}
                />
              </div>
            </div>

            <Field
              label={valuesLabels.DATE_CREATED}
              name={valuesNames.DATE_CREATED}
              id={valuesNames.DATE_CREATED}
              component={DateInput}
              props={{ disabled: true, value: dateCreated, format: 'DD-MMM-YYYY', isSubmit }}
            />
          </div>
        </form>
      </div>)
  }
}
