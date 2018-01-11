import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'

import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import ValidatedTextareaFormGroup from '../../../form-fields/ValidatedTextareaFormGroup';
import DateInput from '../../../form-fields/DateInput';
import StaticFormField from '../../../form-fields/StaticFormField';
import { validateForm } from '../forms.validation';
import { valuesNames, valuesLabels } from '../forms.config';
import { defaultFormValues } from './default-values.config';
import PropTypes from "prop-types";

@reduxForm({
  form: 'diagnosesCreateFormSelector',
  validate: validateForm,
})
export default class ProblemsDiagnosisCreateForm extends PureComponent {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
    history: PropTypes.object,
  };

  state = {
    isImport: false
  };

  componentDidMount() {
    const historyState = this.context.router.history.location.state;

    if (historyState && historyState.importData) {
      const dataToInitialize = {
        ...defaultFormValues,
        ...historyState.importData
      };
      this.props.initialize(dataToInitialize);
      this.setState({isImport: true})

    } else {
      this.props.initialize(defaultFormValues);
    }
  }

  render() {
    const {isSubmit} = this.props;
    const {isImport} = this.state;

    const isNotValidate = true;
    const date = new Date();
    const dateCreated = date.getTime();

    return (
      <div className="panel-body-inner">
        <form name="diagnosesCreateForm" className="form">
          <div className="form-group-wrapper">
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.PROBLEM}
                  name={valuesNames.PROBLEM}
                  id={valuesNames.PROBLEM}
                  type="text"
                  placeholder=""
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
                  props={{ isSubmit, isNotValidate }}
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
                  props={{ className: 'non-edit-value', isSubmit }}
                />
              </div>
            </div>
            {isImport ?
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
                  props={{ disabled: true, value: dateCreated, format: 'DD-MMM-YYYY', isSubmit }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>)
  }
}
