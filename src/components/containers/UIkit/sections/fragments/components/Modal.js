import React, { Component } from 'react';
import ConfirmationModal from '../../../../../ui-elements/ConfirmationModal/ConfirmationModal';

/**
 * This component returns Modal section for COMPONENTS
 */
export default class Modal extends Component {

  state = {
    isOpenModal: false,
  };

  toggleModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    })
  };

  render() {
    const { isOpenModal } = this.state;
    const title = 'Documents Import Access Disclaimer';
    const message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec lobortis elit. Aenean mi nunc, feugiat ut aliquet non, iaculis vel tellus. Donec semper felis placerat, posuere nisi a, suscipit turpis. Integer sit amet lacus pellentesque, vestibulum libero id, sagittis nisi. Phasellus eleifend, neque eget vulputate semper, enim dui dictum neque, non iaculis felis augue at nunc.';
    return (
      <div id="modal" className="ui-section">
        { isOpenModal &&
          <ConfirmationModal
            title={title}
            onOk={this.toggleModal}
            onHide={this.toggleModal}
            onCancel={this.toggleModal}
            isShow
            isShowOkButton={true}
            isShowCancelButton={true}
          >
            <span>{message}</span>
          </ConfirmationModal>
        }
        <strong className="ui-title">Modal</strong>
        <div className="wrap-control-group hide-indent-bottom">
          <div className="control-group with-indent left">
            <button type="button" className="btn btn-info" onClick={() => this.toggleModal()}>
              <span className="btn-text">Open Modal Window</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
