import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Row, Col } from 'react-bootstrap';

import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import DateInput from '../../../form-fields/DateInput';
import { optionsForGenderField } from './options-for-select.config';
import Select from '../../../form-fields/SelectFormGroup';
import { validatePersonalForm } from './validation';
import { valuesPersonalForm } from './values-names.config';
import { defaultPersonalFormValues } from './default-values.config';

@reduxForm({
  form: 'personalFormSelector',
  validate: validatePersonalForm,
})
export default class PersonalForm extends PureComponent {
  componentDidMount() {
    this.props.initialize(defaultPersonalFormValues);
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
                      label="First Name"
                      name={valuesPersonalForm.FIRST_NAME}
                      type="text"
                      placeholder=""
                      component={ValidatedInput}
                    />
                    <Field
                      label="Last Name"
                      name={valuesPersonalForm.LAST_NAME}
                      type="text"
                      placeholder=""
                      component={ValidatedInput}
                    />
                    <Field
                      label="NHS No"
                      name={valuesPersonalForm.NHS_NUMBER}
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
                      name={valuesPersonalForm.DATE_OF_BIRTH}
                      type="text"
                      placeholder=""
                      component={DateInput}
                      props={{ format: 'DD-MMM-YYYY' }}
                    />
                    <Field
                      label="Gender"
                      name={valuesPersonalForm.SELECT_GENDER}
                      placeholder=""
                      component={Select}
                      options={optionsForGenderField}
                    />
                    <Field
                      label="Doctor"
                      name={valuesPersonalForm.DOCTOR}
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
