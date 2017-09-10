import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

export default class PersonalInformationPanel extends PureComponent {
    static propTypes = {
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      isOpen: PropTypes.bool.isRequired,
      children: PropTypes.element.isRequired,
      onShow: PropTypes.func.isRequired,
      onExpand: PropTypes.func.isRequired,
    };

    render() {
      const { name, title, children, isOpen, onShow, onExpand } = this.props;

      return (
        <Row className={classNames('panel panel-secondary', { open: isOpen })}>
          <div className="panel-heading">
            <div className="control-group right">
              <button
                className="btn btn-success btn-inverse btn-square hidden-xs hidden-sm btn-expand-panel"
                onClick={() => onExpand(name)}
              >
                <i className="btn-icon fa fa-expand" />
                <i className="btn-icon fa fa-compress" />
              </button>
              <button
                className="btn btn-success btn-inverse btn-square btn-toggle-rotate"
                onClick={() => onShow(name)}
              >
                <i className="btn-icon fa fa-chevron-up" />
              </button>
            </div>
            <h3 className="panel-title">{title}</h3>
          </div>
          <div className="panel-body">
            {children}
            <div className="panel-control ng-scope">
              <div className="wrap-control-group">
                <div className="control-group right">
                  <button className="btn btn-success btn-inverse btn-edit"><i
                    className="fa fa-edit"
                  /> Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Row>
      )
    }
}
