import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Row, Col } from 'react-bootstrap';

import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import { optionsForCountryField } from './options-for-select.config';
import Select from '../../../form-fields/SelectFormGroup';
import { validateContactForm } from './validation';
import { valuesContactForm } from './values-names.config';
import { defaultContactFormValues } from './default-values.config';

@reduxForm({
  form: 'contactFormSelector',
  validate: validateContactForm,
})
export default class ContactForm extends PureComponent {
  componentDidMount() {
    this.props.initialize(defaultContactFormValues);
  }

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
                      name={valuesContactForm.ADDRESS}
                      type="text"
                      placeholder=""
                      component={ValidatedInput}
                    />
                    <Field
                      label="City"
                      name={valuesContactForm.CITY}
                      type="text"
                      placeholder=""
                      component={ValidatedInput}
                    />
                    <Field
                      label="State"
                      name={valuesContactForm.STATE}
                      type="text"
                      placeholder=""
                      component={ValidatedInput}
                    />
                    <Field
                      label="Postal Code"
                      name={valuesContactForm.POSTAL_CODE}
                      type="text"
                      placeholder=""
                      component={ValidatedInput}
                    />
                    <Field
                      label="Country"
                      name={valuesContactForm.SELECT_COUNTRY}
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
                      name={valuesContactForm.PHONE}
                      type="text"
                      placeholder=""
                      component={ValidatedInput}
                    />
                    <Field
                      label="Email"
                      name={valuesContactForm.EMAIL}
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
