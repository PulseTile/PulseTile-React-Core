import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Row, Col } from 'react-bootstrap';

import ValidatedInput from '../../../../form-fields/ValidatedInputFormGroup';
import ValidateTextareaFormGroup from '../../../../form-fields/ValidateTextareaFormGroup';
import DateInput from '../../../../form-fields/DateInput';
import StaticFormField from '../../../../form-fields/StaticFormField';
import { validateAllergiesCreateForm } from './validation';
import { valuesNames, valuesLabels } from './values-names.config';
import { defaultFormValues } from './default-values.config';

@reduxForm({
  form: 'allergiesCreateFormSelector',
  validate: validateAllergiesCreateForm,
})
export default class AllergiesCreateForm extends PureComponent {
  componentDidMount() {
    this.props.initialize(defaultFormValues);
  }
  render() {
    return (
      <div className="panel-body-inner">
        <form name="allergiesCreateForm" className="form">
          <div className="form-group-wrapper">
            <Row>
              <Col md={6}>
                <Field
                  label={valuesLabels.CAUSE}
                  name={valuesNames.CAUSE}
                  id={valuesNames.CAUSE}
                  type="text"
                  placeholder=""
                  component={ValidatedInput}
                />
              </Col>
              <Col md={6}>
                <Field
                  name={valuesNames.CAUSECODE}
                  label={valuesLabels.CAUSECODE}
                  component={StaticFormField}
                />
              </Col>
            </Row>
            <Field
              label={valuesLabels.REACTION}
              name={valuesNames.REACTION}
              id={valuesNames.REACTION}
              component={ValidateTextareaFormGroup}
            />
            <Row>
              <Col md={6}>
                <Field
                  label={valuesLabels.TERMINOLOGY}
                  name={valuesNames.TERMINOLOGY}
                  id={valuesNames.TERMINOLOGY}
                  type="text"
                  placeholder=""
                  component={ValidatedInput}
                />
              </Col>
              <Col md={6}>
                <Field
                  name={valuesNames.TERMINOLOGYCODE}
                  label={valuesLabels.TERMINOLOGYCODE}
                  component={StaticFormField}
                />
              </Col>
            </Row>
            <Field
              label={valuesLabels.AUTHOR}
              name={valuesNames.AUTHOR}
              id={valuesNames.AUTHOR}
              component={ValidatedInput}
              props={{ disabled: true }}
            />
            <Field
              label={valuesLabels.DATE}
              name={valuesNames.DATE}
              id={valuesNames.DATE}
              component={DateInput}
              props={{ disabled: true, value: '30-Sep-2017' }}
            />
          </div>
        </form>
      </div>)
  }
}
