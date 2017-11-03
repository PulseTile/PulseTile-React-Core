import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'

import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import StaticFormField from '../../../form-fields/StaticFormField';
import { validateAllergiesMeta } from '../forms.validation';
import { valuesNames, valuesLabels } from '../forms.config';

@reduxForm({
  form: 'metaPanelFormSelector',
  validate: validateAllergiesMeta,
})
export default class AllergieMetaForm extends PureComponent {
  componentDidMount() {
    const { detail, initialize } = this.props;
    initialize(this.defaultValuesForm(detail));
  }
  defaultValuesForm(value) {
    const defaultFormValues = {
      [valuesNames.CAUSECODE]: value.causeCode,
      [valuesNames.TERMINOLOGY]: value.causeTerminology,
      [valuesNames.TERMINOLOGYCODE]: value.terminologyCode,
    };

    return defaultFormValues;
  }
  render() {
    const { isSubmit } = this.props;
    return (
      <div className="panel-body-inner">
        <form name="allergieMetaForm" className="form">
          <div className="form-group-wrapper">
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  name={valuesNames.CAUSECODE}
                  label={valuesLabels.CAUSECODE}
                  component={StaticFormField}
                  props={{ className: 'form-control-static' }}
                />
              </div>
            </div>
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.TERMINOLOGY}
                  name={valuesNames.TERMINOLOGY}
                  id={valuesNames.TERMINOLOGY}
                  component={ValidatedInput}
                  props={{isSubmit}}
                />
              </div>
              <div className="col-expand-right">
                <Field
                  name={valuesNames.TERMINOLOGYCODE}
                  label={valuesLabels.TERMINOLOGYCODE}
                  component={StaticFormField}
                  props={{ className: 'form-control-static' }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>)
  }
}
