import React, { PureComponent } from 'react';
import { Row, Col } from 'react-bootstrap';

import AlergiesDetailPanel from './AlergiesDetailPanel'
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';


const ALLERGIE_PANEL = 'allergiePanel';
const META_PANEL = 'metaPanel';


export default class AllergiesDetail extends PureComponent {
  render() {
    const { onExpand, name, onShow, openedPanel, expandedPanel, currentPanel, detail } = this.props;
    const dateCreated = getDDMMMYYYY(detail.dateCreated);
    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === ALLERGIE_PANEL || expandedPanel === 'all') ? <AlergiesDetailPanel
            onExpand={onExpand}
            name={ALLERGIE_PANEL}
            title="Allergy"
            onShow={onShow}
            isOpen={openedPanel === ALLERGIE_PANEL}
            currentPanel={currentPanel}
          >
            <div className="panel-body-inner">
              <div className="form">
                <div className="form-group-wrapper">
                  <Row>
                    <Col xs={12} md={6}>
                      <Row>
                        <div className="col-md-11">
                          <div className="form-group">
                            <label className="control-label">Cause</label>
                            <div className="form-control-static">{detail.cause}</div>
                          </div>

                          <div className="form-group">
                            <label className="control-label">Reaction</label>
                            <div className="form-control-static">{detail.reaction}</div>
                          </div>

                          <div className="form-group">
                            <label className="control-label">Author</label>
                            <div className="form-control-static">{detail.author}</div>
                          </div>

                          <div className="form-group">
                            <label className="control-label">Date</label>
                            <div className="form-control-static">{dateCreated}</div>
                          </div>

                          <div className="form-group">
                            <label className="control-label">Source</label>
                            <div className="form-control-static">{detail.source}</div>
                          </div>
                        </div>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </AlergiesDetailPanel> : null}
          {(expandedPanel === META_PANEL || expandedPanel === 'all') ? <AlergiesDetailPanel
            onExpand={onExpand}
            name={META_PANEL}
            title="Metadata"
            isOpen={openedPanel === META_PANEL}
            onShow={onShow}
            currentPanel={currentPanel}
          >
            <div className="panel-body-inner">
              <div className="form">
                <div className="form-group-wrapper">
                  <Row>
                    <Col xs={12} md={6}>
                      <Row>
                        <div className="col-md-11">
                          <div className="form-group">
                            <label className="control-label">Cause Code</label>
                            <div className="form-control-static">{detail.causeCode}</div>
                          </div>

                          <div className="form-group">
                            <label className="control-label">Terminology</label>
                            <div className="form-control-static">{detail.causeTerminology}</div>
                          </div>
                        </div>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </AlergiesDetailPanel> : null}
        </div>
      </div>
    )
  }
}