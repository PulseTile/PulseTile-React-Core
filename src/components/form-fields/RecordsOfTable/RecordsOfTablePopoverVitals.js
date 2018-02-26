import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import _ from 'lodash/fp';

import { valuesAddons, valuesLabels, valuesNames } from '../../pages/Vitals/forms.config';
import { serviceVitalsSigns } from '../../pages/Vitals/viltals-helpers.utils';
import Switch from '../Switch';

export default class RecordsOfTablePopoverVitals extends PureComponent {
  static propTypes = {
    detail: PropTypes.object,
  };
  state = {
    vitalStatuses: {
      [valuesNames.RESPIRATION_RATE]: {},
      [valuesNames.OXYGEN_SATURATION]: {},
      [valuesNames.HEART_RATE]: {},
      [valuesNames.SYSTOLIC_BP]: {},
      [valuesNames.TEMPERATURE]: {},
      [valuesNames.NEWS_SCORE]: {},
    },
  };

  componentWillMount() {
    const { detail } = this.props;
    this.setVitalStatuses(detail);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.detail)) {
      this.setVitalStatuses(nextProps.detail);
    }
  }

  getHighlighterClass = (vitalName) => {
    const { vitalStatuses } = this.state;
    return serviceVitalsSigns.getHighlighterClass(vitalStatuses[vitalName]);
  };

  setVitalStatuses = (vital) => {
    if (!_.isEmpty(vital)) {
      const vitalDetail = serviceVitalsSigns.convertVitalCharacteristics(vital);
      const vitalStatuses = serviceVitalsSigns.setVitalStatuses(vitalDetail);

      vitalStatuses.newsScore = serviceVitalsSigns.getStatusOnValue(vitalDetail.newsScore, 'newsScore');

      this.setState({ vitalStatuses });
    }
  };

  render() {
    let { detail } = this.props;
    const { vitalStatuses } = this.state;
    detail = detail || {};

    return (
      <div className="form-group-wrapper">
        <div className="row-expand">
          <div className="col-expand-left">
            <Row>
              <Col xs={12} md={6}>
                <div className="vitals-group highlighter-wrapper">
                  <span className={`${this.getHighlighterClass(valuesNames.RESPIRATION_RATE)}`} />
                  <label className="vitals-label">{valuesLabels.RESPIRATION_RATE}</label>
                  <div className={`input-group vitals-holder popover-wrap ${vitalStatuses[valuesNames.RESPIRATION_RATE].type}`} >
                    <div className="form-control input-sm">{detail[valuesNames.RESPIRATION_RATE]}</div>
                    <span className="vitals-addon">{valuesAddons.RESPIRATION_RATE}</span>
                  </div>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div className="vitals-group highlighter-wrapper">
                  <span className={`${this.getHighlighterClass(valuesNames.OXYGEN_SATURATION)}`} />
                  <label className="vitals-label">{valuesLabels.OXYGEN_SATURATION}</label>
                  <div className={`input-group vitals-holder popover-wrap ${vitalStatuses[valuesNames.OXYGEN_SATURATION].type}`} >
                    <div className="form-control input-sm">{detail[valuesNames.OXYGEN_SATURATION]}</div>
                    <span className="vitals-addon">{valuesAddons.OXYGEN_SATURATION}</span>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <div className="vitals-group highlighter-wrapper">
                  <span className={`${this.getHighlighterClass(valuesNames.OXYGEN_SUPPLEMENTAL)}`} />
                  <label className="vitals-label">{valuesLabels.OXYGEN_SUPPLEMENTAL}</label>
                  <div className="input-holder">
                    <Switch
                      type="checkbox"
                      name={valuesNames.OXYGEN_SUPPLEMENTAL}
                      disabled
                      value={detail[valuesNames.OXYGEN_SUPPLEMENTAL]}
                    />
                  </div>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div className="vitals-group highlighter-wrapper">
                  <span className={`${this.getHighlighterClass(valuesNames.HEART_RATE)}`} />
                  <label className="vitals-label">{valuesLabels.HEART_RATE}</label>
                  <div className={`input-group vitals-holder popover-wrap ${vitalStatuses[valuesNames.HEART_RATE].type}`} >
                    <div className="form-control input-sm">{detail[valuesNames.HEART_RATE]}</div>
                    <span className="vitals-addon">{valuesAddons.HEART_RATE}</span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="col-expand-right">
            <Row>
              <Col xs={12} md={6}>
                <div className="vitals-group highlighter-wrapper">
                  <span className={`${this.getHighlighterClass(valuesNames.SYSTOLIC_BP)}`} />
                  <label className="vitals-label">{valuesLabels.SYSTOLIC_BP}</label>
                  <div className={`input-group vitals-holder popover-wrap ${vitalStatuses[valuesNames.SYSTOLIC_BP].type}`} >
                    <div className="form-control input-sm">{detail[valuesNames.SYSTOLIC_BP]}</div>
                    <span className="vitals-addon">{valuesAddons.SYSTOLIC_BP}</span>
                  </div>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div className="vitals-group highlighter-wrapper">
                  <span className="highlighter-not-vital" />
                  <label className="vitals-label">{valuesLabels.DIASTOLIC_BP}</label>
                  <div className="input-group vitals-holder">
                    <div className="form-control input-sm">{detail[valuesNames.DIASTOLIC_BP]}</div>
                    <span className="vitals-addon">{valuesAddons.DIASTOLIC_BP}</span>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <div className="vitals-group highlighter-wrapper">
                  <span className={`${this.getHighlighterClass(valuesNames.LEVEL_OF_CONSCIOUSNESS)}`} />
                  <label htmlFor={valuesNames.LEVEL_OF_CONSCIOUSNESS} className="vitals-label">{valuesLabels.LEVEL_OF_CONSCIOUSNESS}</label>
                  <div className="input-holder">
                    <div className="switch-group">
                      <Switch
                        type="radio"
                        name={valuesNames.LEVEL_OF_CONSCIOUSNESS}
                        disabled
                        value="Alert"
                        transitionValue={detail[valuesNames.LEVEL_OF_CONSCIOUSNESS]}
                        text="A"
                        id="levelOfConsciousnessA"
                      />
                      <Switch
                        type="radio"
                        name={valuesNames.LEVEL_OF_CONSCIOUSNESS}
                        disabled
                        value="Voice"
                        transitionValue={detail[valuesNames.LEVEL_OF_CONSCIOUSNESS]}
                        text="V"
                        id="levelOfConsciousnessV"
                      />
                      <Switch
                        type="radio"
                        name={valuesNames.LEVEL_OF_CONSCIOUSNESS}
                        disabled
                        value="Pain"
                        transitionValue={detail[valuesNames.LEVEL_OF_CONSCIOUSNESS]}
                        text="P"
                        id="levelOfConsciousnessP"
                      />
                      <Switch
                        type="radio"
                        name={valuesNames.LEVEL_OF_CONSCIOUSNESS}
                        disabled
                        value="Unresponsive"
                        transitionValue={detail[valuesNames.LEVEL_OF_CONSCIOUSNESS]}
                        text="U"
                        id="levelOfConsciousnessU"
                      />
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div className="vitals-group highlighter-wrapper">
                  <span className={`${this.getHighlighterClass(valuesNames.TEMPERATURE)}`} />
                  <label className="vitals-label">{valuesLabels.TEMPERATURE}</label>
                  <div className={`input-group vitals-holder popover-wrap ${vitalStatuses[valuesNames.TEMPERATURE].type}`} >
                    <div className="form-control input-sm">{detail[valuesNames.TEMPERATURE]}</div>
                    <span className="vitals-addon">{valuesAddons.TEMPERATURE}</span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="row-expand">
          <div className="col-expand-left">
            <div className="vitals-group highlighter-wrapper">
              <span className={`${this.getHighlighterClass(valuesNames.NEWS_SCORE)}`} />
              <label className="vitals-label">{valuesLabels.NEWS_SCORE}</label>
              <div className={`input-holder vitals-holder ${vitalStatuses[valuesNames.NEWS_SCORE].type}`}>
                <div className="form-control input-sm">{detail[valuesNames.NEWS_SCORE]}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
