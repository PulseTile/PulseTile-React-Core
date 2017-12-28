import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import classNames from "classnames";

export default class ConfirmationModal extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    isShow: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isShowOkButton: false,
    isShowCancelButton: false,
    textOkButton: 'Ok',
    textCancelButton: 'Cancel'
  };

  render() {
    const { title, onOk, onCancel, onHide, isShow, isShowOkButton, isShowCancelButton, textOkButton, textCancelButton, iconsClasses, children } = this.props;
    return (
      <Modal show={ isShow } onHide={ onHide }>
        <div className="panel panel-secondary without-margin">
          <div className="panel-heading">
            <h3 className="panel-title">{ title }</h3>
          </div>

          <div className="panel-body">
            <div className="panel-body-inner">
              { children }
            </div>
            <div className="panel-control">
              <div className="wrap-control-group hide-indent-bottom">
                <div className="control-group with-indent right">
                  { isShowCancelButton
                    ? <button className="btn btn-danger btn-icon-normal" onClick={ onCancel }>
                        { iconsClasses && iconsClasses.cancel
                            ? <i className={classNames(`btn-icon fa ${iconsClasses.cancel}`)} />
                            : null }
                        <span className="btn-text"> { textCancelButton }</span>
                      </button>
                    : null }
                  { isShowOkButton
                    ? <button className="btn btn-success" onClick={ onOk }>
                        { iconsClasses && iconsClasses.ok
                          ? <i className={classNames(`btn-icon fa ${iconsClasses.ok}`)} />
                          : null }
                        <span className="btn-text"> { textOkButton }</span>
                      </button>
                    : null }
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}
