import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form'
import { Row, Col } from 'react-bootstrap';

import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import FileInput from '../../../form-fields/FileInput';
import { optionsForThemesField } from './options-for-select.config';
import Select from '../../../form-fields/SelectFormGroup';
import { validateAppSettingsForm } from '../forms.validation';
import { valuesSettingsForm, valuesSettingsFormLabels } from '../forms.config';
import { setTheme } from '../../../../ducks/set-theme.duck';

@reduxForm({
  form: 'appSettingsFormSelector',
  validate: validateAppSettingsForm,
})
export default class AppSettingsForm extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func,
    initialize: PropTypes.func,
  };

  componentDidMount() {
    const { patientsInfo, initialize } = this.props;
    initialize(this.defaultValuesForm(patientsInfo));
  }

  defaultValuesForm(value) {
    const defaultFormValues = {
      [valuesSettingsForm.APP_TITLE]: value.title,
      [valuesSettingsForm.LOGO_PATH]: value.logoB64,
      [valuesSettingsForm.SELECT_THEME]: value.themeColor,
      [valuesSettingsForm.BROWSER_TITLE]: value.browserTitle,
    };

    return defaultFormValues;
  }

 setThemeHook = dispatch => (theme) => {
   dispatch(setTheme(theme));
   return theme;
 };

 render() {
   const { dispatch } = this.props;

   return (
     <div className="panel-body-inner">
       <form name="appSettingsForm" className="form">
         <div className="form-group-wrapper">
           <Row>
             <Col xs={12} md={6}>
               <Row>
                 <Col md={11}>
                   <Field
                     label={valuesSettingsFormLabels.APP_TITLE}
                     name={valuesSettingsForm.APP_TITLE}
                     type="text"
                     placeholder=""
                     component={ValidatedInput}
                   />
                   <Field
                     label={valuesSettingsFormLabels.LOGO_PATH}
                     name={valuesSettingsForm.LOGO_PATH}
                     component={FileInput}
                     id={valuesSettingsForm.LOGO_PATH}
                   />
                   <Field
                     label={valuesSettingsFormLabels.SELECT_THEME}
                     name={valuesSettingsForm.SELECT_THEME}
                     component={Select}
                     options={optionsForThemesField}
                     //here we're using normalize hook for dispatching action to set app theme
                     normalize={this.setThemeHook(dispatch)}
                   />
                   <Field
                     label={valuesSettingsFormLabels.BROWSER_TITLE}
                     name={valuesSettingsForm.BROWSER_TITLE}
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
