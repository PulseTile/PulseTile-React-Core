import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Row, Col } from 'react-bootstrap';

import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import { optionsForCountryField } from './options-for-select.config';
import Select from '../../../form-fields/SelectFormGroup';
import { validateContactForm } from './validation';
import { valuesContactForm, valuesContactFormLabels } from './values-names.config';
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
        <form name="contactForm" className="form">
          <div className="form-group-wrapper">
            <Row>
              <Col xs={12} md={6}>
                <Row>
                  <Col md={11}>
                    <Field
                      label={valuesContactFormLabels.ADDRESS}
                      name={valuesContactForm.ADDRESS}
                      type="text"
                      placeholder=""
                      component={ValidatedInput}
                    />
                    <Field
                      label={valuesContactFormLabels.CITY}
                      name={valuesContactForm.CITY}
                      type="text"
                      placeholder=""
                      component={ValidatedInput}
                    />
                    <Field
                      label={valuesContactFormLabels.STATE}
                      name={valuesContactForm.STATE}
                      type="text"
                      placeholder=""
                      component={ValidatedInput}
                    />
                    <Field
                      label={valuesContactFormLabels.POSTAL_CODE}
                      name={valuesContactForm.POSTAL_CODE}
                      type="text"
                      placeholder=""
                      component={ValidatedInput}
                    />
                    <Field
                      label={valuesContactFormLabels.SELECT_COUNTRY}
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
                      label={valuesContactFormLabels.PHONE}
                      name={valuesContactForm.PHONE}
                      type="text"
                      placeholder=""
                      component={ValidatedInput}
                    />
                    <Field
                      label={valuesContactFormLabels.EMAIL}
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
