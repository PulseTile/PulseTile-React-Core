import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Panel } from 'react-bootstrap';


const PTPanel = props => <Col xs={12} md={6}>
  <Panel header={props.header} bsStyle="secondary">
    <div className="panel-body-inner">
      {props.children}
    </div>
  </Panel>
</Col>

PTPanel.propTypes = {
  header: PropTypes.element,
  children: PropTypes.element,
};

export default PTPanel;
