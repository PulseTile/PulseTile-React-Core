import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Row, Col } from 'react-bootstrap';

import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import FileInput from '../../../form-fields/FileInput';
import { optionsForThemesField } from './options-for-select.config';
import Select from '../../../form-fields/SelectFormGroup';

@reduxForm({ form: 'appSettingsFormSelector' })
export default class AppSettingsForm extends PureComponent {
  render() {
    return (
      <div className="panel-body-inner">
        <form name="appSettingsForm" className="form">
          <div className="form-group-wrapper">
            <Row>
              <Col xs={12} md={6}>
                <Row>
                  <Col md={11}>
                    <Field
                      label="Application Title"
                      name="applicationTitle"
                      type="text"
                      placeholder=""
                      component={ValidatedInput}
                    />
                    <Field
                      label="Application Logo File"
                      name="logoPath"
                      component={FileInput}
                      id="logoPath"
                    />
                    <Field
                      label="Application Themes"
                      name="green"
                      component={Select}
                      options={optionsForThemesField}
                    />
                    <Field
                      label="Browser Window title"
                      name="browserWindowTitle"
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
