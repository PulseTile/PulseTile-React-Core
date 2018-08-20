import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import PluginBanner from '../PluginBanner';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <PluginBanner />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <PluginBanner
        isShowPluginsBigBanner
        toRight={false}
        title="test title"
        subTitle="test subTitle"
        img="test img"
      />);

    expect(component.find('.page-banner')).toHaveLength(1);
    expect(component.find('img')).toHaveLength(1);
    expect(component.find('.page-banner__title').text()).toEqual('test title');
    expect(component.find('.page-banner__subtitle').text()).toEqual('test subTitle');

    expect(component).toMatchSnapshot();

    component.setProps({ toRight: true });
    expect(component.find('.page-banner__title--right')).toHaveLength(1);
    expect(component.find('.page-banner__subtitle--right')).toHaveLength(1);

    expect(component).toMatchSnapshot();

    component.setProps({ isShowPluginsBigBanner: false });
    // expect(component.find('.page-banner')).toHaveLength(0);

    expect(component).toMatchSnapshot();
  });
});
