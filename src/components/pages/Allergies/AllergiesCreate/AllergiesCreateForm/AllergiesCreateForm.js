import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Row, Col } from 'react-bootstrap';

import ValidatedInput from '../../../../form-fields/ValidatedInputFormGroup';
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
          </div>
        </form>
      </div>)
  }
}
