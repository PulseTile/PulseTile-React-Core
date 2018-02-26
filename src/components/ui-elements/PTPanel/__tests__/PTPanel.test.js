import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import PTPanel from '../PTPanel';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <PTPanel />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(
      <PTPanel
        header={<h3 className="panel-title"><i className="fa fa-bar-chart" /> Test </h3>}
        className="col-xs-12"
        classNameForPanel="mainPagePanel"
      >
        <div>test children element</div>
      </PTPanel>);

    expect(component.props().className).toEqual('col-xs-12');
    expect(component.find('Panel')).toHaveLength(1);
    expect(component.find('Panel').props().bsClass).toEqual('panel');
    expect(component.find('Panel').props().bsStyle).toEqual('secondary');
    expect(component.find('Panel').props().className).toEqual('mainPagePanel');
    expect(component).toMatchSnapshot();
  });
});
