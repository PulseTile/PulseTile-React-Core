import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

const PatientAccessDisclaimerModal = ({ onAgreeRedirectTo, onClose, ...restProps }) => {
  const handleAgree = () => restProps.history.push(onAgreeRedirectTo);

  return (
    <Modal.Dialog>
      <div className="panel panel-secondary without-margin">
        <div className="panel-heading">
          <h3 className="panel-title">Patient Access Disclaimer</h3>
        </div>

        <div className="panel-body">
          <div className="panel-body-inner">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec lobortis elit. Aenean mi nunc, feugiat ut aliquet non, iaculis vel tellus. Donec semper felis placerat, posuere nisi a, suscipit turpis. Integer sit amet lacus pellentesque, vestibulum libero id, sagittis nisi. Phasellus eleifend, neque eget vulputate semper, enim dui dictum neque, non iaculis felis augue at nunc.
          </div>
          <div className="panel-control">
            <div className="wrap-control-group hide-indent-bottom">
              <div className="control-group with-indent right">
                <button className="btn btn-danger btn-icon-normal" onClick={onClose}><i className="btn-icon fa fa-ban" /> <span className="btn-text">Decline</span></button>
                <button className="btn btn-success" onClick={handleAgree}>
                  <span className="btn-text">Agree</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal.Dialog>
  )
};

PatientAccessDisclaimerModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAgreeRedirectTo: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.funct,
  }).isRequired,
};

export default PatientAccessDisclaimerModal;
