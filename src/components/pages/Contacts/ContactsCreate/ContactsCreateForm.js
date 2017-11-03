import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Row, Col } from 'react-bootstrap';

import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import ValidatedTextareaFormGroup from '../../../form-fields/ValidatedTextareaFormGroup';
import SelectFormGroup from '../../../form-fields/SelectFormGroup';
import DateInput from '../../../form-fields/DateInput';
import StaticFormField from '../../../form-fields/StaticFormField';
import { validateForm } from '../forms.validation';
import { valuesNames, valuesLabels, relationshipOptions } from '../forms.config';
import { defaultFormValues } from './default-values.config';
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';

@reduxForm({
  form: 'contactsCreateFormSelector',
  validate: validateForm,
})
export default class ContactsCreateForm extends PureComponent {
  componentDidMount() {
    this.props.initialize(defaultFormValues);
  }
  render() {
    const { isSubmit } = this.props;
    const isNotValidate = true;
    const date = new Date();
    const dateCreated = getDDMMMYYYY(date.getTime());

    return (
      <div className="panel-body-inner">
        <form name="contactsCreateForm" className="form">
          <div className="form-group-wrapper">
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.NAME}
                  name={valuesNames.NAME}
                  id={valuesNames.NAME}
                  type="text"
                  component={ValidatedInput}
                  props={{ isSubmit }}
                />
              </div>
            </div>

            <div className="row-expand">
              <div className="col-expand-left">
                <Row>
                  <Col md={6} xs={12}>
                    <Field
                      label={valuesLabels.REALATIONSHIP}
                      name={valuesNames.REALATIONSHIP}
                      id={valuesNames.REALATIONSHIP}
                      options={relationshipOptions}
                      component={SelectFormGroup}
                      props={{ isSubmit }}
                    />
                  </Col>
                  <Col md={6} xs={12}>
                    <Field
                      label={valuesLabels.NEXT_OF_KIN}
                      name={valuesNames.NEXT_OF_KIN}
                      id={valuesNames.NEXT_OF_KIN}
                      type="checkbox"
                      component={ValidatedInput}
                      props={{ isSubmit }}
                    />
                  </Col>
                </Row>
              </div>
              <div className="col-expand-right">
                <Field
                  label={valuesLabels.REALATIONSHIP_TYPE}
                  name={valuesNames.REALATIONSHIP_TYPE}
                  id={valuesNames.REALATIONSHIP_TYPE}
                  type="text"
                  component={ValidatedInput}
                  props={{ isSubmit }}
                />
              </div>
            </div>

            <div className="row-expand">
              <div className="col-expand-left">
                <Row>
                  <Col md={6} xs={12}>
                    <Field
                      name={valuesNames.REALATIONSHIP_TERMINOLOGY}
                      label={valuesLabels.REALATIONSHIP_TERMINOLOGY}
                      component={StaticFormField}
                      props={{ className: 'form-control-static', isSubmit }}
                    />
                  </Col>
                  <Col md={6} xs={12}>
                    <Field
                      name={valuesNames.REALATIONSHIP_CODE}
                      label={valuesLabels.REALATIONSHIP_CODE}
                      component={StaticFormField}
                      props={{ className: 'form-control-static', isSubmit }}
                    />
                  </Col>
                </Row>

              </div>
            </div>

            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.CONTACT_INFORMATION}
                  name={valuesNames.CONTACT_INFORMATION}
                  id={valuesNames.CONTACT_INFORMATION}
                  component={ValidatedTextareaFormGroup}
                  props={{ isSubmit }}
                />
              </div>
              <div className="col-expand-right">
                <Field
                  label={valuesLabels.NOTES}
                  name={valuesNames.NOTES}
                  id={valuesNames.NOTES}
                  component={ValidatedTextareaFormGroup}
                  props={{ isSubmit }}
                />
              </div>
            </div>

            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.AUTHOR}
                  name={valuesNames.AUTHOR}
                  id={valuesNames.AUTHOR}
                  component={ValidatedInput}
                  props={{ disabled: true, isSubmit }}
                />
              </div>
            </div>

            <div className="row-expand">
              <div className="col-expand-right">
                <Field
                  label={valuesLabels.DATE}
                  name={valuesNames.DATE}
                  id={valuesNames.DATE}
                  component={DateInput}
                  props={{ disabled: true, value: dateCreated, format: 'DD-MMM-YYYY', isSubmit }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>)
  }
}
