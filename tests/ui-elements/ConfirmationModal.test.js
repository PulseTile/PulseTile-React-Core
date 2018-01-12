import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import ConfirmationModal from '../../src/components/ui-elements/ConfirmationModal/ConfirmationModal';
import toJson from "enzyme-to-json";

Enzyme.configure({ adapter: new Adapter() });

const testProps = {
  onOk: () => {},
  onCancel: () => {},
  onHide: () => {},
  title: 'Test modal title',
  textOkButton: 'Ok text',
  textCancelButton: 'Cancel text',
  iconsClasses: {
    ok: 'fa-check',
    cancel: 'fa-ban',
  }
};

describe('Component <ConfirmationModal />', () => {
  it('should renders with all props correctly', () => {
    let tree;
    const component = shallow(
      <ConfirmationModal
        onOk={testProps.onOk}
        onCancel={testProps.onCancel}
        onHide={testProps.onHide}
        title={testProps.title}
        textOkButton={testProps.textOkButton}
        textCancelButton={testProps.textCancelButton}
        iconsClasses={testProps.iconsClasses}
        isShow={true}
        isShowOkButton={true}
        isShowCancelButton={true}
      >
        <span className="some-content">Lorem ipsum</span>
      </ConfirmationModal>);

    tree = toJson(component);
    expect(tree).toMatchSnapshot();

    expect(component.instance().props['onOk']).toEqual(testProps.onOk);
    expect(component.instance().props['onCancel']).toEqual(testProps.onCancel);
    expect(component.instance().props['onHide']).toEqual(testProps.onHide);
    expect(component.instance().props['title']).toEqual(testProps.title);
    expect(component.instance().props['textOkButton']).toEqual(testProps.textOkButton);
    expect(component.instance().props['textCancelButton']).toEqual(testProps.textCancelButton);
    expect(component.instance().props['iconsClasses']).toEqual(testProps.iconsClasses);
    expect(component.instance().props['isShow']).toEqual(true);
    expect(component.instance().props['isShowOkButton']).toEqual(true);
    expect(component.instance().props['isShowCancelButton']).toEqual(true);

    expect(component.find('Modal')).toHaveLength(1);
    expect(component.find('.panel')).toHaveLength(1);
    expect(component.find('.panel-title')).toHaveLength(1);
    expect(component.find('.panel-title').text()).toEqual(testProps.title);
    expect(component.find('.some-content')).toHaveLength(1);
    expect(component.find('.some-content').text()).toEqual('Lorem ipsum');
    expect(component.find('button')).toHaveLength(2);
    expect(component.find('i.fa')).toHaveLength(2);

    expect(component.find('.btn-danger')).toHaveLength(1);
    expect(component.find('.btn-danger').find('.fa').hasClass(testProps.iconsClasses.cancel)).toEqual(true);
    expect(component.find('.btn-success')).toHaveLength(1);
    expect(component.find('.btn-success').find('.fa').hasClass(testProps.iconsClasses.ok)).toEqual(true);

    component.find('.btn-danger').at(0).simulate('click');
    component.find('.btn-success').at(0).simulate('click');
  });

  it('should renders without icons and buttons correctly', () => {
    let tree;
    const component = shallow(
      <ConfirmationModal
        onOk={testProps.onOk}
        onCancel={testProps.onCancel}
        onHide={testProps.onHide}
        title={testProps.title}
        textOkButton={testProps.textOkButton}
        textCancelButton={testProps.textCancelButton}
        isShow={true}
        isShowOkButton={true}
        isShowCancelButton={true}
      >
        <span className="some-content">Lorem ipsum</span>
      </ConfirmationModal>);

    tree = toJson(component);
    expect(tree).toMatchSnapshot();

    expect(component.find('button')).toHaveLength(2);

    component.setProps({ isShowOkButton: false, isShowCancelButton: false });

    tree = toJson(component);
    expect(tree).toMatchSnapshot();

    expect(component.find('button')).toHaveLength(0);
  });
});

