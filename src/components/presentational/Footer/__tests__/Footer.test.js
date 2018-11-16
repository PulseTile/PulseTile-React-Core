import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import Footer from '../Footer';

Enzyme.configure({ adapter: new Adapter() });

const copyright = 'Transforming Usability';

describe('Component <Footer />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(
      <Footer
        copyright={copyright}
      />);

    expect(component.find('.footer-text')).toHaveLength(1);
    expect(component.find('.footer-povered-text')).toHaveLength(1);

    expect(component.find('.footer-text span').at(0).text()).toEqual(copyright);
    expect(component.find('.footer-text .toggle-high-contrast a').text()).toEqual('Enable High Contrast Mode');

    expect(component.find('.footer-povered-text').text()).toEqual('Supported by');

    expect(component).toMatchSnapshot();

    component.instance().toggleHighContrast();
    component.setState({
      enabledHighContrast: true,
    });

    expect(component.find('.footer-text span').at(0).text()).toEqual(copyright);
    expect(component.find('.footer-text .toggle-high-contrast a').text()).toEqual('Disable High Contrast Mode');

    expect(component).toMatchSnapshot();
  });
});
