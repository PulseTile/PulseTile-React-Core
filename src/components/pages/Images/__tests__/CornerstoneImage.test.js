import React from 'react';
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15';
import { JSDOM } from 'jsdom';

import CornerstoneImage from '../images-page-component/CornerstoneImage';

configure({ adapter: new Adapter() });
const jsdom = new JSDOM(`<!doctype html><html><head></head><body><div id="dicomImage-0" style="width:100%; height:512px; margin:auto; visibility:visible;"></div></body></html>`);
const { window } = jsdom;
global.window = window;

describe('Component <CornerstoneImage />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <CornerstoneImage
        imageId="http://46.101.95.245/orthanc/instances/d1d4875a-2a8267c2-2ee4f8f0-3d9e917e-9a141930/preview"
        index={0}
        instanceIds={['d1d4875a-2a8267c2-2ee4f8f0-3d9e917e-9a141930/preview']}
        isVisibleCornerstone
        visibleCornerstone={()=> {}}
        imageLoaded={() => {}}
      />);
    expect(component).toMatchSnapshot();
  });

  it('should renders with all props correctly', () => {
    global.document = window.document;
    const component = mount(
      <CornerstoneImage
        imageId="http://46.101.95.245/orthanc/instances/d1d4875a-2a8267c2-2ee4f8f0-3d9e917e-9a141930/preview"
        index={0}
        instanceIds={['d1d4875a-2a8267c2-2ee4f8f0-3d9e917e-9a141930/preview']}
        isVisibleCornerstone
        visibleCornerstone={()=> {}}
        imageLoaded={() => {}}
      />);

    component.setProps({ instanceIds: ['d1d4875a-2a8267c2-2ee4f8f0-3d9e917e-9a141930/preview'] });
    expect(component).toMatchSnapshot();

    component.setProps({ instanceIds: [] });
    expect(component).toMatchSnapshot();
  });
});
