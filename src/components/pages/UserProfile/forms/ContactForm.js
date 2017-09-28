import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Row, Col } from 'react-bootstrap';

import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import { optionsForCountryField } from './options-for-select.config';
import Select from '../../../form-fields/SelectFormGroup';
import { validateContactForm } from './validation';

@reduxForm({
  form: 'contactFormSelector',
  validate: validateContactForm,
})
export default class ContactForm extends PureComponent {
  render() {
    return (
      <div className="panel-body-inner">
        <form name="personalForm" className="form">
          <div className="form-group-wrapper">
            <Row>
              <Col xs={12} md={6}>
                <Row>
                  <Col md={11}>
                    <Field
                      label="Address"
                      name="address"
                      type="text"
                      placeholder=""
                      component={ValidatedInput}
                    />
                    <Field
                      label="City"
                      name="city"
                      type="text"
                      placeholder=""
                      component={ValidatedInput}
                    />
                    <Field
                      label="State"
                      name="state"
                      type="text"
                      placeholder=""
                      component={ValidatedInput}
                    />
                    <Field
                      label="Postal Code"
                      name="postalCode"
                      type="text"
                      placeholder=""
                      component={ValidatedInput}
                    />
                    <Field
                      label="Country"
                      name="country"
                      placeholder=""
                      component={Select}
                      options={optionsForCountryField}
                    />
                  </Col>
                </Row>
              </Col>
              <Col xs={12} md={6}>
                <Row>
                  <Col md={11} mdOffset={1}>
                    <Field
                      label="Phone Number"
                      name="phone"
                      type="text"
                      placeholder=""
                      component={ValidatedInput}
                    />
                    <Field
                      label="Email"
                      name="email"
                      placeholder=""
                      component={ValidatedInput}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </form>
      </div>)
  }
}
