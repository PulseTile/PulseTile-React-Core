import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'

import ValidatedInput from '../../../../form-fields/ValidatedInputFormGroup';
import ValidatedTextareaFormGroup from '../../../../form-fields/ValidatedTextareaFormGroup';
import DateInput from '../../../../form-fields/DateInput';
import { valuesNames, valuesLabels } from '../forms.config';
import { validateForm } from '../forms.validation';
import { getDDMMMYYYY } from '../../../../../utils/time-helpers.utils';
import FormSectionList from '../../../../form-fields/FormSectionList';
import FormSection from '../../../../form-fields/FormSection';

@reduxForm({
  form: 'topThreeThingsPanelFormSelector',
  validate: validateForm,
})
export default class TopThreeThingsDetailForm extends PureComponent {
  componentDidMount() {
    const { detail, initialize } = this.props;
    initialize(this.defaultValuesForm(detail));
  }
  defaultValuesForm(value) {
    const defaultFormValues = {
      [valuesNames.NAME1]: value[valuesNames.NAME1],
      [valuesNames.NAME2]: value[valuesNames.NAME2],
      [valuesNames.NAME3]: value[valuesNames.NAME3],
      [valuesNames.DESCRIPTION1]: value[valuesNames.DESCRIPTION1],
      [valuesNames.DESCRIPTION2]: value[valuesNames.DESCRIPTION2],
      [valuesNames.DESCRIPTION3]: value[valuesNames.DESCRIPTION3],
      [valuesNames.SOURCE]: value[valuesNames.SOURCE],
    };

    return defaultFormValues;
  }
  render() {
    const { isSubmit } = this.props;
    const date = new Date();
    const dateCreated = getDDMMMYYYY(date.getTime());
    return (
      <div className="panel-body-inner">
        <form name="topThreeThingsPanelForm" className="form">
          <div className="form-group-wrapper">
            <FormSectionList title="Isssue #1">
              <FormSection isBordered theme='primary'>
                <div className="form-group-wrapper">
                  <div className="row-expand">
                    <div className="col-expand-left">
                      <Field
                        label={valuesLabels.NAME}
                        name={valuesNames.NAME1}
                        id={valuesNames.NAME1}
                        type="text"
                        placeholder=""
                        component={ValidatedInput}
                        props={{ isSubmit }}
                      />
                    </div>
                    <div className="col-expand-right">
                      <Field
                        label={valuesLabels.DESCRIPTION}
                        name={valuesNames.DESCRIPTION1}
                        id={valuesNames.DESCRIPTION1}
                        component={ValidatedTextareaFormGroup}
                        props={{ isSubmit }}
                      />
                    </div>
                  </div>
                </div>
              </FormSection>
            </FormSectionList>
            <FormSectionList title="Isssue #2">
              <FormSection isBordered theme='primary'>
                <div className="form-group-wrapper">
                  <div className="row-expand">
                    <div className="col-expand-left">
                      <Field
                        label={valuesLabels.NAME}
                        name={valuesNames.NAME2}
                        id={valuesNames.NAME2}
                        type="text"
                        placeholder=""
                        component={ValidatedInput}
                        props={{ isSubmit }}
                      />
                    </div>
                    <div className="col-expand-right">
                      <Field
                        label={valuesLabels.DESCRIPTION}
                        name={valuesNames.DESCRIPTION2}
                        id={valuesNames.DESCRIPTION2}
                        component={ValidatedTextareaFormGroup}
                        props={{ isSubmit }}
                      />
                    </div>
                  </div>
                </div>
              </FormSection>
            </FormSectionList>
            <FormSectionList title="Isssue #3">
              <FormSection isBordered theme='primary'>
                <div className="form-group-wrapper">
                  <div className="row-expand">
                    <div className="col-expand-left">
                      <Field
                        label={valuesLabels.NAME}
                        name={valuesNames.NAME3}
                        id={valuesNames.NAME3}
                        type="text"
                        placeholder=""
                        component={ValidatedInput}
                        props={{ isSubmit }}
                      />
                    </div>
                    <div className="col-expand-right">
                      <Field
                        label={valuesLabels.DESCRIPTION}
                        name={valuesNames.DESCRIPTION3}
                        id={valuesNames.DESCRIPTION3}
                        component={ValidatedTextareaFormGroup}
                        props={{ isSubmit }}
                      />
                    </div>
                  </div>
                </div>
              </FormSection>
            </FormSectionList>
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.DATE}
                  name={valuesNames.DATE}
                  id={valuesNames.DATE}
                  component={DateInput}
                  props={{ disabled: true, value: dateCreated, format: 'DD-MMM-YYYY' }}
                />
              </div>
              <div className="col-expand-right">
                <Field
                  label={valuesLabels.SOURCE}
                  name={valuesNames.SOURCE}
                  id={valuesNames.SOURCE}
                  component={ValidatedInput}
                  props={{ disabled: true }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>)
  }
}
