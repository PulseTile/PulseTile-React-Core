import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


import ValidatedTextareaFormGroup from '../../../form-fields/ValidatedTextareaFormGroup';
// import PromsRecordsEdit from '../transfers-of-care-components/PromsRecordsEdit';
import SelectFormGroup from '../../../form-fields/SelectFormGroup';
import DateInput from '../../../form-fields/DateInput';
import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import FormTitle from '../../../ui-elements/FormTitle/FormTitle';
import { validateForm } from '../forms.validation';
import { valuesNames, valuesLabels, questionPainOptions, questionLimitationsOptions, questionWalkingOptions, questionWalkingSurfacesOptions, marksForPromsRange } from '../forms.config';
import { defaultFormValues } from './default-values.config';
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
// import { promsCreateFormStateSelector } from '../selectors';


@reduxForm({
  form: 'promsCreateFormSelector',
  validate: validateForm,
})
// @connect(promsCreateFormStateSelector)
export default class PromsCreateForm extends PureComponent {
  componentDidMount() {
    this.props.initialize(defaultFormValues);
    this.props.changeScoreStatus(0);
  }

  render() {
    const { isSubmit, promsCreateFormState, match, changeScoreStatus, status } = this.props;
    const date = new Date();
    const dateCreated = getDDMMMYYYY(date.getTime());

    // const formState = promsCreateFormState.values || {};

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

            {/*<Field*/}
            {/*name={valuesNames.RECORDS}*/}
            {/*id={valuesNames.RECORDS}*/}
            {/*component={PromsRecordsEdit}*/}
            {/*props={{ match, isSubmit }}*/}
            {/*/>*/}

            <FormTitle text="Specific Question" />
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.QUESTION_PAIN}
                  name={valuesNames.SPECIFIC_Q1}
                  id={valuesNames.SPECIFIC_Q1}
                  options={questionPainOptions}
                  component={SelectFormGroup}
                  placeholder="-- Select pain --"
                  props={{ isSubmit }}
                />
              </div>
              <div className="col-expand-right">
                <Field
                  label={valuesLabels.QUESTION_LIMITATIONS}
                  name={valuesNames.SPECIFIC_Q2}
                  id={valuesNames.SPECIFIC_Q2}
                  options={questionLimitationsOptions}
                  component={SelectFormGroup}
                  placeholder="-- Select limitations --"
                  props={{ isSubmit }}
                />
              </div>
            </div>
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.QUESTION_WALKING}
                  name={valuesNames.SPECIFIC_Q3}
                  id={valuesNames.SPECIFIC_Q3}
                  options={questionWalkingOptions}
                  component={SelectFormGroup}
                  placeholder="-- Select walking --"
                  props={{ isSubmit }}
                />
              </div>
              <div className="col-expand-right">
                <Field
                  label={valuesLabels.QUESTION_WALKING_SURFACES}
                  name={valuesNames.SPECIFIC_Q4}
                  id={valuesNames.SPECIFIC_Q4}
                  options={questionWalkingSurfacesOptions}
                  component={SelectFormGroup}
                  placeholder="-- Select walking surfaces --"
                  props={{ isSubmit }}
                />
              </div>
            </div>

            <FormTitle text="General Score" />
            <div className="form-group">
              <div>Pain severity on a scale of 0 to 10, where 0 indicates no pain and 10 indicates severe pain.</div>
              <div className={`rc-slider--${status}`}>
                <Field
                  name={valuesNames.SCORE}
                  component={Slider}
                  props={{ marks: marksForPromsRange, min: 0, max: 10, defaultValue: 0, onChange: changeScoreStatus }}
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
