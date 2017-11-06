import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'
import _ from 'lodash/fp';

import DateInput from '../../../../form-fields/DateInput';
import CustomInputInline from '../../../../form-fields/CustomInputInline';
import StaticFormField from '../../../../form-fields/StaticFormField';
import SelectFormGroup from '../../../../form-fields/SelectFormGroup';
import PTButton from '../../../../ui-elements/PTButton/PTButton';
import { valuesNames, valuesLabels, routeOptions } from '../../MedicationsCreate/MedicationsCreateForm/values-names.config';

@reduxForm({
  form: 'medicationsPrescriptionFormSelector',
})
export default class MedicationsPrescriptionForm extends PureComponent {
  state={
    prescriptionFormValue: {},
  };
  componentDidMount() {
    const { detail, initialize } = this.props;
    initialize(this.defaultValuesForm(detail));
  }
  componentWillReceiveProps(nextProps) {
    this.state.prescriptionFormValue = nextProps.formValues;
  }
  defaultValuesForm(value) {
    const defaultFormValues = {
      [valuesNames.NAME]: value.name,
      [valuesNames.DOSE_AMOUNT]: value.doseAmount,
      [valuesNames.DOSE_INTERVAL]: '',
      [valuesNames.DOSE_QUANTITY]: '',
    };

    return defaultFormValues;
  }
  render() {
    const { detail, isSubmit, isOpenHourlySchedule, toggleHourlySchedule } = this.props;
    const { prescriptionFormValue } = this.state;
    const currentDate = new Date();
    return (
      <div className="panel-body-inner">
        <form name="prescriptionForm" className="form">
          <div className="panel-body-section">
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  name={valuesNames.NAME}
                  label={valuesLabels.NAME}
                  component={StaticFormField}
                  props={{ className: 'form-control-static' }}
                />
              </div>
              <div className="col-expand-right">
                <Field
                  name={valuesNames.DOSE_AMOUNT}
                  label={valuesLabels.DOSE_AMOUNT}
                  component={StaticFormField}
                  props={{ className: 'form-control-static' }}
                />
              </div>
            </div>
          </div>
          <div className="row-expand">
            <div className="col-expand-left"></div>
            <div className="col-expand-right"></div>
          </div>
          <div className="panel-body-section">
            <div className="row-expand">
              <div className="col-expand-left">
                <div className="form-group">
                  <label className="control-label">Dose Interval</label>
                  <div className="input-holder">
                    <div className="wrap-fcustominps-inline">
                      <Field
                        label="Morning"
                        name={valuesNames.DOSE_INTERVAL}
                        id="doseIntervalMorning"
                        type="radio"
                        value="morning"
                        className="fcustominp-label"
                        component={CustomInputInline}
                      />
                      <Field
                        label="Evening"
                        name={valuesNames.DOSE_INTERVAL}
                        id="doseIntervalEvening"
                        type="radio"
                        value="evening"
                        className="fcustominp-label"
                        component={CustomInputInline}
                      />
                      <Field
                        label="Specific"
                        name={valuesNames.DOSE_INTERVAL}
                        id="doseIntervalSpecific"
                        type="radio"
                        value="specific"
                        className="fcustominp-label"
                        component={CustomInputInline}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-expand-right">
                <div className="form-group">
                  <label className="control-label">Dose Quantity</label>
                  <div className="input-holder">
                    <div className="wrap-fcustominps-inline">
                      <Field
                        label="1X"
                        name={valuesNames.DOSE_QUANTITY}
                        id="doseQuantity1x"
                        type="radio"
                        value="1x"
                        className="fcustominp-label"
                        component={CustomInputInline}
                      />
                      <Field
                        label="2X"
                        name={valuesNames.DOSE_QUANTITY}
                        id="doseQuantity2x"
                        type="radio"
                        value="2x"
                        className="fcustominp-label"
                        component={CustomInputInline}
                      />
                      <Field
                        label="3X"
                        name={valuesNames.DOSE_QUANTITY}
                        id="doseQuantity3x"
                        type="radio"
                        value="3x"
                        className="fcustominp-label"
                        component={CustomInputInline}
                      />
                      <Field
                        label="4X"
                        name={valuesNames.DOSE_QUANTITY}
                        id="doseQuantity4x"
                        type="radio"
                        value="4x"
                        className="fcustominp-label"
                        component={CustomInputInline}
                      />
                      <Field
                        label="Other"
                        name={valuesNames.DOSE_QUANTITY}
                        id="doseQuantityOther"
                        type="radio"
                        value="other"
                        className="fcustominp-label"
                        component={CustomInputInline}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.ROUTE}
                  name={valuesNames.ROUTE}
                  id={valuesNames.ROUTE}
                  options={routeOptions}
                  component={SelectFormGroup}
                  props={{ isSubmit, placeholder: '-- Route --' }}
                />
              </div>
            </div>

            {(!_.isEmpty(prescriptionFormValue[valuesNames.DOSE_INTERVAL]) && !_.isEmpty(prescriptionFormValue[valuesNames.DOSE_QUANTITY])) ? <div className="row-expand">
              <div className="col-expand-left">
                <div>
                  <div className="row">
                    <div className="col-xs-12 col-md-6">
                      <Field
                        label="Start"
                        name="start"
                        id="start"
                        component={DateInput}
                        props={{ value: currentDate, format: 'DD-MMM-YYYY', isSubmit }}
                      />
                    </div>
                    <div className="col-xs-12 col-md-6">
                      <div className="form-group">
                        <label className="control-label hidden-sm"></label>
                        <div className="input-holder">
                          <Field
                            label="Until Cancelled"
                            name={valuesNames.FINISH_CANCELLED}
                            id="finishCancelled"
                            type="checkbox"
                            className="fcustominp-label"
                            component={CustomInputInline}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12 col-md-6">
                    </div>
                  </div>
                </div>
              </div>
            </div> : null }
          </div>

          <div className="panel-body-section">
            <div className="form-group">
              <label className="control-label">Dose Timing:</label>
              <div className="non-edit-value">
                <PTButton className="btn btn-danger btn-sm btn-icon-normal btn-square">
                  <i className="btn-icon fa fa-ban" />
                </PTButton>
                <span className="ng-binding"> 2X each morning </span>
              </div>
            </div>
            <div className="form-group">
              <div className="wrap-control-group">
                <div className="control-group left">
                  <PTButton className="btn btn-success btn-sm btn-inverse btn-icon-normal btn-dropdown-toggle btn-schedule" onClick={() => toggleHourlySchedule()}>
                    <i className="btn-icon fa fa-table" />
                    <span className="btn-text"> Hourly Schedule</span>
                  </PTButton>
                </div>
              </div>
              {isOpenHourlySchedule ? <div className="schedule-block ng-scope">
                <div className="panel panel-small panel-table">
                  <div className="panel-heading">
                    <h3 className="panel-title">27-Nov-2016</h3>
                  </div>
                  <div className="panel-body">
                    <div className="wrap-table-scrollX">
                      <table className="table table-striped table-bordered table-fixedcol table-schedule">
                        <thead>
                          <tr>
                            <th>09:00</th>
                            <th>10:00</th>
                            <th className="selected">11:00</th>
                            <th>12:00</th>
                            <th>13:00</th>
                            <th>14:00</th>
                            <th>15:00</th>
                            <th className="selected">16:00</th>
                            <th>17:00</th>
                            <th>18:00</th>
                            <th>19:00</th>
                            <th>20:00</th>
                            <th className="selected">21:00</th>
                            <th>22:00</th>
                            <th>23:00</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
                            <td></td>
                            <td className="selected">2X</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="selected">2X</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="selected">2X</td>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div> : null }
            </div>
          </div>
        </form>
      </div>)
  }
}
