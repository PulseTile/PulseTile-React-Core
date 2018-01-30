import React, { Component } from 'react';
import { connect } from 'react-redux';

import requestErrorSelector from './selectors';
import ConfirmationModal from '../../ui-elements/ConfirmationModal/ConfirmationModal';

@connect(requestErrorSelector)
class HandleErrors extends Component {
  state = {
    isOpenModal: true,
    countErrorRequest: 0,
  };

  componentDidMount() {
    this.setState({ countErrorRequest: this.state.countErrorRequest + 1 })
  }

  componentWillReceiveProps() {
    this.setState({ countErrorRequest: this.state.countErrorRequest + 1, isOpenModal: true })
  };

  handleClickButton = () => {
    const { requestError } = this.props;
    const requestErrorStatus = requestError.payload.status;
    if (requestErrorStatus === 400) {
      this.closeModal()
    } else {
      location.reload();
    }
  };

  closeModal = () => {
    const { requestError } = this.props;
    const { countErrorRequest } = this.state;
    const requestErrorStatus = requestError.payload.status;
    if (requestError.initialiseError || (countErrorRequest === 1 && requestErrorStatus !== 400)) {
      location.reload();
    } else {
      this.setState({ isOpenModal: false })
    }
  };

  render() {
    const { requestError } = this.props;
    const { isOpenModal } = this.state;
    const requestErrorStatus = requestError.payload.status;
    const textButton = (requestErrorStatus === 400) ? 'Ok' : 'Reload Page';
    return (
      <div>
        {isOpenModal && <ConfirmationModal
          title={'Connection Error'}
          onOk={this.handleClickButton}
          onHide={this.closeModal}
          isShow
          textOkButton={textButton}
          isShowOkButton
        >
          { (requestError.initialiseError || requestErrorStatus === 0) ? <span>Some connection error has occurred. Please check your connection and try again.</span> : null }
          { requestErrorStatus > 499 ? <span>Something is wrong with the server. Please try again later.</span> : null }
          { requestErrorStatus === 403 ? <span>Your token has been expired. Please reload the page.</span> : null }
          { requestErrorStatus === 400 ? <span>Current request is invalid.</span> : null }
        </ConfirmationModal> }
      </div>
    )
  }
}

export default HandleErrors;
