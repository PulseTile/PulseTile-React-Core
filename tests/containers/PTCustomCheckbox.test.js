import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import PTCustomCheckbox from '../../src/components/containers/PatientsList/header/PTCustomCheckbox';

Enzyme.configure({ adapter: new Adapter() });
const onChange = () => {};

describe('Component <PTCustomCheckbox />', () => {
  it('should renders correctly', () => {
    const ptCustomCheckbox = mount(
      <PTCustomCheckbox
        title="test title"
        name="testName"
        isChecked
        onChange={onChange}
      />
    );
    expect(ptCustomCheckbox.prop('title')).toEqual('test title');
    expect(ptCustomCheckbox.prop('name')).toEqual('testName');
    expect(ptCustomCheckbox.prop('isChecked')).toEqual(true);
    expect(ptCustomCheckbox).toMatchSnapshot();

    ptCustomCheckbox.find('.fcustominp-state').simulate('click');
    expect(ptCustomCheckbox).toMatchSnapshot();
  });
});

