import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';
import { valuesLabels, valuesNames } from '../../pages/Procedures/forms.config';

export default class RecordsOfTablePopoverProcedures extends PureComponent {
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
              <label className="control-label">{valuesLabels.NAME}</label>
              <div className="form-control-static">{detail[valuesNames.NAME]}</div>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="form-group">
              <label className="control-label">{valuesLabels.DATE_OF_PROCEDURE}</label>
              <div className="form-control-static">{getDDMMMYYYY(detail[valuesNames.DATE_OF_PROCEDURE])}</div>
            </div>
          </Col>
        </Row>

        <div className="form-group">
          <label className="control-label">{valuesLabels.PERFORMER}</label>
          <div className="form-control-static">{detail[valuesNames.PERFORMER]}</div>
        </div>

        <div className="form-group">
          <label className="control-label">{valuesLabels.NOTES}</label>
          <div className="form-control-static">{detail[valuesNames.NOTES]}</div>
        </div>

        <Row>
          <Col xs={12} md={6}>
            <div className="form-group">
              <label className="control-label">{valuesLabels.DATE}</label>
              <div className="form-control-static">{getDDMMMYYYY(detail[valuesNames.DATE])}</div>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="form-group">
              <label className="control-label">{valuesLabels.SOURCE}</label>
              <div className="form-control-static">{detail[valuesNames.SOURCE]}</div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
