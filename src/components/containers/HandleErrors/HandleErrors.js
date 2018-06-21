import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { get } from 'lodash';
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

  isSessionExpired = requestError => {
    const errorMessages = [
      'Authorization Header missing or JWT not found in header (expected format: Bearer {{JWT}}',
      'Invalid JWT: Error: Token expired',
      'Invalid JWT: Error: No token supplied',
    ];
    const requestErrorStatus = get(requestError, 'payload.status', '');
    const requestErrorMessage = get(requestError, 'payload.xhr.response.error', '');
    return (requestErrorStatus === 400 && errorMessages.indexOf(requestErrorMessage) !== -1) || requestErrorStatus === 403;
  };

  getErrorMessage = requestError => {
    const requestErrorMessage = get(requestError, 'payload.xhr.response.error', '');
    return requestErrorMessage ? ('Error 400: ' + requestErrorMessage) : 'API request is invalid';
  };

  getErrorConfig = () => {
    const { requestError } = this.props;
    const requestErrorStatus = requestError.payload.status;
    switch (true) {
      case (this.isSessionExpired(requestError)):
        return {
          eventOk: this.redirectIndexPage,
          eventHide: this.redirectIndexPage,
          textButton: 'Login Again',
          textMessage: 'Your session has expired. Click the button to log in again',
        };
      case ('application/rss+xml' === get(requestError, 'payload.request.responseType', '')):
        return null;
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
      case requestErrorStatus === 400:
        return {
          eventOk: this.closeModal,
          eventHide: this.closeModal,
          textButton: 'Ok',
          textMessage: this.getErrorMessage(requestError),
        };
      case requestErrorStatus === 404:
        return {
          eventOk: this.closeModal,
          eventHide: this.closeModal,
          textButton: 'Ok',
          textMessage: 'API is currently unavailable',
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

  redirectIndexPage = () => {
    document.cookie = 'JSESSIONID=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    window.location.replace('/');
  };

  render() {
    const { isOpenModal } = this.state;
    const config = this.getErrorConfig();
    if (config) {
      return (
        <div>
          {isOpenModal &&
            <ConfirmationModal
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
      );
    }
    return null;

  }
}

export default connect(requestErrorSelector)(HandleErrors)
