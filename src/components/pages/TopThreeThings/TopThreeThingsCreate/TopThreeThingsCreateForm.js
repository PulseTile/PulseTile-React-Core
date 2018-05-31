import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Row, Col } from 'react-bootstrap';

import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import ValidatedTextareaFormGroup from '../../../form-fields/ValidatedTextareaFormGroup';
import DateInput from '../../../form-fields/DateInput';
import StaticFormField from '../../../form-fields/StaticFormField';
import { validateTopThreeThingsCreateForm } from '../forms.validation';
import { valuesNames, valuesLabels } from '../forms.config';
import { defaultFormValues } from './default-values.config';
import PropTypes from "prop-types";
import FormSectionList from '../../../form-fields/FormSectionList';
import FormSection from '../../../form-fields/FormSection';

@reduxForm({
  form: 'topThreeThingsCreateFormSelector',
  validate: validateTopThreeThingsCreateForm,
})
export default class TopThreeThingsCreateForm extends PureComponent {
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
      if (!historyState.importData[valuesNames.TERMINOLOGY]) {
        dataToInitialize[valuesNames.TERMINOLOGY] = defaultFormValues[valuesNames.TERMINOLOGY];
      }
      if (!historyState.importData[valuesNames.TERMINOLOGYCODE]) {
        dataToInitialize[valuesNames.TERMINOLOGYCODE] = defaultFormValues[valuesNames.TERMINOLOGYCODE];
      }
      this.props.initialize(dataToInitialize);
      this.setState({isImport: true})

    } else {
      this.props.initialize(defaultFormValues);
    }
  }

  render() {
    const {isSubmit} = this.props;
    const {isImport} = this.state;

    const date = new Date();
    const dateCreated = date.getTime();

    return (
      <div className="panel-body-inner">
        <form name="topThreeThingsCreateForm" className="form">
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
