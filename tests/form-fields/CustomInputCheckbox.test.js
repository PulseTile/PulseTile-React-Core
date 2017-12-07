import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme'

import CustomInputCheckbox from '../../src/components/form-fields/CustomInputCheckbox';

describe('Component <CustomInputCheckbox />', () => {
  it('should renders with all props correctly', () => {
    const tree = renderer
      .create(
        <CustomInputCheckbox
          className="test-button"
          testProps="testProps"
          label='Test label'
          input={{name: 'test-name', value: true}}
        />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should renders without label prop correctly', () => {
    const tree = renderer
      .create(
        <CustomInputCheckbox
          className="test-button"
          testProps="testProps"
          input={{name: 'test-name', value: true}}
        />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('changes the text after click', () => {
    // Render a checkbox with label in the document
    const checkbox = shallow(
      <CustomInputCheckbox
        className="test-button"
        testProps="testProps"
        label='Test label'
        input={{name: 'test-name', value: true}}
      />);

    expect(checkbox.text()).toEqual('Test label');
    checkbox.find('input').simulate('change');
    expect(checkbox.text()).toEqual('On');
  });
});
