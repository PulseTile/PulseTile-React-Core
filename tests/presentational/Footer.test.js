import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Footer from '../../src/components/presentational/Footer/Footer';

Enzyme.configure({adapter: new Adapter()});

describe('Component <Footer />', () => {
  it('should renders with props correctly', () => {
    const footer = shallow(
      <Footer
        testProps="testProps"
        testText="testText"
      />);
    expect(footer).toMatchSnapshot();
  });
});
