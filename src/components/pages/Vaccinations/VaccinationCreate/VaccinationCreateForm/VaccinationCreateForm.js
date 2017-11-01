import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'

import ValidatedInput from '../../../../form-fields/ValidatedInputFormGroup';
import ValidateTextareaFormGroup from '../../../../form-fields/ValidateTextareaFormGroup';
import DateInput from '../../../../form-fields/DateInput';
import StaticFormField from '../../../../form-fields/StaticFormField';
import { validateVaccinationPanelForm } from './validation';
import { valuesNames, valuesLabels } from './values-names.config';
import { defaultFormValues } from './default-values.config';

@reduxForm({
  form: 'vaccinationsCreateFormSelector',
  validate: validateVaccinationPanelForm,
})
export default class VaccinationCreateForm extends PureComponent {
  componentDidMount() {
    this.props.initialize(defaultFormValues);
  }
  render() {
    const {isSubmit} = this.props;
    const date = new Date();
    const dateCreated = date.getTime();
    return (
      <div className="panel-body-inner">
        <form name="vaccinationsCreateForm" className="form">
          <div className="form-group-wrapper">
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.VACCINATION_NAME}
                  name={valuesNames.VACCINATION_NAME}
                  id={valuesNames.VACCINATION_NAME}
                  component={ValidatedInput}
                  props={{ isSubmit }}
                />
              </div>
              <div className="col-expand-right">
                <div className="row">
                  <div className="col-xs-12 col-md-6">
                    <Field
                      label={valuesLabels.VACCINATION_DATE}
                      name={valuesNames.VACCINATION_DATE}
                      id={valuesNames.VACCINATION_DATE}
                      component={DateInput}
                      props={{ format: 'DD-MMM-YYYY', isSubmit }}
                    />
                  </div>
                  <div className="col-xs-12 col-md-6">
                    <Field
                      label={valuesLabels.VACCINATION_SOURCE}
                      name={valuesNames.VACCINATION_SOURCE}
                      id={valuesNames.VACCINATION_SOURCE}
                      component={StaticFormField}
                      props={{ className: 'non-edit-value ng-binding' }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.SERIES_NUMBER}
                  name={valuesNames.SERIES_NUMBER}
                  id={valuesNames.SERIES_NUMBER}
                  component={ValidatedInput}
                  props={{ isSubmit }}
                />
              </div>
            </div>
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.COMMENT}
                  name={valuesNames.COMMENT}
                  id={valuesNames.COMMENT}
                  component={ValidateTextareaFormGroup}
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
                  props={{ disabled: true, isSubmit }}
                />
              </div>
              <div className="col-expand-right">
                <Field
                  label={valuesLabels.DATE}
                  name={valuesNames.DATE}
                  id={valuesNames.DATE}
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
