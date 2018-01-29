import React from 'react';
import PropTypes from 'prop-types';
import { Col, Panel } from 'react-bootstrap';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';

bootstrapUtils.addStyle(Panel, 'secondary');

const PTPanel = props => <Col className={props.className}>
  <Panel header={props.header} bsStyle="secondary" className={props.classNameForPanel}>
    <div className="panel-body-inner">
      {props.children}
    </div>
  </Panel>
</Col>

PTPanel.propTypes = {
  header: PropTypes.element.isRequired,
  children: PropTypes.element.isRequired,
  classNameForPanel: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default PTPanel;
