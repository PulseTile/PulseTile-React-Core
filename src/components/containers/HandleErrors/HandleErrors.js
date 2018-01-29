import React, { Component } from 'react';
import { connect } from 'react-redux';

import requestErrorSelector from './selectors';
import ConfirmationModal from '../../ui-elements/ConfirmationModal/ConfirmationModal';

@connect(requestErrorSelector)
class HandleErrors extends Component {
  handleOk = () => location.reload();

  render() {
    const { requestError } = this.props;
    const requestErrorStatus = requestError.payload.status;
    return (
      <ConfirmationModal
        title={'Connection Error'}
        onOk={this.handleOk}
        isShow
        textOkButton={'Ok'}
        isShowOkButton
      >
        { (requestError.initialiseError || requestErrorStatus === 0) ? <span>Some connection error has occurred. Please check your connection and try again.</span> : null }
        { requestErrorStatus > 499 ? <span>Something is wrong with the server. Please try again later.</span> : null }
        { requestErrorStatus === 403 ? <span>Your token has been expired. Please reload the page.</span> : null }
        { requestErrorStatus === 400 ? <span>Your request is invalid.</span> : null }
      </ConfirmationModal>
    )
  }
}

export default HandleErrors;
