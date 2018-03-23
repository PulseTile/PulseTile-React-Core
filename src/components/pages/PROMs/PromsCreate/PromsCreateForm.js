import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import SelectFormGroup from '../../../form-fields/SelectFormGroup';
import DateInput from '../../../form-fields/DateInput';
import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import FormTitle from '../../../ui-elements/FormTitle/FormTitle';
import { validateForm } from '../forms.validation';
import { valuesNames, valuesLabels, questionOptions1, questionOptions2, questionOptions3, questionOptions4, questionOptions5, marksForPromsRange, typesOfRecordsOptions } from '../forms.config';
import { defaultFormValues } from './default-values.config';
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import RecordsOfTable from '../../../form-fields/RecordsOfTable/RecordsOfTable';


@reduxForm({
  form: 'promsCreateFormSelector',
  validate: validateForm,
})
export default class PromsCreateForm extends PureComponent {
  componentDidMount() {
    this.props.initialize(defaultFormValues);
    this.props.changeScoreStatus(0);
  }

  render() {
    const { isSubmit, match, changeScoreStatus, status } = this.props;
    const date = new Date();
    const dateCreated = getDDMMMYYYY(date.getTime());

    return (
      <div className="panel-body-inner">
        <form name="promsCreateForm" className="form">
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
            </div>

            <Field
              name={valuesNames.RECORDS}
              id={valuesNames.RECORDS}
              component={RecordsOfTable}
              props={{
                match, isSubmit,
                typesOptions: typesOfRecordsOptions,
                isNotDragAndDropOfRaws: true,
                isOnlyOneRecord: true,
              }}
            />

            <FormTitle text="Specific Question" />
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.QUESTION_1}
                  name={valuesNames.SPECIFIC_Q1}
                  id={valuesNames.SPECIFIC_Q1}
                  options={questionOptions1}
                  component={SelectFormGroup}
                  placeholder="-- Select --"
                  props={{ isSubmit }}
                />
              </div>
              <div className="col-expand-right">
                <Field
                  label={valuesLabels.QUESTION_2}
                  name={valuesNames.SPECIFIC_Q2}
                  id={valuesNames.SPECIFIC_Q2}
                  options={questionOptions2}
                  component={SelectFormGroup}
                  placeholder="-- Select --"
                  props={{ isSubmit }}
                />
              </div>
            </div>
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.QUESTION_3}
                  name={valuesNames.SPECIFIC_Q3}
                  id={valuesNames.SPECIFIC_Q3}
                  options={questionOptions3}
                  component={SelectFormGroup}
                  placeholder="-- Select --"
                  props={{ isSubmit }}
                />
              </div>
              <div className="col-expand-right">
                <Field
                  label={valuesLabels.QUESTION_4}
                  name={valuesNames.SPECIFIC_Q4}
                  id={valuesNames.SPECIFIC_Q4}
                  options={questionOptions4}
                  component={SelectFormGroup}
                  placeholder="-- Select --"
                  props={{ isSubmit }}
                />
              </div>
            </div>

            <div className="col-expand-right">
              <Field
                label={valuesLabels.QUESTION_5}
                name={valuesNames.SPECIFIC_Q5}
                id={valuesNames.SPECIFIC_Q5}
                options={questionOptions5}
                component={SelectFormGroup}
                placeholder="-- Select --"
                props={{ isSubmit }}
              />
            </div>

            <FormTitle text="General Score" />
            <div className="form-group">
              <div>Pain severity on a scale of 0 to 100, where 0 indicates no pain and 100 indicates severe pain.</div>
              <div className={`rc-slider--${status}`}>
                <div className="rc-slider-indent">
                  <Field
                    name={valuesNames.SCORE}
                    component={Slider}
                    props={{ marks: marksForPromsRange, min: 0, max: 100, defaultValue: 0, onChange: changeScoreStatus }}
                  />
                </div>
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
                  label={valuesLabels.DATE_CREATED}
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
