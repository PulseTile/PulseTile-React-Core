import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Row, Col } from 'react-bootstrap';

import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import DateInput from '../../../form-fields/DateInput';
import { optionsForGenderField } from './options-for-select.config';
import Select from '../../../form-fields/SelectFormGroup';
import { validatePersonalForm } from '../forms.validation';
import { valuesPersonalForm, valuesPersonalFormLabels } from '../forms.config';
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
                      label={valuesPersonalFormLabels.FIRST_NAME}
                      name={valuesPersonalForm.FIRST_NAME}
                      type="text"
                      placeholder=""
                      component={ValidatedInput}
                    />
                    <Field
                      label={valuesPersonalFormLabels.LAST_NAME}
                      name={valuesPersonalForm.LAST_NAME}
                      type="text"
                      placeholder=""
                      component={ValidatedInput}
                    />
                    <Field
                      label={valuesPersonalFormLabels.NHS_NUMBER}
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
                      label={valuesPersonalFormLabels.DATE_OF_BIRTH}
                      name={valuesPersonalForm.DATE_OF_BIRTH}
                      type="text"
                      placeholder=""
                      component={DateInput}
                      props={{ format: 'DD-MMM-YYYY' }}
                    />
                    <Field
                      label={valuesPersonalFormLabels.SELECT_GENDER}
                      name={valuesPersonalForm.SELECT_GENDER}
                      placeholder=""
                      component={Select}
                      options={optionsForGenderField}
                    />
                    <Field
                      label={valuesPersonalFormLabels.DOCTOR}
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
