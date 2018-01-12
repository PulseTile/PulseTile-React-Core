import React from 'react';
import PropTypes from 'prop-types';
import { Col, Panel } from 'react-bootstrap';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';

bootstrapUtils.addStyle(Panel, 'secondary');

const PTPanel = props => <Col xs={12} md={6}>
  <Panel header={props.header} bsStyle="secondary" className="mainPagePanel">
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
