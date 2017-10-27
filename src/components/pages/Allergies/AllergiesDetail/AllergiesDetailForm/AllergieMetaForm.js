import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'

import ValidatedInput from '../../../../form-fields/ValidatedInputFormGroup';
import StaticFormField from '../../../../form-fields/StaticFormField';
import { validateAllergiesForm } from '../../AllergiesCreate/AllergiesCreateForm/validation';
import { valuesNames, valuesLabels } from '../../AllergiesCreate/AllergiesCreateForm/values-names.config';

@reduxForm({
  form: 'metaPanelFormSelector',
  validate: validateAllergiesForm,
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
