import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Row, Col } from 'react-bootstrap';

import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import DateInput from '../../../form-fields/DateInput';
import { optionsForGenderField } from './options-for-select.config';
import Select from '../../../form-fields/SelectFormGroup';
import { validatePersonalForm } from './validation';

@reduxForm({
  form: 'personalFormSelector',
  validate: validatePersonalForm,
})
export default class PersonalForm extends PureComponent {
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
                      label="First Name"
                      name="firstname"
                      type="text"
                      placeholder=""
                      component={ValidatedInput}
                    />
                    <Field
                      label="Last Name"
                      name="lastname"
                      type="text"
                      placeholder=""
                      component={ValidatedInput}
                    />
                    <Field
                      label="NHS No"
                      name="nhs"
                      type="text"
                      placeholder=""
                      component={ValidatedInput}
                    />
                  </Col>
                </Row>
              </Col>
              <Col xs={12} md={6}>
                <Row>
                  <Col md={11} mdOffset={1}>
                    <Field
                      label="Date of Birth"
                      name="birthday"
                      type="text"
                      placeholder=""
                      component={DateInput}
                    />
                    <Field
                      label="Gender"
                      name="gender"
                      placeholder=""
                      component={Select}
                      options={optionsForGenderField}
                    />
                    <Field
                      label="Doctor"
                      name="doctor"
                      type="text"
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
