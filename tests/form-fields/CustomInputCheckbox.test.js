import React from 'react';
import renderer from 'react-test-renderer';

import CustomInputCheckbox from '../../src/components/form-fields/CustomInputCheckbox';

describe('<CustomInputCheckbox />', () => {
  it('should renders ', () => {
    const tree = renderer
      .create(
        <CustomInputCheckbox
          className="test-button"
          testProps="testProps"
          label='Test label'
        />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
