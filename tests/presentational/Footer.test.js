import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import Footer from '../../src/components/presentational/Footer/Footer';

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

    expect(component.find('.footer-text').text()).toEqual(copyright);
    expect(component.find('.footer-povered-text').text()).toEqual('Supported by');

    expect(component).toMatchSnapshot();

    component.setProps({ copyright: undefined, isShowSupportedBy: false });

    expect(component.find('.footer-text')).toHaveLength(0);
    expect(component.find('.footer-povered-text')).toHaveLength(0);

    expect(component).toMatchSnapshot();
  });
});
