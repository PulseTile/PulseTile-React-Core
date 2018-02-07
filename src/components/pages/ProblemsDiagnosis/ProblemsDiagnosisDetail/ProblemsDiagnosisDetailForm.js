import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'

import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import ValidatedTextareaFormGroup from '../../../form-fields/ValidatedTextareaFormGroup';
import DateInput from '../../../form-fields/DateInput';
import StaticFormField from '../../../form-fields/StaticFormField';
import { validateForm } from '../forms.validation';
import { valuesNames, valuesLabels } from '../forms.config';

@reduxForm({
  form: 'diagnosesPanelFormSelector',
  validate: validateForm,
})
export default class ProblemsDiagnosisDetailForm extends PureComponent {
  componentDidMount() {
    const { detail, initialize } = this.props;
    initialize(this.defaultValuesForm(detail));
  }
  defaultValuesForm(value) {
    const defaultFormValues = {
      [valuesNames.PROBLEM]: value[valuesNames.PROBLEM],
      [valuesNames.DATE_OF_ONSET]: value[valuesNames.DATE_OF_ONSET],
      [valuesNames.DESCRIPTION]: value[valuesNames.DESCRIPTION],
      [valuesNames.TERMINOLOGY]: value[valuesNames.TERMINOLOGY],
      [valuesNames.CODE]: value[valuesNames.CODE],
      [valuesNames.AUTHOR]: value[valuesNames.AUTHOR],
    };

    return defaultFormValues;
  }
  render() {
    const { detail, isSubmit } = this.props;
    const isNotValidate = true;
    return (
      <div className="panel-body-inner">
        <form name="diagnosesPanelForm" className="form">
          <div className="form-group-wrapper">
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.PROBLEM}
                  name={valuesNames.PROBLEM}
                  id={valuesNames.PROBLEM}
                  component={ValidatedInput}
                  props={{ isSubmit }}
                />
              </div>
              <div className="col-expand-right">
                <Field
                  label={valuesLabels.DATE_OF_ONSET}
                  name={valuesNames.DATE_OF_ONSET}
                  id={valuesNames.DATE_OF_ONSET}
                  component={DateInput}
                  props={{ format: 'DD-MMM-YYYY', isSubmit }}
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
                  label={valuesLabels.NHS_WEB_PAGE_URL}
                  placeholder="https://www.nhs.co.uk/Conditions/Hay-fever/Pages"
                  type="text"
                  component={ValidatedInput}
                  props={{ isNotValidate }}
                />
              </div>
            </div>
            <div className="row-expand">
              <div className="col-expand-right">
                <Field
                  name={valuesNames.TERMINOLOGY}
                  label={valuesLabels.TERMINOLOGY}
                  component={StaticFormField}
                  props={{ className: 'non-edit-value', isSubmit }}
                />
              </div>
              <div className="col-expand-right">
                <Field
                  name={valuesNames.CODE}
                  label={valuesLabels.CODE}
                  component={StaticFormField}
                  props={{ className: 'non-edit-value' }}
                />
              </div>
            </div>
            {detail[valuesNames.IS_IMPORT] ?
              <Field
                label={valuesLabels.IMPORT}
                name={valuesNames.IMPORT}
                id={valuesNames.IMPORT}
                component={ValidatedInput}
                props={{ disabled: true, isSubmit }}
              />
              : null
            }
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
                  props={{ disabled: true, value: detail[valuesNames.DATE_CREATED], format: 'DD-MMM-YYYY', isSubmit }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>)
  }
}
