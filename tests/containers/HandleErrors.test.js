import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import { HandleErrors } from '../../src/components/containers/HandleErrors/HandleErrors';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <HandleErrors />', () => {
  it('should renders correctly when requestError contains initialiseError', () => {
    const component = shallow(
      <HandleErrors
        requestError={{
          initialiseError: true,
          payload: {
            status: 0,
          } }}
      />);

    const confirmationModalComponentProps = component.find('ConfirmationModal').props();
    expect(component.state().isOpenModal).toEqual(true);
    expect(component.state().countErrorRequest).toEqual(1);
    expect(confirmationModalComponentProps.title).toEqual('Connection Error');
    expect(confirmationModalComponentProps.isShow).toEqual(true);
    expect(confirmationModalComponentProps.textOkButton).toEqual('Reload Page');
    expect(confirmationModalComponentProps.isShowOkButton).toEqual(true);
    expect(confirmationModalComponentProps.children.props.children).toEqual('Some connection error has occurred. Please check your connection and try again.');

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when requestError contains 400 error', () => {
    const component = shallow(
      <HandleErrors
        requestError={{
          payload: {
            status: 400,
          } }}
      />);

    const confirmationModalComponentProps = component.find('ConfirmationModal').props();
    expect(component.state().isOpenModal).toEqual(true);
    expect(component.state().countErrorRequest).toEqual(1);
    expect(confirmationModalComponentProps.title).toEqual('Connection Error');
    expect(confirmationModalComponentProps.isShow).toEqual(true);
    expect(confirmationModalComponentProps.textOkButton).toEqual('Ok');
    expect(confirmationModalComponentProps.isShowOkButton).toEqual(true);
    expect(confirmationModalComponentProps.children.props.children).toEqual('Current request is invalid.');

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when requestError contains 403 error', () => {
    const component = shallow(
      <HandleErrors
        requestError={{
          payload: {
            status: 403,
          } }}
      />);

    const confirmationModalComponentProps = component.find('ConfirmationModal').props();
    expect(component.state().isOpenModal).toEqual(true);
    expect(component.state().countErrorRequest).toEqual(1);
    expect(confirmationModalComponentProps.title).toEqual('Connection Error');
    expect(confirmationModalComponentProps.isShow).toEqual(true);
    expect(confirmationModalComponentProps.textOkButton).toEqual('Reload Page');
    expect(confirmationModalComponentProps.isShowOkButton).toEqual(true);
    expect(confirmationModalComponentProps.children.props.children).toEqual('Your token has been expired. Please reload the page.');

    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when requestError contains 500 error', () => {
    const component = shallow(
      <HandleErrors
        requestError={{
          payload: {
            status: 500,
          } }}
      />);

    const confirmationModalComponentProps = component.find('ConfirmationModal').props();
    expect(component.state().isOpenModal).toEqual(true);
    expect(component.state().countErrorRequest).toEqual(1);
    expect(confirmationModalComponentProps.title).toEqual('Connection Error');
    expect(confirmationModalComponentProps.isShow).toEqual(true);
    expect(confirmationModalComponentProps.textOkButton).toEqual('Reload Page');
    expect(confirmationModalComponentProps.isShowOkButton).toEqual(true);
    expect(confirmationModalComponentProps.children.props.children).toEqual('Something is wrong with the server. Please try again later.');

    expect(component).toMatchSnapshot();
  });

  it('testing methods', () => {
    const component = shallow(
      <HandleErrors
        requestError={{
          payload: {
            status: 400,
          } }}
      />);

    // Testing closeModal methods
    expect(component.state().isOpenModal).toEqual(true);
    expect(component.state().countErrorRequest).toEqual(1);
    component.instance().closeModal();
    expect(component.state().isOpenModal).toEqual(false);
    expect(component.state().countErrorRequest).toEqual(1);

    component.setState({ isOpenModal: true });
    component.setProps({ requestError: { payload: { status: 413 } } });
    expect(component.state().countErrorRequest).toEqual(2);
    component.instance().closeModal();
    expect(component.state().isOpenModal).toEqual(false);

    component.setState({ isOpenModal: true });
    component.setProps({ requestError: { payload: { status: 400 }, initialiseError: true } });
    expect(component.state().countErrorRequest).toEqual(3);
    component.instance().closeModal();
    expect(component.state().isOpenModal).toEqual(false);

    component.instance().reloadPage()

    expect(component).toMatchSnapshot();
  });
});

