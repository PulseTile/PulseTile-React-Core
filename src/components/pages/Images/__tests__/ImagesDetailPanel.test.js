import React from 'react';
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-15';

import ImagesDetailPanel from '../images-page-component/ImagesDetailPanel';
import PropTypes from 'prop-types';

configure({ adapter: new Adapter() });

class SimpleComponent extends React.Component {
  render() {
    return <div>Simple Component</div>;
  }
}

const testProps = {
  onExpand: () => {},
  onShow: () => {},
  zoomin: () => {},
  zoomout: () => {},
  moveImg: () => {},
  fadeImg: () => {},
  title: 'Test Title Panel',
  name: 'TEST_PANEL',
  currentPanel: 'TEST_PANEL',
  children: React.createElement(SimpleComponent),
};

describe('Component <ImagesDetailPanel />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <ImagesDetailPanel
        currentPanel={testProps.currentPanel}
        onExpand={testProps.onExpand}
        onShow={testProps.onShow}
        zoomin={testProps.zoomin}
        zoomout={testProps.zoomout}
        moveImg={testProps.moveImg}
        fadeImg={testProps.fadeImg}
        title={testProps.title}
        name={testProps.name}
        children={testProps.children}
        isOpen
        isBtnShowPanel
      />);

    expect(component.find('PluginDetailHeader')).toHaveLength(1);
    expect(component.find('PTButton')).toHaveLength(6);
    expect(component.find('.panel-body').children()).toHaveLength(2);
    expect(component.find('.panel-body').find('SimpleComponent')).toHaveLength(1);
    expect(component).toMatchSnapshot();

    expect(component.instance().props.onExpand).toEqual(testProps.onExpand);
    expect(component.instance().props.onShow).toEqual(testProps.onShow);
    expect(component.instance().props.zoomin).toEqual(testProps.zoomin);
    expect(component.instance().props.zoomout).toEqual(testProps.zoomout);
    expect(component.instance().props.moveImg).toEqual(testProps.moveImg);
    expect(component.instance().props.fadeImg).toEqual(testProps.fadeImg);
    expect(component.instance().props.title).toEqual(testProps.title);
    expect(component.instance().props.name).toEqual(testProps.name);
    expect(component.instance().props.currentPanel).toEqual(testProps.currentPanel);
    expect(component.instance().props.children).toEqual(testProps.children);
    expect(component.instance().props.isOpen).toEqual(true);
    expect(component.instance().props.isBtnShowPanel).toEqual(true);

    component.find('PTButton').at(2).simulate('click');
    component.find('PTButton').at(3).simulate('click');
    component.find('PTButton').at(4).simulate('click');
    component.find('PTButton').at(5).simulate('click');

    expect(component).toMatchSnapshot();
  });
});
