import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'

import VitalsInput from '../vitals-page-component/VitalsInput';
import Switch from '../../../form-fields/Switch';
import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import DateInput from '../../../form-fields/DateInput';
import { validateForm } from '../forms.validation';
import { valuesNames, valuesLabels, valuesAddons } from '../forms.config';
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';

@reduxForm({
  form: 'vitalsDetailFormSelector',
  validate: validateForm,
})

export default class VitalsDetailForm extends PureComponent {
  componentDidMount() {
    const { detail, initialize } = this.props;
    initialize(this.defaultValuesForm(detail));
  }
  defaultValuesForm(value) {
    const defaultFormValues = {
      [valuesNames.RESPIRATION_RATE]: value[valuesNames.RESPIRATION_RATE],
      [valuesNames.OXYGEN_SATURATION]: value[valuesNames.OXYGEN_SATURATION],
      [valuesNames.OXYGEN_SUPPLEMENTAL]: value[valuesNames.OXYGEN_SUPPLEMENTAL],
      [valuesNames.HEART_RATE]: value[valuesNames.HEART_RATE],
      [valuesNames.SYSTOLIC_BP]: value[valuesNames.SYSTOLIC_BP],
      [valuesNames.DIASTOLIC_BP]: value[valuesNames.DIASTOLIC_BP],
      [valuesNames.LEVEL_OF_CONSCIOUSNESS]: value[valuesNames.LEVEL_OF_CONSCIOUSNESS],
      [valuesNames.TEMPERATURE]: value[valuesNames.TEMPERATURE],
      [valuesNames.NEWS_SCORE]: value[valuesNames.NEWS_SCORE],
      [valuesNames.AUTHOR]: value[valuesNames.AUTHOR],
    };

    return defaultFormValues;
  }
  render() {
    const { detail, isSubmit, getHighlighterClass, vitalStatuses, popoverLabels } = this.props;
    const date = new Date();
    const dateCreated = getDDMMMYYYY(date.getTime());
    return (
      <div className="panel-body-inner">
        <form name="vitalsDetailForm" className="form">
          <div className="panel-body-inner">
            <div className="vitals-group-wrapper">
              <div className="row-expand">
                <div className="col-expand-left">
                  <div className="row">
                    <div className="col-xs-12 col-md-6">
                      <Field
                        label={valuesLabels.RESPIRATION_RATE}
                        name={valuesNames.RESPIRATION_RATE}
                        id={valuesNames.RESPIRATION_RATE}
                        component={VitalsInput}
                        props={{ isSubmit }}
                        getHighlighterClass={getHighlighterClass}
                        vitalStatuses={vitalStatuses}
                        popoverLabels={popoverLabels}
                        detail={detail}
                        addonName={valuesAddons.RESPIRATION_RATE}
                        isInput
                      />
                    </div>
                    <div className="col-xs-12 col-md-6">
                      <Field
                        label={valuesLabels.OXYGEN_SATURATION}
                        name={valuesNames.OXYGEN_SATURATION}
                        id={valuesNames.OXYGEN_SATURATION}
                        component={VitalsInput}
                        props={{ isSubmit }}
                        getHighlighterClass={getHighlighterClass}
                        vitalStatuses={vitalStatuses}
                        popoverLabels={popoverLabels}
                        detail={detail}
                        addonName={valuesAddons.OXYGEN_SATURATION}
                        isInput
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12 col-md-6">
                      <div className="vitals-group highlighter-wrapper">
                        <span className={`${getHighlighterClass(valuesNames.OXYGEN_SUPPLEMENTAL)}`} />
                        <label className="vitals-label">{valuesLabels.OXYGEN_SUPPLEMENTAL}</label>
                        <div className="input-holder">
                          <Field
                            name={valuesNames.OXYGEN_SUPPLEMENTAL}
                            id={valuesNames.OXYGEN_SUPPLEMENTAL}
                            component={Switch}
                            type="checkbox"
                            props={{ isSubmit }}
                            editOrCreate
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-xs-12 col-md-6">
                      <Field
                        label={valuesLabels.HEART_RATE}
                        name={valuesNames.HEART_RATE}
                        id={valuesNames.HEART_RATE}
                        component={VitalsInput}
                        props={{ isSubmit }}
                        getHighlighterClass={getHighlighterClass}
                        vitalStatuses={vitalStatuses}
                        popoverLabels={popoverLabels}
                        detail={detail}
                        addonName={valuesAddons.HEART_RATE}
                        isInput
                      />
                    </div>
                  </div>
                </div>
                <div className="col-expand-right">
                  <div className="row">
                    <div className="col-xs-12 col-md-6">
                      <Field
                        label={valuesLabels.SYSTOLIC_BP}
                        name={valuesNames.SYSTOLIC_BP}
                        id={valuesNames.SYSTOLIC_BP}
                        component={VitalsInput}
                        props={{ isSubmit }}
                        getHighlighterClass={getHighlighterClass}
                        vitalStatuses={vitalStatuses}
                        popoverLabels={popoverLabels}
                        detail={detail}
                        addonName={valuesAddons.SYSTOLIC_BP}
                        isInput
                      />
                    </div>
                    <div className="col-xs-12 col-md-6">
                      <Field
                        label={valuesLabels.DIASTOLIC_BP}
                        name={valuesNames.DIASTOLIC_BP}
                        id={valuesNames.DIASTOLIC_BP}
                        component={VitalsInput}
                        props={{ isSubmit }}
                        getHighlighterClass={getHighlighterClass}
                        vitalStatuses={vitalStatuses}
                        popoverLabels={popoverLabels}
                        detail={detail}
                        addonName={valuesAddons.DIASTOLIC_BP}
                        isInput
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12 col-md-6">
                      <div className="vitals-group highlighter-wrapper">
                        <span className={`${getHighlighterClass(valuesNames.LEVEL_OF_CONSCIOUSNESS)}`} />
                        <label className="vitals-label">{valuesLabels.LEVEL_OF_CONSCIOUSNESS}</label>
                        <div className="input-holder">
                          <div className="switch-group">
                            <Field
                              name={valuesNames.LEVEL_OF_CONSCIOUSNESS}
                              id="levelOfConsciousnessA"
                              component={Switch}
                              type="radio"
                              props={{ isSubmit }}
                              value="Alert"
                              editOrCreate
                              transitionValue={detail[valuesNames.LEVEL_OF_CONSCIOUSNESS]}
                              text="A"
                            />
                            <Field
                              name={valuesNames.LEVEL_OF_CONSCIOUSNESS}
                              id="levelOfConsciousnessV"
                              component={Switch}
                              type="radio"
                              props={{ isSubmit }}
                              value="Voice"
                              editOrCreate
                              transitionValue={detail[valuesNames.LEVEL_OF_CONSCIOUSNESS]}
                              text="V"
                            />
                            <Field
                              name={valuesNames.LEVEL_OF_CONSCIOUSNESS}
                              id="levelOfConsciousnessP"
                              component={Switch}
                              type="radio"
                              props={{ isSubmit }}
                              value="Pain"
                              editOrCreate
                              transitionValue={detail[valuesNames.LEVEL_OF_CONSCIOUSNESS]}
                              text="P"
                            />
                            <Field
                              name={valuesNames.LEVEL_OF_CONSCIOUSNESS}
                              id="levelOfConsciousnessU"
                              component={Switch}
                              type="radio"
                              props={{ isSubmit }}
                              value="Unresponsive"
                              editOrCreate
                              transitionValue={detail[valuesNames.LEVEL_OF_CONSCIOUSNESS]}
                              text="U"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xs-12 col-md-6">
                      <Field
                        label={valuesLabels.TEMPERATURE}
                        name={valuesNames.TEMPERATURE}
                        id={valuesNames.TEMPERATURE}
                        component={VitalsInput}
                        props={{ isSubmit }}
                        getHighlighterClass={getHighlighterClass}
                        vitalStatuses={vitalStatuses}
                        popoverLabels={popoverLabels}
                        detail={detail}
                        addonName={valuesAddons.TEMPERATURE}
                        isInput
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row-expand">
                <div className="col-expand-left">
                  <div className="vitals-group highlighter-wrapper">
                    <span className={`${getHighlighterClass(valuesNames.NEWS_SCORE)}`} />
                    <label className="vitals-label">{valuesLabels.NEWS_SCORE}</label>
                    <div className={`input-holder vitals-holder ${vitalStatuses[valuesNames.NEWS_SCORE].type}`}>
                      <input className="form-control input-sm" id={valuesNames.NEWS_SCORE} name={valuesNames.NEWS_SCORE} type="text" value={detail[valuesNames.NEWS_SCORE]} disabled />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="panel-body-inner">
            <div className="form-group-wrapper">
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
                <div className="col-expand-right">
                  <Field
                    label={valuesLabels.DATE_CREATED}
                    name={valuesNames.DATE_CREATED}
                    id={valuesNames.DATE_CREATED}
                    component={DateInput}
                    props={{ disabled: true, value: dateCreated, format: 'DD-MMM-YYYY', isSubmit }}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>)
  }
}
