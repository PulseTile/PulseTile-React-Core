import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';

// THESE PLUGINS WERE EXTRACTED FROM MAIN AND RELOCATED TO SILVER-PLUGINS
// import { valuesLabels, valuesNames } from '../../pages/Events/forms.config';

export default class RecordsOfTablePopoverEvents extends PureComponent {
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
    //           <label className="control-label">{valuesLabels.NAME}</label>
    //           <div className="form-control-static">{detail[valuesNames.NAME]}</div>
    //         </div>
    //       </Col>
    //       <Col xs={12} md={6}>
    //         <div className="form-group">
    //           <label className="control-label">{valuesLabels.TYPE}</label>
    //           <div className="form-control-static">{detail[valuesNames.TYPE]}</div>
    //         </div>
    //       </Col>
    //     </Row>
    //
    //     <div className="form-group">
    //       <label className="control-label">{valuesLabels.DESCRIPTION}</label>
    //       <div className="form-control-static">{detail[valuesNames.DESCRIPTION]}</div>
    //     </div>
    //
    //     <Row>
    //       <Col xs={12} md={6}>
    //         <div className="form-group">
    //           <label className="control-label">{valuesLabels.LOCATION}</label>
    //           <div className="form-control-static">{detail[valuesNames.LOCATION]}</div>
    //         </div>
    //       </Col>
    //       <Col xs={12} md={6}>
    //         <div className="form-group">
    //           <label className="control-label">{valuesLabels.EVENT_DATE}</label>
    //           <div className="form-control-static">{getDDMMMYYYY(detail[valuesNames.DATE_CREATED])}</div>
    //         </div>
    //       </Col>
    //     </Row>
    //   </div>
    // )
  }
}
