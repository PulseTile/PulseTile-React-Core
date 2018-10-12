import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';
import { valuesLabels, valuesNames } from '../../pages/Medications/forms.config';

export default class RecordsOfTablePopoverMedications extends PureComponent {
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
              <label className="control-label">{valuesLabels.DOSE_AMOUNT}</label>
              <div className="form-control-static">{detail[valuesNames.DOSE_AMOUNT]}</div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={6}>
            <div className="form-group">
              <label className="control-label">{valuesLabels.DOSE_TIMING}</label>
              <div className="form-control-static">{detail[valuesNames.DOSE_TIMING]}</div>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="form-group">
              <label className="control-label">{valuesLabels.DOSE_DIRECTIONS}</label>
              <div className="form-control-static">{detail[valuesNames.DOSE_DIRECTIONS]}</div>
            </div>
          </Col>
        </Row>

        <div className="col-expand-right">
          <div className="form-group">
            <label className="control-label">{valuesLabels.START_DATE}</label>
            <div className="form-control-static">{getDDMMMYYYY(detail[valuesNames.START_DATE])}</div>
          </div>
        </div>
      </div>
    )
  }
}
