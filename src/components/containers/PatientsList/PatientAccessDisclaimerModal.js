import React from 'react';
import PropTypes from 'prop-types';
import ConfirmationModal from '../../ui-elements/ConfirmationModal/ConfirmationModal';

const PatientAccessDisclaimerModal = ({ onAgreeRedirectTo, onClose, isVisible, ...restProps }) => {
  const handleAgree = () => restProps.history.push(onAgreeRedirectTo);

  return (
    <ConfirmationModal
      title={'Patient Access Disclaimer'}
      isShow={isVisible}
      onOk={handleAgree}
      onCancel={onClose}
      onHide={onClose}
      textOkButton={'Agree'}
      textCancelButton={'Decline'}
      iconsClasses={{cancel: 'fa-ban'}}
      isShowOkButton
      isShowCancelButton
    >
      <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec lobortis elit. Aenean mi nunc, feugiat ut aliquet non, iaculis vel tellus. Donec semper felis placerat, posuere nisi a, suscipit turpis. Integer sit amet lacus pellentesque, vestibulum libero id, sagittis nisi. Phasellus eleifend, neque eget vulputate semper, enim dui dictum neque, non iaculis felis augue at nunc.</span>
    </ConfirmationModal>
  )
};

PatientAccessDisclaimerModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAgreeRedirectTo: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default PatientAccessDisclaimerModal;
