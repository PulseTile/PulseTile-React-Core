import React from 'react';
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

import TextareaWithButton from '../TextareaWithButton';
import {valuesLabels, valuesNames} from '../../pages/DiaryEntry/forms.config';

const testProps = {
  button: <button>test</button>,
  fieldProps: {
    label:  valuesLabels.TYPE,
    name:   valuesNames.TYPE,
    id:     valuesNames.TYPE,
  },
};

describe('Component <TextareaWithButton />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <TextareaWithButton
        {...testProps}
      >
      </TextareaWithButton>);

    expect(component.find('.buttoned-control-group')).toHaveLength(1);
    expect(component.find('Field')).toHaveLength(1);

    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
