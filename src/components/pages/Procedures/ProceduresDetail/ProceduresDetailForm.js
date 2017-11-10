import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Row, Col } from 'react-bootstrap';

import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import ValidatedTextareaFormGroup from '../../../form-fields/ValidatedTextareaFormGroup';
import SelectFormGroup from '../../../form-fields/SelectFormGroup';
import DateInput from '../../../form-fields/DateInput';
import { validateForm } from '../forms.validation';
import { valuesNames, valuesLabels } from '../forms.config';

@reduxForm({
  form: 'proceduresDetailFormSelector',
  validate: validateForm,
})

export default class ContactsDetailForm extends PureComponent {
  componentDidMount() {
    const { detail, initialize } = this.props;
    initialize(this.defaultValuesForm(detail));
  }
  defaultValuesForm(value) {
    const defaultFormValues = {
      [valuesNames.NAME]: value.name,
      [valuesNames.REALATIONSHIP]: value.relationship,
      [valuesNames.NEXT_OF_KIN]: value.nextOfKin,
      [valuesNames.REALATIONSHIP_TYPE]: value.relationshipType,
      [valuesNames.CONTACT_INFORMATION]: value.procedureInformation,
      [valuesNames.NOTES]: value.notes,
      [valuesNames.AUTHOR]: value.author,
    };

    return defaultFormValues;
  }
  render() {
    const { detail, isSubmit } = this.props;
    return (
      <div className="panel-body-inner">
        <form name="proceduresDetailForm" className="form">
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
                  props={{ disabled: true, value: detail.dateCreated, format: 'DD-MMM-YYYY', isSubmit }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>)
  }
}
