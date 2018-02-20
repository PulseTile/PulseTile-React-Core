import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';

import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import ClinicalNoteField from '../form-fields/ClinicalNoteField';
import DateInput from '../../../form-fields/DateInput';
import { validateForm } from '../forms.validation';
import { valuesNames, valuesLabels } from '../forms.config';
import { defaultFormValues } from './default-values.config';
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';

@reduxForm({
	form: 'clinicalStatementsCreateFormSelector',
	validate: validateForm,
})
export default class ClinicalStatementsCreateForm extends PureComponent {
  componentDidMount() {
    this.props.initialize(defaultFormValues);
  }

  render() {
		const { isSubmit, match, clickOnCreate } = this.props;

    const dateCreated = getDDMMMYYYY(new Date().getTime());

    return (
      <div className="panel-body-inner">
        <form name="clinicalStatementsCreateForm" className="form">
          <div className="form-group-wrapper">
            <Field
              label={valuesLabels.TYPE}
              name={valuesNames.TYPE}
              id={valuesNames.TYPE}
              type="text"
              component={ValidatedInput}
              props={{ isSubmit }}
            />

            <Field
              id={valuesNames.NOTE}
              name={valuesNames.NOTE}
              component={ClinicalNoteField}
              props={{ match, isSubmit, clickOnCreate }}
            />

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
