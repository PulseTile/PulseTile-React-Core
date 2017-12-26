import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'

import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import DateInput from '../../../form-fields/DateInput';
import { validateForm } from '../forms.validation';
import { valuesNames, valuesLabels } from '../forms.config';
import { defaultFormValues } from './default-values.config';
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';

@reduxForm({
  form: 'drawingsCreateFormSelector',
  validate: validateForm,
})
export default class DrawingsCreateForm extends PureComponent {
  componentDidMount() {
    this.props.initialize(defaultFormValues);
  }
  render() {
    const { isSubmit } = this.props;
    const date = new Date();
    const dateCreated = getDDMMMYYYY(date.getTime());

    return (
      <div className="panel-body-inner">
        <form name="drawingsCreateForm" className="form">
          <div className="form-group-wrapper">
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.NAME}
                  name={valuesNames.NAME}
                  id={valuesNames.NAME}
                  type="text"
                  component={ValidatedInput}
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
