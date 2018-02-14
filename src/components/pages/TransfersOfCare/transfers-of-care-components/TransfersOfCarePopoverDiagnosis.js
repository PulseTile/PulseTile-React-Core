import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { valuesLabels, valuesNames } from '../../ProblemsDiagnosis/forms.config';

export default class TransfersOfCarePopoverDiagnosis extends PureComponent {
  static propTypes = {
    detail: PropTypes.object,
  };

  render() {
    let { detail } = this.props;
    detail = detail || {};

    return (
      <div className="form-group-wrapper">
        <Row>
          <Col xs={12} md={6}>
            <div className="form-group">
              <label className="control-label">{valuesLabels.PROBLEM}</label>
              <div className="form-control-static">{detail[valuesNames.PROBLEM]}</div>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="form-group">
              <label className="control-label">{valuesLabels.DATE_OF_ONSET}</label>
              <div className="form-control-static">{getDDMMMYYYY(detail[valuesNames.DATE_OF_ONSET])}</div>
            </div>
          </Col>
        </Row>

        <div className="form-group">
          <label className="control-label">{valuesLabels.DESCRIPTION}</label>
          <div className="form-control-static">{detail[valuesNames.DESCRIPTION]}</div>
        </div>
        {/*<div className="form-group">*/}
        {/*<label className="control-label">NHS Choices Web Page URL</label>*/}
        {/*<div className="form-control-static">{{data.diagnosis.url}}</div>*/}
        {/*</div>*/}

        <Row>
          <Col xs={12} md={6}>
            <div className="form-group">
              <label className="control-label">{valuesLabels.TERMINOLOGY}</label>
              <div className="form-control-static">{detail[valuesNames.TERMINOLOGY]}</div>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="form-group">
              <label className="control-label">{valuesLabels.CODE}</label>
              <div className="form-control-static">{detail[valuesNames.CODE]}</div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
