import React from 'react';
import renderer from 'react-test-renderer';

import CustomInputCheckbox from '../../src/components/form-fields/CustomInputCheckbox';

describe('Component <CustomInputCheckbox />', () => {
  it('should renders with props correctly', () => {
    const tree = renderer
      .create(
        <CustomInputCheckbox
          className="test-button"
          testProps="testProps"
          label='Test label'
          input={{value: true}}
        />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
