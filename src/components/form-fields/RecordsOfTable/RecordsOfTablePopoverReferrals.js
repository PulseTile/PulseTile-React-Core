import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';

// THESE PLUGINS WERE EXTRACTED FROM MAIN AND RELOCATED TO SILVER-PLUGINS
// import { valuesLabels, valuesNames } from '../../pages/Referrals/forms.config';

export default class RecordsOfTablePopoverReferrals extends PureComponent {

  static propTypes = {
    detail: PropTypes.object,
  };

  render() {
    let { detail } = this.props;
    detail = detail || {};

    return null;

    // return (
    //   <div className="form-group-wrapper">
    //     <Row>
    //       <Col xs={12} md={6}>
    //         <div className="form-group">
    //           <label className="control-label">{valuesLabels.FROM}</label>
    //           <div className="form-control-static">{detail[valuesNames.FROM]}</div>
    //         </div>
    //       </Col>
    //       <Col xs={12} md={6}>
    //         <div className="form-group">
    //           <label className="control-label">{valuesLabels.TO}</label>
    //           <div className="form-control-static">{detail[valuesNames.TO]}</div>
    //         </div>
    //       </Col>
    //     </Row>
    //     <div className="form-group">
    //       <label className="control-label">{valuesLabels.DATE}</label>
    //       <div className="form-control-static">{getDDMMMYYYY(detail[valuesNames.DATE])}</div>
    //     </div>
    //     <Row>
    //       <Col xs={12} md={6}>
    //         <div className="form-group">
    //           <label className="control-label">{valuesLabels.REASON}</label>
    //           <div className="form-control-static">{detail[valuesNames.REASON]}</div>
    //         </div>
    //       </Col>
    //       <Col xs={12} md={6}>
    //         <div className="form-group">
    //           <label className="control-label">{valuesLabels.SUMMARY}</label>
    //           <div className="form-control-static">{detail[valuesNames.SUMMARY]}</div>
    //         </div>
    //       </Col>
    //     </Row>
    //     <div className="form-group">
    //       <label className="control-label">{valuesLabels.STATE_DATE}</label>
    //       <div className="form-control-static">{getDDMMMYYYY(detail[valuesNames.STATE_DATE])}</div>
    //     </div>
    //   </div>
    // )
  }
}
