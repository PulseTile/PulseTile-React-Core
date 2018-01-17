import React from 'react';
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

import FormSectionList from '../../src/components/form-fields/FormSectionList';

const title = 'Test title';

describe('Component <FormSectionList />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <FormSectionList
        title={title}
      >
        <span className="FormSectionList-children">FormSectionList children</span>
      </FormSectionList>);

    expect(component.find('.form-group-section-list')).toHaveLength(1);
    expect(component.find('.form-group-section-heading')).toHaveLength(1);
    expect(component.find('.control-label')).toHaveLength(1);
    expect(component.find('.control-label').text()).toEqual(title);
    expect(component.find('.FormSectionList-children')).toHaveLength(1);
    expect(component.instance().props.title).toEqual(title);

    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
