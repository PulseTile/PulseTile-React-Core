import React from 'react';
import {configure, shallow} from 'enzyme'
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import FormSection from '../../src/components/form-fields/FormSection';

const testProps = {
  onImportClick: () => {},
  title: 'Test title',
  theme: 'primary',
};
// isImportBtn: ,
// isAccordion: ,
// isBordered: ,

describe('Component <FormSectionList />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <FormSection
        onImportClick={testProps.onImportClick}
        title={testProps.title}
        theme={testProps.theme}
      >
        <span className='FormSection-children'>FormSectionList children</span>
      </FormSection>);

    expect(component.instance().props['onImportClick']).toEqual(testProps.onImportClick);
    expect(component.instance().props['title']).toEqual(testProps.title);
    expect(component.instance().props['theme']).toEqual(testProps.theme);
    expect(component.instance().props['isImportBtn']).toEqual(false);
    expect(component.instance().props['isAccordion']).toEqual(false);
    expect(component.instance().props['isBordered']).toEqual(false);


    expect(component.find('.form-group-section')).toHaveLength(1);
    expect(component.find(`.form-group-section-${testProps.theme}`)).toHaveLength(1);
    expect(component.find('.form-group-section-bordered')).toHaveLength(0);
    expect(component.find('.accordion')).toHaveLength(0);
    expect(component.find('.accordion.open')).toHaveLength(0);
    expect(component.find('.form-group-section-heading')).toHaveLength(1);
    expect(component.find('.control-group')).toHaveLength(0);
    expect(component.find('.panel-title')).toHaveLength(1);
    expect(component.find('.panel-title').text()).toEqual(testProps.title);
    expect(component.find('.FormSection-children')).toHaveLength(1);

    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  it('should renders without title', () => {
    const component = shallow(
      <FormSection
        onImportClick={testProps.onImportClick}
        theme={testProps.theme}
      >
        <span className='FormSection-children'>FormSectionList children</span>
      </FormSection>);

    expect(component.instance().props['title']).toEqual(undefined);

    expect(component.find('.form-group-section-heading')).toHaveLength(0);
    expect(component.find('.panel-title')).toHaveLength(0);

    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});