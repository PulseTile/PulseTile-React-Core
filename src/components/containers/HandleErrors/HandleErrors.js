import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import requestErrorSelector from './selectors';
import ConfirmationModal from '../../ui-elements/ConfirmationModal/ConfirmationModal';

export class HandleErrors extends Component {
  static propTypes = {
    requestError: PropTypes.object.isRequired,
  };

  state = {
    isOpenModal: true,
    countErrorRequest: 0,
  };

  componentDidMount() {
    this.setState({ countErrorRequest: this.state.countErrorRequest + 1 })
  }

  componentWillReceiveProps() {
    this.setState({ countErrorRequest: this.state.countErrorRequest + 1, isOpenModal: true })
  }

  getErrorConfig = () => {
    const { requestError } = this.props;
    const requestErrorStatus = requestError.payload.status;
    switch (true) {
      case (requestError.initialiseError || requestErrorStatus === 0):
        return {
          eventOk: this.reloadPage,
          eventHide: this.reloadPage,
          textButton: 'Reload Page',
          textMessage: 'Some connection error has occurred. Please check your connection and try again.',
        };
      case requestErrorStatus > 499:
        return {
          eventOk: this.reloadPage,
          eventHide: this.closeModal,
          eventCancel: this.closeModal,
          isShowCancelButton: true,
          textButton: 'Reload Page',
          textMessage: 'Something is wrong with the server. Please try again later.',
        };
      case requestErrorStatus === 403:
        return {
          eventOk: this.reloadPage,
          eventHide: this.closeModal,
          eventCancel: this.closeModal,
          isShowCancelButton: true,
          textButton: 'Reload Page',
          textMessage: 'Your token has been expired. Please reload the page.',
        };
      case (requestErrorStatus === 400 || requestErrorStatus === 404):
        return {
          eventOk: this.closeModal,
          eventHide: this.closeModal,
          textButton: 'Ok',
          textMessage: 'Current request is invalid.',
        };
      default:
        return {
          eventOk: this.closeModal,
          eventHide: this.closeModal,
          textButton: 'Ok',
          textMessage: 'Something wrong',
        }
    }
  };

  closeModal = () => {
    this.setState({ isOpenModal: false })
  };

  reloadPage = () => {
    location.reload()
  };

  render() {
    const { isOpenModal } = this.state;
    const config = this.getErrorConfig();
    return (
      <div>
        {isOpenModal && <ConfirmationModal
          title={'Connection Error'}
          onOk={config.eventOk}
          onHide={config.eventHide}
          onCancel={config.eventCancel}
          isShow
          textOkButton={config.textButton}
          isShowOkButton
          isShowCancelButton={config.isShowCancelButton}
        >
          <span>{config.textMessage}</span>
        </ConfirmationModal> }
      </div>
    )
  }
}

export default connect(requestErrorSelector)(HandleErrors)
