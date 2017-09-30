import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Row, Col } from 'react-bootstrap';

import ValidatedInput from '../../../../form-fields/ValidatedInputFormGroup';
import ValidateTextareaFormGroup from '../../../../form-fields/ValidateTextareaFormGroup';
import StaticFormField from '../../../../form-fields/StaticFormField';
import { validateAllergiesCreateForm } from './validation';
import { valuesNames, valuesLabels } from './values-names.config';

@reduxForm({
  form: 'allergiesCreateFormSelector',
  validate: validateAllergiesCreateForm,
})
export default class AllergiesCreateForm extends PureComponent {
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
                <StaticFormField
                  label="Cause Code"
                  staticInformation="1239085"
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
                <StaticFormField
                  label="Terminology Code"
                  staticInformation="12393890"
                />
              </Col>
            </Row>
          </div>
        </form>
      </div>)
  }
}
