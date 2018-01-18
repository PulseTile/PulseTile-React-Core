import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Row, Col } from 'react-bootstrap';

import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import ValidatedTextareaFormGroup from '../../../form-fields/ValidatedTextareaFormGroup';
import SelectFormGroup from '../../../form-fields/SelectFormGroup';
import DateInput from '../../../form-fields/DateInput';
import { validateForm } from '../forms.validation';
import { valuesNames, valuesLabels, relationshipOptions, relationshipTypeOptions } from '../forms.config';

@reduxForm({
  form: 'transfersOfCareDetailFormSelector',
  validate: validateForm,
})

export default class TransfersOfCareDetailForm extends PureComponent {
  componentDidMount() {
    const { detail, initialize } = this.props;
    initialize(this.defaultValuesForm(detail));
  }
  defaultValuesForm(value) {
    const defaultFormValues = {
      [valuesNames.NAME]: value[valuesNames.NAME],
      [valuesNames.REALATIONSHIP]: value[valuesNames.REALATIONSHIP],
      [valuesNames.NEXT_OF_KIN]: value[valuesNames.NEXT_OF_KIN],
      [valuesNames.REALATIONSHIP_CODE]: value[valuesNames.REALATIONSHIP_CODE],
      [valuesNames.CONTACT_INFORMATION]: value[valuesNames.CONTACT_INFORMATION],
      [valuesNames.NOTES]: value[valuesNames.NOTES],
      [valuesNames.AUTHOR]: value[valuesNames.AUTHOR],
    };

    if (!defaultFormValues[valuesNames.REALATIONSHIP_CODE]) {
      relationshipTypeOptions.forEach((el) => {
        if (el.title === value[valuesNames.REALATIONSHIP_TYPE]) {
          defaultFormValues[valuesNames.REALATIONSHIP_CODE] = el.value;
        }
      });
    }

    return defaultFormValues;
  }
  render() {
    const { detail, isSubmit } = this.props;
    return (
      <div className="panel-body-inner">
        <form name="transfersOfCareDetailForm" className="form">
          <div className="form-group-wrapper">
            {/*<div className="row-expand">*/}
              {/*<div className="col-expand-left">*/}
                {/*<Field*/}
                  {/*label={valuesLabels.NAME}*/}
                  {/*name={valuesNames.NAME}*/}
                  {/*id={valuesNames.NAME}*/}
                  {/*type="text"*/}
                  {/*component={ValidatedInput}*/}
                  {/*props={{ isSubmit }}*/}
                {/*/>*/}
              {/*</div>*/}
            {/*</div>*/}

            {/*<div className="row-expand">*/}
              {/*<div className="col-expand-left">*/}
                {/*<Row>*/}
                  {/*<Col md={6} xs={12}>*/}
                    {/*<Field*/}
                      {/*label={valuesLabels.REALATIONSHIP}*/}
                      {/*name={valuesNames.REALATIONSHIP}*/}
                      {/*id={valuesNames.REALATIONSHIP}*/}
                      {/*options={relationshipOptions}*/}
                      {/*component={SelectFormGroup}*/}
                      {/*props={{ isSubmit }}*/}
                    {/*/>*/}
                  {/*</Col>*/}
                  {/*<Col md={6} xs={12}>*/}
                    {/*<Field*/}
                      {/*label={valuesLabels.NEXT_OF_KIN}*/}
                      {/*name={valuesNames.NEXT_OF_KIN}*/}
                      {/*id={valuesNames.NEXT_OF_KIN}*/}
                      {/*type="checkbox"*/}
                      {/*component={ValidatedInput}*/}
                      {/*props={{ isSubmit }}*/}
                    {/*/>*/}
                  {/*</Col>*/}
                {/*</Row>*/}
              {/*</div>*/}
              {/*<div className="col-expand-right">*/}
                {/*<Field*/}
                  {/*label={valuesLabels.REALATIONSHIP_TYPE}*/}
                  {/*name={valuesNames.REALATIONSHIP_CODE}*/}
                  {/*id={valuesNames.REALATIONSHIP_CODE}*/}
                  {/*options={relationshipTypeOptions}*/}
                  {/*component={SelectFormGroup}*/}
                  {/*props={{ isSubmit }}*/}
                {/*/>*/}
              {/*</div>*/}
            {/*</div>*/}

            {/*<div className="row-expand">*/}
              {/*<div className="col-expand-left">*/}
                {/*<Field*/}
                  {/*label={valuesLabels.CONTACT_INFORMATION}*/}
                  {/*name={valuesNames.CONTACT_INFORMATION}*/}
                  {/*id={valuesNames.CONTACT_INFORMATION}*/}
                  {/*component={ValidatedTextareaFormGroup}*/}
                  {/*props={{ isSubmit }}*/}
                {/*/>*/}
              {/*</div>*/}
              {/*<div className="col-expand-right">*/}
                {/*<Field*/}
                  {/*label={valuesLabels.NOTES}*/}
                  {/*name={valuesNames.NOTES}*/}
                  {/*id={valuesNames.NOTES}*/}
                  {/*component={ValidatedTextareaFormGroup}*/}
                  {/*props={{ isSubmit }}*/}
                {/*/>*/}
              {/*</div>*/}
            {/*</div>*/}

            {/*<div className="row-expand">*/}
              {/*<div className="col-expand-left">*/}
                {/*<Field*/}
                  {/*label={valuesLabels.AUTHOR}*/}
                  {/*name={valuesNames.AUTHOR}*/}
                  {/*id={valuesNames.AUTHOR}*/}
                  {/*component={ValidatedInput}*/}
                  {/*props={{ disabled: true, isSubmit }}*/}
                {/*/>*/}
              {/*</div>*/}
              {/*<div className="col-expand-right">*/}
                {/*<Field*/}
                  {/*label={valuesLabels.DATE}*/}
                  {/*name={valuesNames.DATE}*/}
                  {/*id={valuesNames.DATE}*/}
                  {/*component={DateInput}*/}
                  {/*props={{ disabled: true, value: detail[valuesNames.DATE_CREATED], format: 'DD-MMM-YYYY', isSubmit }}*/}
                {/*/>*/}
              {/*</div>*/}
            {/*</div>*/}
          </div>
        </form>
      </div>)
  }
}
